'use strict';

app.clinicView = kendo.observable({
    onShow: function () {}
});

(function (parent) {
    var clinicViewModel = kendo.observable({
        clinics: '',
        slectClinic: function () {
            // alert('clinic clicked');
            app.mobileApp.navigate('clinicAreaView/view.html');
        }
    });
    parent.set('clinicViewModel', clinicViewModel);
    parent.set('onShow', function () {
        clinicViewModel.clinics = PatientClinicList(globalmodel.username);

        ShowClinics(clinicViewModel.clinics);
    });

})(app.clinicView);

function PatientClinicList(userName) {
    var result = false;
    $.ajax({
        async: false,
        url: "http://localhost:46702/Home/PatientClinicList",
        data: {
            UserName: userName
        },
        // dataType: "json",
        type: "POST",
        success: function (data) {
            result = data;
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText)
        }
    });
    return result;
}

function ShowClinics(obj) {
    var length = obj.length;
    var out = '';
    out += "Clinics Count=" + length + "\n";
    for (var i = 0; i < length; i++) {
        out += 'Clinic:' + i + ' = ' + obj[i].ClinicName;
    }
    alert(out);
}