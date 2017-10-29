import './css/LoginPage.css'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	bindings:{
		user: '='
	},
	controller: ['$http', function($http){

//		var state = false;
		
		this.user = {
			username: this.user.username,
			password: this.user.password
		}
		
		this.login = function(user){
			$http({
				method: 'POST',
				url: 'api/customer',
				data: this.user,
				headers:{
					'Content-Type': 'application/json'
				}
			}).then(function successCallback(response) {
				
			  }, function errorCallback(response) {
				
			  });
		}
		
//		if(this.username != null && this.username === test){
//			state = true;
//			
//		}else
//			state = false;
//		
//		
	}]
}

export default login