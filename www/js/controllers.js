angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, CurrentUserService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.fullname = CurrentUserService.fullname;
  $scope.photo = CurrentUserService.picture;
  $scope.level = CurrentUserService.level;

  $scope.message = "";
  $scope.trigmessage = function() {
    if ($scope.message === "") {
        $scope.message = "open";
    } else if ($scope.message === "open") {
        $scope.message = "";
    }
  };

  $scope.profile = "";
  $scope.trigprofile = function() {
    if ($scope.profile === "") {
        $scope.profile = "open";
    } else if ($scope.profile === "open") {
        $scope.profile = "";
    }
  };

  $scope.home = "";
  $scope.trighome = function() {
    if ($scope.home === "") {
        $scope.home = "active";
        $scope.homeshow = "display: block;";
    } else if ($scope.home === "active") {
        $scope.home = "";
        $scope.homeshow = "display: none;";
    }
  };
  $scope.order = "";
  $scope.trigorder = function() {
    if ($scope.order === "") {
        $scope.order = "active";
        $scope.ordershow = "display: block;";
    } else if ($scope.order === "active") {
        $scope.order = "";
        $scope.ordershow = "display: none;";
    }
  };
  $scope.prod = "";
  $scope.trigprod = function() {
    if ($scope.prod === "") {
        $scope.prod = "active";
        $scope.prodshow = "display: block;";
    } else if ($scope.prod === "active") {
        $scope.prod = "";
        $scope.prodshow = "display: none;";
    }
  };
  $scope.inven = "";
  $scope.triginven = function() {
    if ($scope.inven === "") {
        $scope.inven = "active";
        $scope.invenshow = "display: block;";
    } else if ($scope.inven === "active") {
        $scope.inven = "";
        $scope.invenshow = "display: none;";
    }
  };
  $scope.purc = "";
  $scope.trigpurc = function() {
    if ($scope.purc === "") {
        $scope.purc = "active";
        $scope.purcshow = "display: block;";
    } else if ($scope.purc === "active") {
        $scope.purc = "";
        $scope.purcshow = "display: none;";
    }
  };
  $scope.mast = "";
  $scope.trigmast = function() {
    if ($scope.mast === "") {
        $scope.mast = "active";
        $scope.mastshow = "display: block;";
    } else if ($scope.mast === "active") {
        $scope.mast = "";
        $scope.mastshow = "display: none;";
    }
  };
  $scope.sett = "";
  $scope.trigsett = function() {
    if ($scope.sett === "") {
        $scope.sett = "active";
        $scope.settshow = "display: block;";
    } else if ($scope.sett === "active") {
        $scope.sett = "";
        $scope.settshow = "display: none;";
    }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('dashboardCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('orderCtrl', function($scope, ionicDatePicker, PickTransactionServices) {
  $scope.OrderDate = '';
  $scope.DeadlineDate = '';
  var tanggal = {
    callback: function (val) {  //Mandatory
      $scope.OrderDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };
  var deadline = {
    callback: function (val) {  //Mandatory
      $scope.DeadlineDate = new Date(val);
      PickTransactionServices.updateDate(val);
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
    },
    disabledDates: [            //Optional
      new Date(2016, 2, 16),
      new Date(2015, 3, 16),
      new Date(2015, 4, 16),
      new Date(2015, 5, 16),
      new Date('Wednesday, August 12, 2015'),
      new Date("08-16-2016"),
      new Date(1439676000000)
    ],
    from: new Date(2012, 1, 1), //Optional
    to: new Date(2016, 10, 30), //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    disableWeekdays: [0],       //Optional
    closeOnSelect: false,       //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(tanggal);
  };
  $scope.DeadlinePicker = function(){
    ionicDatePicker.openDatePicker(deadline);
  };

  $scope.new = "btn-default";
  $scope.repair = "btn-default";
  $scope.trignew = function() {
    $scope.new = "btn-primary";
    $scope.repair = "btn-default";
  };
  $scope.trigrepair = function() {
    $scope.new = "btn-default";
    $scope.repair = "btn-primary";
  };
})

.controller('registrationCtrl', function($scope, $state, $ionicLoading, MembersFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.user = {};
  $scope.item = {'photo': ''};

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "finance";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.level = "sales";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.level = "customer";
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.email === 'undefined' || user.email === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your email"
          return;
      }
      if (typeof user.password === 'undefined' || user.password === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your password"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });

      fb.createUser({
          email: user.email,
          password: user.password
      }, function (error, userData) {
          if (error) {
              switch (error.code) {
                  case "EMAIL_TAKEN":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The email entered is already in use!'});
                      break;
                  case "INVALID_EMAIL":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The specified email is not a valid email!'});
                      break;
                  default:
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Oops. Something went wrong!'});
              }
          } else {
              fb.authWithPassword({
                  "email": user.email,
                  "password": user.password
              }, function (error, authData) {
                  if (error) {
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Error. Login failed!'});
                  } else {

                      /* PREPARE DATA FOR FIREBASE*/
                      var photo = $scope.item.photo;
                      var gender = $scope.gender;
                      var level = $scope.level;
                      $scope.temp = {
                          fullname: user.fullname,
                          picture: photo,
                          email: user.email,
                          gender: gender,
                          level: level,
                          datecreated: Date.now(),
                          dateupdated: Date.now()
                      }

                      /* SAVE MEMBER DATA */
                      var membersref = MembersFactory.ref();
                      var newUser = membersref.child(authData.uid);
                      newUser.update($scope.temp, function (ref) {
                      addImage = newUser.child("images");
                      });
                      MembersFactory.getMember(authData).then(function (thisuser) {
                        /* Save user data for later use */
                        myCache.put('thisUserName', thisuser.fullname);
                        myCache.put('thisMemberId', authData.uid);
                        CurrentUserService.updateUser(thisuser);
                      });

                      $ionicLoading.hide();
                      $state.go('app.dashboard');
                  }
              });
          }
      });
  };
})

