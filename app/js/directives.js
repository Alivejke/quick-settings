'use strict';


angular.module('app.directives', ['app.controllers'])
    .directive('popupQuickSettings', ['$document', function($document) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: 'QuickSettingsCtrl',
            link: function(scope, element, attrs) {
                $document.bind('keydown', function (event) {
                    if(event.which === scope.ctrls.SET) {

                        if(scope.isOpen) {
                            scope.$apply(scope.selectSetting);
                        }

                        scope.$apply(scope.toggleOpen);

                    } else if(event.which === scope.ctrls.EXIT) {

                        if(scope.isOpen) {
                            scope.$apply(function() {
                                scope.toggleOpen();
                                scope.discardSettings();
                            });
                        }

                    } else if(event.which === scope.ctrls.UP) {

                        event.preventDefault();
                        scope.settingsPrev();
                        scope.$apply(scope.discardSettings);

                    } else if(event.which === scope.ctrls.DOWN) {

                        event.preventDefault();
                        scope.settingsNext();
                        scope.$apply(scope.discardSettings);

                    } else if(event.which === scope.ctrls.LEFT) {

                        event.preventDefault();
                        scope.$apply(scope.switchSettingValue('prev'));
                        
                    } else if(event.which === scope.ctrls.RIGHT) {

                        event.preventDefault();
                        scope.$apply(scope.switchSettingValue('next'));
                        
                    }
                });
            },
            templateUrl: 'template/popup_quick_settings.html'
        }
    }]);