var myApp = angular.module('fileUpload', ['ngFileUpload']);

myApp.controller('MyCtrl',['Upload','$http','$scope',function(Upload,$http,$scope){
    var vm = this;
    console.log(vm);

    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3000/image', //webAPI exposed to upload the file
            data:{
                file:file
            } //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                console.log('Response : Success ' + resp.config.data.file.name + ' uploaded.');
                // console.log(resp);
                // $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                console.log('an error occured');
                // $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            // console.log('Error status: ' + resp.status);
            // $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            // console.log(evt);
            // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            // vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };

    vm.submit = function(){ //function to call on form submit
        console.log($scope);
        $http({
            method: 'POST',
            url: '/username',
            data: $scope.username,
            headers: {
                'Content-Type': 'application/json'
            }})
        // $http.post('/username',$scope.username)
        .then((response)=>{
            console.log('username : '+$scope.username);
            // console.log(response);
            // console.log($scope);
        }).catch((e)=>{
        console.log(e);
    });
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
        
  }
   
    
  
}]);