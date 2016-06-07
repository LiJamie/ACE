app.controller('StudentManageController', ['$scope', '$state', '$timeout', '$rootScope', 'StudentInfoService', 'CourseService', '$stateParams',
    function ($scope, $state, $timeout, $rootScope, StudentInfoService, CourseService, $stateParams) {  

        var getStudentList = function() {
            $scope.isStudentLoading = true;

            StudentInfoService.getStudentListByCourseId($scope.courseId).then(function(result) {
                $scope.isStudentLoading = false;
                for (var i = 0; i < result.length; i++) {
                    result[i].isSelected = false;
                }
                $scope.studentList = result;
            }, function(error) {
                $scope.isStudentLoading = false;
                $scope.isStudentLoadError = true;
            })
        }

        var clearSelectedStudent = function() {
            for(var j = 0; j < $scope.studentList.length; j++){
                if($scope.studentList[j].isSelected){
                    $scope.studentList[j].isSelected = false;
                }
            }
        }

        var selectAllStudent = function() {
            for(var j = 0; j < $scope.studentList.length; j++){
                 $scope.studentList[j].isSelected = true;
            }
        }

        var selectStudents = function() {
            if(!$scope.isStudentLoading) {
                var selectedStudents = getSelectedStudent();
                if(selectedStudents.length != $scope.studentList.length &&
                   selectedStudents.length != 0) {
                    clearSelectedStudent();
                }
                else if(getSelectedStudent().length == $scope.studentList.length) {
                    clearSelectedStudent();
                }
                else {
                    selectAllStudent();
                }
            }
            else {
                return
            }
                
        }

        var getSelectedStudent = function() {
            var selectedStudents = [];

            for(var i = 0; i < $scope.studentList.length; i++){
                if($scope.studentList[i].isSelected){
                    selectedStudents.push($scope.studentList[i]);
                }
            }

            return selectedStudents;
        }

        var toggleSelectStudent = function(student, index, $event) {
            if($event.ctrlKey) {
                student.isSelected = !student.isSelected;
            }
            else if($event.shiftKey) {
                if (index > $scope.lastSelectIndex) {
                    for (var i = $scope.lastSelectIndex; i <= index; i++) {
                        $scope.studentList[i].isSelected = true;
                    }
                }
                else if(index == $scope.lastSelectIndex){
                    student.isSelected = false;
                }
                else {
                    for (var i = index; i <= $scope.lastSelectIndex; i++) {
                        $scope.studentList[i].isSelected = true;
                    }
                }
            }
            else {
                clearSelectedStudent();
                student.isSelected = !student.isSelected;
            }

            $scope.lastSelectIndex = index;
        }
        
        var sendMailData = function(){
        	var mailData = [];
        	var i = 0;
        	
        	for(var j = 0; j < $scope.studentList.length; j++){
        		if($scope.studentList[j].isSelected){
        			mailData[i] = new Object();
        			mailData[i].studentId = $scope.studentList[j].id;
        			mailData[i].studentName = $scope.studentList[j].name;
        			mailData[i].courseId = $scope.studentList[j].fk_course_info_id;
        			mailData[i].address = $scope.studentList[j].email;      			
        			i++;
        		} 
        	}

            if(mailData.length != 0) {
                StudentInfoService.putStudentSendMailData(mailData);
                $state.go('studentInfo.Sendmail');          
            }
            else {
                return;
            }
        	
        }

        var changeStudentStatus = function(student,num) {
            student.isSelected = !student.isSelected;
            console.log(student);
            if(num == 0)
                student.payment_status = "免繳費";
            else if (num == 1)
                student.payment_status = "未繳費";
            else if (num == 2)
                student.payment_status = "課後再繳費";
            else if (num == 3)
                student.payment_status = "已繳費";

            StudentInfoService.updateStudentReceiptStatus(student.receipt_EIN,student.payment_status,student.receipt_status,student.id).then(function(result) 
            {
                for (var i = 0; i < $scope.studentList.length; i++) {
                    if($scope.studentList[i].id == student.id) {
                        $scope.studentList[i].receipt_EIN = student.receipt_EIN;
                        $scope.studentList[i].payment_status = student.payment_status;
                        $scope.studentList[i].receipt_status = student.receipt_status;
                        break;
                    }
                }
                console.log(result);
            }, function(error) {
                console.log(error);
            })
        }

        var openInvoiceModal = function() {
            $rootScope.$broadcast("OPEN_INVOICE_MODAL", {
                list: getSelectedStudent(),
                course: $scope.currentCourse
            });
        }

        var goCourseManage = function() {
            $state.go(STATES.COURSEINFO_MANAGE)
        }
              
    	var init = function() {
            getStudentList();
    	}

		/*==========================
            Events
        ==========================*/

        /*==========================
            Members
        ==========================*/
        $scope.isCourseEmpty = false;
        $scope.isStudentLoadError = false;
        $scope.isStudentLoading = false;
        $scope.studentList = [];
        $scope.sendMailData = sendMailData;
        $scope.courseList = [];
        $scope.currentCourse = $stateParams.courseName;
        $scope.courseId = $stateParams.courseId;
        $scope.lastSelectIndex = 0;
        $scope.searchName = "";

        /*==========================
             Methods
        ==========================*/

        $scope.toggleSelectStudent = toggleSelectStudent;
        $scope.changeStudentStatus = changeStudentStatus;
        $scope.openInvoiceModal = openInvoiceModal;
        $scope.goCourseManage = goCourseManage;
        $scope.getSelectedStudent = getSelectedStudent;
        $scope.selectAllStudent = selectAllStudent;
        $scope.selectStudents = selectStudents;

        /*==========================
             init
        ==========================*/

        init();
		
}]);