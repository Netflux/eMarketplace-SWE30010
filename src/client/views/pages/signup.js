import './css/SignupPage.css'

const signup = {
	templateUrl: 'templates/pages/SignupPage.html',
	bindings:{
		user: '='
	},
	controller:['$store', '$http', '$log', function($store, $http, $log){

		this.user={
			username: this.user.name,
			password: this.user.password,
			email: this.user.email,
			tnc: this.user.tnc
		};
		
		this.submit = function(user){
			$http({
				method: 'POST',
				url: 'api/users/login',
				data: user,
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			})
		}
		console.log(this.user.name);
}],

	directive:['passwordVerify', function(){
		return{
			restrict:'A',
			require:'?ngModel',
			link: function(scope, elem, attrs, ngModel){
				// do nothing if no ng-model			 
				if (!ngModel) return;
				
				this.$watch(attrs.ngModel, function() {
					validate();
				});

				// observe the other value and re-validate on change
				attrs.$observe('passwordVerify', function(val) {
				  validate();
				});

				var validate = function() {
				  // values
				  var val1 = ngModel.$viewValue;
				  var val2 = attrs.passwordVerify;

				  // set validity
				  ngModel.$setValidity('passwordVerify', val1 === val2);
				};
		}
	};		
}]}

export default signup