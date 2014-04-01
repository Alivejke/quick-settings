'use strict';

angular.module('app.controllers', ['app.services'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', 'quickSettingsTexts', '$timeout', function($scope, quickSettings, quickSettingsTexts, $timeout) {        
        quickSettings.adjustByTime($scope.isOpen);
        $scope.settings = quickSettings.getSettings();

        $scope.txts = quickSettingsTexts.getTexts();

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

            quickSettings.adjustByTime($scope.isOpen);

            if(!$scope.isOpen) {
                $timeout.cancel($scope.closePromise);
            }
        };

        $scope.selectSetting = function() {
            // Second is always the active one
            var activeSetting = $scope.settings[2];

            if(activeSetting.widget === 'slider') {
                $scope.applySettings();
            } else {
                $scope.toggleSetting(activeSetting);
                $scope.applySettings();
            }
        };

        $scope.discardSettings = function() {
            $timeout(function () {
                quickSettings.restoreSettings();
                quickSettings.adjustByTime($scope.isOpen);
            }, 0);
            
        };

        $scope.applySettings = function() {
            quickSettings.setActiveSettings();
        };

        $scope.toggleSetting = function (activeSetting) {
            activeSetting.state.active = !activeSetting.state.active;
        };


        $scope.settingsPrev = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var last = angular.copy($scope.settings[$scope.settings.length - 1]);            
            $scope.settings.unshift(last);

            $timeout(function () {
                $scope.settings.pop();
                unblockAnimation(300);
            }, 0);
        };

        $scope.settingsNext = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var first = angular.copy( $scope.settings[0] );            
            $scope.settings.shift();

            $timeout(function () {
                $scope.settings.push(first);
                unblockAnimation(300);
            }, 0);
        };

        $scope.switchSettingValue = function(direction) {
            var activeSetting = $scope.settings[2];

            if(activeSetting.widget != 'slider') {
                return;
            }

            var currIdx = activeSetting.items.indexOf(activeSetting.state.active);

            if(direction === 'next') {
                currIdx++;
                if(currIdx >= activeSetting.items.length) {
                    currIdx = 0;
                }
            } else if(direction === 'prev') {
                currIdx--;
                if(currIdx < 0) {
                    currIdx = activeSetting.items.length - 1;
                }
            }

            activeSetting.state.active = activeSetting.items[currIdx];

            if(activeSetting.name === 'sleepTimer') {
                activeSetting.state.timestamp = (new Date ()).getTime() + activeSetting.state.active * 60 * 1000;
                quickSettings.adjustByTime(false);
            }
        };

        $scope.closeTimer = function (delay) {
            if($scope.closePromise) {
                $timeout.cancel($scope.closePromise);
            }

            $scope.closePromise = $timeout($scope.toggleOpen, delay);
        };

    }]);