.controller('employeeCtrl', function($scope, $state, $ionicLoading, MembersFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.user = {'fullname': '','address': '','phone': '','photo': '','picture': ''};
  $scope.item = {'photo': ''};

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.user, $scope);
  });

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.title = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.title = "supervisor";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.title = "worker";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.title = "owner";
  };

  $scope.takepic = function() {
    
    var filesSelected = document.getElementById("nameImg").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent) {
        var textAreaFileContents = document.getElementById(
          "textAreaFileContents"
        );
        $scope.item = {
          photo: fileLoadedEvent.target.result
        };
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.address === 'undefined' || user.address === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your address"
          return;
      }
      if (typeof user.phone === 'undefined' || user.phone === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your phone"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Adding...'
      });

      /* PREPARE DATA FOR FIREBASE*/
      var photo = $scope.item.photo;
      var gender = $scope.gender;
      var title = $scope.title;
      $scope.temp = {
          fullname: user.fullname,
          picture: photo,
          address: user.address,
          phone: user.phone,
          gender: gender,
          title: title,
          status: "active",
          datecreated: Date.now(),
          dateupdated: Date.now()
      }

      /* SAVE MEMBER DATA */
      var ref = fb.child("employees");
      ref.push($scope.temp);

      $ionicLoading.hide();
      refresh($scope.user, $scope);
  };

  function refresh(user, $scope, item) {

    $scope.user = {'fullname': '','address': '','phone': '','photo': '','picture': ''};
    $scope.item = {'photo': ''};
    $scope.male = "";
    $scope.female = "";
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
  }
})

.controller('contactCtrl', function($scope, $state, $ionicLoading, ContactsFactory, $ionicPopup, myCache) {

  $scope.contacts = [];

  $scope.contacts = ContactsFactory.getContacts();
  $scope.contacts.$loaded().then(function (x) {
    refresh($scope.contacts, $scope, ContactsFactory);
  }).catch(function (error) {
      console.error("Error:", error);
  });

  $scope.$on('$ionicView.beforeEnter', function () {
    refresh($scope.user, $scope);
  });

  function refresh(user, $scope, item) {
  }
})

