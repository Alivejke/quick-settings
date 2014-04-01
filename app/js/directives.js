'use strict';


angular.module('app.directives', ['app.controllers'])
    .directive('popupQuickSettings', ['$document', function($document) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            controller: 'QuickSettingsCtrl',
            link: function(scope, element, attrs) {
                var delay = parseInt(attrs.closeTimer) * 1000;

                $document.bind('keydown', function (event) {
                    if(event.which === scope.ctrls.SET) {

                        if(scope.isOpen) {
                            scope.$apply(scope.selectSetting);
                        } else {
                            scope.$apply( scope.closeTimer(delay) );
                        }

                        scope.$apply(scope.toggleOpen);

                    } else if(event.which === scope.ctrls.EXIT) {
                        scope.closeTimer(delay);

                        if(scope.isOpen) {
                            scope.$apply(function() {
                                scope.discardSettings();
                                scope.toggleOpen();
                            });
                        }

                    } else if(event.which === scope.ctrls.UP) {
                        scope.closeTimer(delay);
                        event.preventDefault();

                        scope.settingsPrev();
                        scope.$apply(scope.discardSettings);

                    } else if(event.which === scope.ctrls.DOWN) {
                        scope.closeTimer(delay);
                        event.preventDefault();

                        scope.settingsNext();
                        scope.$apply(scope.discardSettings);

                    } else if(event.which === scope.ctrls.LEFT) {
                        scope.closeTimer(delay);
                        event.preventDefault();

                        scope.$apply(scope.switchSettingValue('prev'));
                        
                    } else if(event.which === scope.ctrls.RIGHT) {
                        scope.closeTimer(delay);
                        event.preventDefault();
                        
                        scope.$apply(scope.switchSettingValue('next'));
                        
                    }
                });
            },
            templateUrl: 'template/popup_quick_settings.html'
        }
    }]);