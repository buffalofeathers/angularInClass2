angular.module('ice2', ['ngResource'])
.factory('Chirp', ['$resource', function($resource) {
    var r = $resource('http://localhost:3000/api/chirps/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
    });
    return r;
}])
.controller('HomeController', ['$scope', 'Chirp', function($scope, Chirp) {
    $scope.welcome = 'Hello World!';
    // Chirp.query(function(success) {
    //     console.log(success);
    //     $scope.chirps = success;    
    // });
    $scope.chirps = Chirp.query();

    $scope.newChirpMessage = '';

    $scope.getSingle = function() {
        $scope.featuredChirp = Chirp.get({ id: 15 })
    }

    $scope.saveChirp = function() {
        var chirpData = {
            message: $scope.newChirpMessage,
            userId: 1
        }
        var chirp = new Chirp(chirpData);
        chirp.$save();
    }

    $scope.deleteChirp = function(num) {
        $scope.chirps[num].$delete();
    }

    $scope.updateChirp = function() {
        $scope.featuredChirp.$update();
    }
}]);