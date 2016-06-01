var STATES = {
    HOME: "home",

    COURSEINFO: "courseInfo",
    COURSEINFO_CREATE: "courseInfo.create",
    COURSEINFO_MANAGE: "courseInfo.manage",

    STUDENTINFO: "studentInfo",
    STUDENT_INFO_IMPORT: "studentInfo.Import",
    STUDENT_INFO_MANAGE: "studentInfo.Manage",
    STUDENT_INFO_SENDMAIL: "studentInfo.Sendmail",

    OTHERS: "others",
    OTHERS_CERTIFICATION: "others.certification",
    OTHERS_SENDMAIL: "others.sendMail",
    OTHERS_INVOICE: "others.invoice"
}

var app = angular.module('app', [
    'ui.router',
    'ct.ui.router.extras',
    'ngScrollbar',
    'ngFileUpload',
    'ui.bootstrap',
    'angular-mousetrap',
    'inputDropdown'
])

.config(['$sceProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$animateProvider', '$stickyStateProvider',
	function($sceProvider, $stateProvider, $urlRouterProvider, $locationProvider, $animateProvider, $stickyStateProvider) {


		// ng-bind-html word
        $sceProvider.enabled(false);

        // Start Page
        $urlRouterProvider.otherwise("/");

        $stickyStateProvider.enableDebug(false);

        // ui view setting
        $stateProvider

        .state(STATES.HOME, {
            url: "/",
            views: {
                'home@': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeController',
                }
            }
        })

        .state(STATES.COURSEINFO, {
            url: "/courseInfo",
            views: {
                'courseInfo@': {
                    template: "<div ui-view=\"content\"></div>"
                }
            }
        })

        .state(STATES.COURSEINFO_CREATE, {
            url: "/create",
            views: {
                'content@courseInfo': {
                    templateUrl: "templates/courseCreate.html",
                    controller: 'CourseCreateController as ctrl'
                }
            }
        })

        .state(STATES.COURSEINFO_MANAGE, {
            url: "/manage",
            views: {
                'content@courseInfo': {
                    templateUrl: "templates/courseManage.html",
                    controller: 'CourseManageController'
                }
            }
        })
        
        .state(STATES.STUDENTINFO, {
            url: "/studentInfo",
            views: {
                'studentInfo@': {
                    template: "<div ui-view=\"content\"></div>"
                }
            }
        })

        .state(STATES.STUDENT_INFO_IMPORT, {
            url: "/import",
            views: {
                'content@studentInfo': {
                    templateUrl: "templates/studentImport.html",
                    controller: 'StudentImportController',
                }
            }
        })

        .state(STATES.STUDENT_INFO_MANAGE, {
            url: "/manage",
            views: {
                'content@studentInfo': {
                    templateUrl: "templates/studentManage.html",
                    controller: 'StudentManageController',
                }
            }
        })
        
        .state(STATES.STUDENT_INFO_SENDMAIL, {
            url: "/sendmail",
            views: {
                'content@studentInfo': {
                    templateUrl: "templates/studentSendmail.html",
                    controller: 'StudentSendmailController',
                }
            }
        })
        
        

        .state(STATES.OTHERS, {
            url: "/others",
            views: {
                'others@': {
                    template: "<div ui-view=\"content\"></div>"
                }
            }
        })

        .state(STATES.OTHERS_CERTIFICATION, {
            url: "/certification",
            views: {
                'content@others': {
                    templateUrl: "templates/certificationPage.html",
                    controller: 'CertificationController',
                }
            }
        })
        .state(STATES.OTHERS_SENDMAIL, {
            url: "/sendMail",
            views: {
                'content@others': {
                    templateUrl: "templates/mailSendingPage.html",
                    controller: 'MailSendingController',
                }
            }
        })

        .state(STATES.OTHERS_INVOICE, {
            url: "/invoice",
            views: {
                'content@others': {
                    templateUrl: "templates/invoice.html",
                    controller: 'InvoiceController',
                }
            }
        })
	}
])

.controller("RootController",['$scope', '$state', '$timeout', '$rootScope',
	function($scope, $state, $timeout, $rootScope){

        var isHomeView = function() {
            return $state.includes(STATES.HOME);
        }

        var isCourseInfoView = function() {
            return $state.includes(STATES.COURSEINFO);
        }

        var isOthersView = function() {
            return $state.includes(STATES.OTHERS);
        }

        var isStudentInfoView = function() {
            return $state.includes(STATES.STUDENTINFO);
        }        

        var init = function() {
            
        }


        /*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/
        /*==========================
             Methods
        ==========================*/

        $scope.isHomeView = isHomeView;
        $scope.isCourseInfoView = isCourseInfoView;
        $scope.isOthersView = isOthersView;
        $scope.isStudentInfoView = isStudentInfoView;

        /*==========================
             init
        ==========================*/

        init();

	}
]);

app.directive('loading',  ['$timeout', function($timeout){
  return {
        restrict: 'E',
        templateUrl: "templates/directives/loading.html"
    };
}]);

app.directive('spin',  ['$timeout', function($timeout){
  return {
        restrict: 'E',
        template: '<div class="spin"></div>',
        link: function(scope, element, attrs, ctrls) {

            var spinSize = attrs.spinSize;
            switch (spinSize) {
                case "large": 
                    element.children().addClass("spin-large");
                    break;
                case "medium": 
                    element.children().addClass("spin-medium");
                    break;
                case "small": 
                    element.children().addClass("spin-small");
                    break;
                default:
                    element.children().addClass("spin-small");
                    break;
            }
        }
    };
}]);