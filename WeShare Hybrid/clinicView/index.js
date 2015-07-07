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
        // provider.Users.currentUser().then(successHandler, init);
    });
})(app.clinicView);