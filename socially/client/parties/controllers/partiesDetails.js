		angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$meteor',
		  function($scope, $stateParams, $meteor){

		    $scope.party = $meteor.object(Parties, $stateParams.partyId);

			var subscriptionHandle;
			$meteor.subscribe('parties').then(function(handle) {
			  subscriptionHandle = handle;
			});		    

		    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');

			$scope.save = function() {
		      $scope.party.save().then(function(numberOfDocs){
		        console.log('save success doc affected ', numberOfDocs);
		      }, function(error){
		        console.log('save error', error);
		      });
		    };

		    $scope.reset = function() {
		      $scope.party.reset();
		    };

			$scope.$on('$destroy', function() {
				subscriptionHandle.stop();
			});		    
		}]);	