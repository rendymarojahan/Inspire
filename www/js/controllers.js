angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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

.controller('PlaylistsCtrl', function($scope) {
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

  // Gender
  $scope.male = "";
  $scope.female = "";
  $scope.trigmale = function() {
    $scope.male = "checked";
    $scope.female = "";
    $scope.user.gender = "male";
  };
  $scope.trigfemale = function() {
    $scope.male = "";
    $scope.female = "checked";
    $scope.user.gender = "female";
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
    $scope.user.level = "admin";
  };
  $scope.trigfinance = function() {
    $scope.admin = "";
    $scope.finance = "checked";
    $scope.sales = "";
    $scope.customer = "";
    $scope.user.level = "finance";
  };
  $scope.trigsales = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "checked";
    $scope.customer = "";
    $scope.user.level = "sales";
  };
  $scope.trigcustomer = function() {
    $scope.admin = "";
    $scope.finance = "";
    $scope.sales = "";
    $scope.customer = "checked";
    $scope.user.level = "customer";
  };

  $scope.createMember = function (user) {
      var email = user.email;
      var password = user.password;

      // Validate form data
      if (typeof user.fullname === 'undefined' || user.fullname === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please enter your name"
          return;
      }
      if (typeof user.picture === 'undefined' || user.picture === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please select your picture"
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
      if (typeof user.gender === 'undefined' || user.gender === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please select your gender"
          return;
      }
      if (typeof user.level === 'undefined' || user.level === '') {
          $scope.hideValidationMessage = false;
          $scope.validationMessage = "Please select your level"
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
                      $scope.temp = {
                          fullname: user.fullname,
                          picture: user.picture,
                          email: user.email,
                          gender: user.gender,
                          level: user.level,
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
                        $scope.fullname = thisuser.fullname;
                        /* Save user data for later use */
                        myCache.put('thisGroupId', thisuser.group_id);
                        myCache.put('thisUserName', $scope.fullname());
                        myCache.put('thisMemberId', authData.uid);
                        myCache.put('thisPublicId', thisuser.public_id);
                        CurrentUserService.updateUser(thisuser);
                      });

                      $ionicLoading.hide();
                      $state.go('playlists');
                  }
              });
          }
      });
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
