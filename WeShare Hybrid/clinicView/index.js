'use strict';

app.clinicView = kendo.observable({
    onShow: function () {alert('11');},
    changeclinic:function(){ alert('sss');}
    
});
(function(parent) {
      var clinicViewModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function(data) {
                if (!data.email) {
                    alert('Missing email');
                    return false;
                }

                if (!data.password) {
                    alert('Missing password');
                    return false;
                }
                return true;
            },
            slectClinic: function() {
                 alert('ddd');
               //  app.mobileApp.navigate('clinicView/view.html');
            }
            });
    parent.set('clinicViewModel', clinicViewModel);
    parent.set('onShow', function() {
       // provider.Users.currentUser().then(successHandler, init);
    });
})(app.clinicView);