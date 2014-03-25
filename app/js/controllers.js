'use strict';

angular.module('app.controllers', ['app.services', 'ngAnimate'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', '$timeout', function($scope, quickSettings, $timeout) {
        $scope.avaliableSettings = quickSettings.avaliableSettings;
        $scope.activeSettings = quickSettings.activeSettings;
        $scope.animationBlock = false;

        $scope.currentTime = (new Date).getTime();

        function unblockAnimation (delay) {
            $timeout(function() {
                $scope.animationBlock = false;
            }, delay);
        }

        $scope.settingsSlideUp = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var popped = angular.copy($scope.avaliableSettings[$scope.avaliableSettings.length - 1]);            
            $scope.avaliableSettings.unshift(popped);


            $timeout(function () {
                $scope.avaliableSettings.pop();
                unblockAnimation(500);
            }, 0);
        };

        $scope.settingsSlideDown = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var shifted = angular.copy( $scope.avaliableSettings[0] );            
            $scope.avaliableSettings.shift();

            $timeout(function () {
                $scope.avaliableSettings.push(shifted);
                unblockAnimation(500);
            }, 0);
        };

    }]);