import './css/LoginPage.css'

import { fetchUsers } from 'client/logic/actions/users'

const login = {
	templateUrl: 'templates/pages/LoginPage.html',
	controller: ['$store', '$http', '$location', function($store, $http, $location){
		this.$onDestroy = $store.subscribe(state =>{
			//login function	
			this.login = function(){
				this.user ={
					username: this.username,
					password: this.password
				}
				//console.log(this.user)
				$http({withCredentials: true, method:'post', url:'api/users/login', data: this.user, headers: {'Content-Type': 'application/json'}})
					.then(function successCallback(response) {
						alert("Login Success")
						$store.update({data: response.data.data, type: 'RECEIVE_LOGIN'})
						//console.log($store.login)
						$location.path("/account")
				  }, function errorCallback(response) {
						alert("Can't do that right now. Try again later")
						//console.log(response.data.id)
				  })
			}
			//logout function
			this.logout = function(){
				$http({withCredentials: true, method:'post', url:'api/users/logout'})
					.then(function successCallback(response) {
						alert("Logout Success")
				  }, function errorCallback(response) {
						alert("Can't logout right now. Try again later")
				  })
			}
		})
		fetchUsers($store, $http)
	}]
}

export default login