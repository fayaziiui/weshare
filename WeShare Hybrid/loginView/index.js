'use strict';

var globalmodel = kendo.observable({
    username:''
});

app.loginView = kendo.observable({
    onShow: function () { }
});
(function (parent) {
    var provider = app.data.defaultProvider,
        mode = 'signin',
        registerRedirect = 'home',
        signinRedirect = 'home',
        init = function (error) {
            if (error) {
                if (error.message) {
                    alert(error.message);
                }
                return false;
            }

            var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';

            if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
                $('.offline').show().siblings().hide();
            } else {
                $(activeView).show().siblings().hide();
            }
        },
        successHandler = function (data) {
            var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

            if (data && data.result) {
                app.user = data.result;
                app.mobileApp.navigate(redirect + '/view.html');
            } else {
                init();
            }
        },
        loginViewModel = kendo.observable({
            displayName: '',
            email: '',
            password: '',
            validateData: function (data) {
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
            signin: function () {
                var model = loginViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password;

                if (!model.validateData(model)) {
                    return false;
                }

                if (AuthenticateUser(email, password)) {
                    globalmodel.username=email;
                    app.mobileApp.navigate('clinicView/view.html');
                }
                else alert("Invalid UserName Or Password!.");

                //   provider.Users.login(email, password, successHandler, init);
            },
            register: function () {
                var model = loginViewModel,
                    email = model.email.toLowerCase(),
                    password = model.password,
                    displayName = model.displayName,
                    attrs = {
                        Email: email,
                        DisplayName: displayName
                    };

                if (!model.validateData(model)) {
                    return false;
                }

                provider.Users.register(email, password, attrs, successHandler, init);
            },
            toggleView: function () {
                mode = mode === 'signin' ? 'register' : 'signin';
                init();
            }
        }); 

    parent.set('loginViewModel', loginViewModel);
    parent.set('onShow', function () {
        provider.Users.currentUser().then(successHandler, init);
        //alert('dd');
        
        //var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
        //alert(db);
    });
})(app.loginView);

function AuthenticateUser(userName, password) {
    //  alert(userName + ' ' + password);
    var result = false;
    $.ajax({
        async: false,
        //url: "http://localhost:46702/Home/PatientLogin",
        url: "http://www.wesharev2.com/Home/Login",
        data: {
            UserName: userName,
            Password: password,
        },
        // dataType: "json",
        type: "POST",
        success: function (data) {
            // alert(data);
            if (data == true) result = true;
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText)
        }
    });
    return result;
}

