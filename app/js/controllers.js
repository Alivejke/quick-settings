'use strict';

angular.module('app.controllers', ['app.services'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', '$timeout', function($scope, quickSettings, $timeout) {
        $scope.avaliableSettings = quickSettings.avaliableSettings;
        $scope.activeSettings = quickSettings.activeSettings;

        $scope.currentTime = (new Date).getTime();

        $scope.ctrls = {
            SET: 13,
            EXIT: 27,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39
        };

        $scope.animationBlock = false;
        function unblockAnimation (delay) {
            $timeout(function() {
                $scope.animationBlock = false;
            }, delay);
        }


        $scope.isOpen = false;
        $scope.toggleOpen = function() {
            $scope.isOpen = !$scope.isOpen;
        };


        $scope.settingsSlideUp = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var last = angular.copy($scope.avaliableSettings[$scope.avaliableSettings.length - 1]);            
            $scope.avaliableSettings.unshift(last);

            $timeout(function () {
                $scope.avaliableSettings.pop();
                unblockAnimation(300);
            }, 0);
        };

        $scope.settingsSlideDown = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var first = angular.copy( $scope.avaliableSettings[0] );            
            $scope.avaliableSettings.shift();

            $timeout(function () {
                $scope.avaliableSettings.push(first);
                unblockAnimation(300);
            }, 0);
        };

    }]);