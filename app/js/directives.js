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
                        if(!scope.isOpen) {
                            scope.$apply(scope.toggleOpen);
                        }
                    } else if(event.which === scope.ctrls.EXIT) {
                        if(scope.isOpen) {
                            scope.$apply(scope.toggleOpen);
                        }
                    } else if(event.which === scope.ctrls.UP) {
                        event.preventDefault();
                        scope.settingsSlideUp();
                    } else if(event.which === scope.ctrls.DOWN) {
                        event.preventDefault();
                        scope.settingsSlideDown();
                    } else if(event.which === scope.ctrls.LEFT) {
                        event.preventDefault();
                        
                    } else if(event.which === scope.ctrls.RIGHT) {
                        event.preventDefault();
                        
                    }
                });
            },
            templateUrl: 'template/popup_quick_settings.html'
        }
    }]);