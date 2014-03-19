'use strict';

angular.module('app.controllers', ['app.services'])
    .controller('QuickSettingsCtrl', ['$scope', 'quickSettings', function($scope, quickSettings) {
        $scope.avaliableSettings = quickSettings.avaliableSettings;
        $scope.activeSettings = quickSettings.activeSettings;
    }]);