.controller('profileCtrl', function($scope, $state, $ionicLoading, MembersFactory, CurrentUserService, PickTransactionServices, $ionicPopup, myCache) {

  $scope.fullname = CurrentUserService.fullname;
  $scope.photo = CurrentUserService.picture;
  $scope.level = CurrentUserService.level;
  $scope.user = {};
  $scope.item = {'photo': ''};

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.gender = "female";
  };

  // User Level
  $scope.admin = "";
  $scope.finance = "";
  $scope.sales = "";
  $scope.customer = "";
  $scope.trigadmin = function() {
    $scope.admin = "checked";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.level = "finance";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.level = "sales";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.level = "customer";
  };

  $scope.test = function() {
    $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;
      var filesSelected = document.getElementById("nameImg").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
          var textAreaFileContents = document.getElementById(
            "textAreaFileContents"
          );
          $scope.item = {
            photo: fileLoadedEvent.target.result
          };
        };

        fileReader.readAsDataURL(fileToLoad);
      }

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.email === 'undefined' || user.email === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your email"
          return;
      }
      if (typeof user.password === 'undefined' || user.password === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your password"
          return;
      }

      $ionicLoading.show({
          template: '<ion-spinner icon="ios"></ion-spinner><br>Registering...'
      });

      fb.createUser({
          email: user.email,
          password: user.password
      }, function (error, userData) {
          if (error) {
              switch (error.code) {
                  case "EMAIL_TAKEN":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The email entered is already in use!'});
                      break;
                  case "INVALID_EMAIL":
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'The specified email is not a valid email!'});
                      break;
                  default:
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Oops. Something went wrong!'});
              }
          } else {
              fb.authWithPassword({
                  "email": user.email,
                  "password": user.password
              }, function (error, authData) {
                  if (error) {
                      $ionicLoading.hide();
                      $ionicPopup.alert({title: 'Register Failed', template: 'Error. Login failed!'});
                  } else {

                      /* PREPARE DATA FOR FIREBASE*/
                      var photo = $scope.item.photo;
                      var gender = $scope.gender;
                      var level = $scope.level;
                      $scope.temp = {
                          fullname: user.fullname,
                          picture: photo,
                          email: user.email,
                          gender: gender,
                          level: level,
                          datecreated: Date.now(),
                          dateupdated: Date.now()
                      }

                      /* SAVE MEMBER DATA */
                      var membersref = MembersFactory.ref();
                      var newUser = membersref.child(authData.uid);
                      newUser.update($scope.temp, function (ref) {
                      addImage = newUser.child("images");
                      });
                      MembersFactory.getMember(authData).then(function (thisuser) {
                        /* Save user data for later use */
                        myCache.put('thisUserName', thisuser.fullname);
                        myCache.put('thisMemberId', authData.uid);
                        CurrentUserService.updateUser(thisuser);
                      });

                      $ionicLoading.hide();
                      $state.go('app.playlists');
                  }
              });
          }
      });
  };
})

.controller('loginCtrl', function($scope, $rootScope, $stateParams, $ionicHistory, $cacheFactory, $ionicLoading, $ionicPopup, $state, MembersFactory, myCache, CurrentUserService) {

  $scope.user = {};
    $scope.doLogIn = function (user) {
        $ionicLoading.show({
            template: '<ion-spinner icon="ios"></ion-spinner><br>Loggin In...'
        });

        /* Check user fields*/
        if (!user.email || !user.password) {
            $ionicLoading.hide();
            $ionicPopup.alert({title: 'Login Failed', template: 'Please check your Email or Password!'});
            return;
        }

        /* Authenticate User */
        fb.authWithPassword({
            "email": user.email,
            "password": user.password
        }, function (error, authData) {
            if (error) {
                //console.log("Login Failed!", error);
                $ionicLoading.hide();
                $ionicPopup.alert({title: 'Login Failed', template: 'Check your credentials and try again!'});
            } else {
                
                MembersFactory.getMember(authData).then(function (thisuser) {
                    
                    /* Save user data for later use */
                    myCache.put('thisUserName', thisuser.fullname);
                    myCache.put('thisUserLevel', thisuser.level);
                    myCache.put('thisMemberId', authData.uid);
                    CurrentUserService.updateUser(thisuser);
                        $ionicLoading.hide();
                        $state.go('app.dashboard', { memberId: authData.uid, level: thisuser.level });
                });
            }
        });
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
