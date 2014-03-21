'use strict';

angular.module('app.controllers', ['app.services', 'ngAnimate'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', '$timeout', function($scope, quickSettings, $timeout) {
        $scope.avaliableSettings = quickSettings.avaliableSettings;
        $scope.activeSettings = quickSettings.activeSettings;

        $scope.currentTime = (new Date).getTime();

        $scope.settingsSlideUp = function() {
            var popped = $scope.avaliableSettings.pop();

            $timeout(function() {
                $scope.avaliableSettings.unshift(popped);
            }, 0);
        };

        $scope.settingsSlideDown = function() {
            var shifted = $scope.avaliableSettings.shift();

            $timeout(function() {
                $scope.avaliableSettings.push(shifted);
            }, 0);
        };

    }]);