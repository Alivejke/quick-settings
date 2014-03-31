'use strict';

angular.module('app.controllers', ['app.services'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', '$timeout', function($scope, quickSettings, $timeout) {
        $scope.avaliableSettings = quickSettings.avaliableSettings.slice();
        $scope.activeSettings = quickSettings.getSettings();

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

            $scope.avaliableSettings = quickSettings.updateSettings();
        };

        $scope.selectSetting = function() {
            // Second is always the active one
            var activeSetting = $scope.avaliableSettings[2];

            if(activeSetting.widget === 'slider') {
                $scope.applySettings();
            } else {
                $scope.toggleSetting(activeSetting.name);
                $scope.applySettings();
            }
        }

        $scope.discardSettings = function() {
            $scope.activeSettings = quickSettings.getSettings();
        }

        $scope.applySettings = function() {
            quickSettings.setSettings($scope.activeSettings);
        }

        $scope.toggleSetting = function (activeSettingName) {
            $scope.activeSettings[activeSettingName].active = !$scope.activeSettings[activeSettingName].active;
        }


        $scope.settingsPrev = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var last = angular.copy($scope.avaliableSettings[$scope.avaliableSettings.length - 1]);            
            $scope.avaliableSettings.unshift(last);

            $timeout(function () {
                $scope.avaliableSettings.pop();
                unblockAnimation(300);
            }, 0);
        };

        $scope.settingsNext = function() {
            if($scope.animationBlock) return;
            $scope.animationBlock = true;

            var first = angular.copy( $scope.avaliableSettings[0] );            
            $scope.avaliableSettings.shift();

            $timeout(function () {
                $scope.avaliableSettings.push(first);
                unblockAnimation(300);
            }, 0);
        };

        $scope.switchSettingValue = function(direction) {
            var activeSetting = $scope.avaliableSettings[2],
                currIdx = activeSetting.items.indexOf($scope.activeSettings[activeSetting.name].active);

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

            $scope.activeSettings[activeSetting.name].active = activeSetting.items[currIdx];

            if(activeSetting.name === 'sleepTimer') {
                $scope.activeSettings[activeSetting.name].timestamp = (new Date ()).getTime();
            }
        };

    }]);