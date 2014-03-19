'use strict';

angular.module('app.services', ['LocalStorageModule'])
    .factory('quickSettings', ['localStorageService', function(lsService) {
        var factory = {},
            activeSettings = lsService.get('quickSettings'),
            avaliableSettings = {
                language: ['English', 'Español', 'Français'],
                sleepTimer: ['OFF', '5', '15', '30', '45', '60', '75', '90', '105', '120', '180', '240']
            };

        factory.setSettings = function(settings) {
            lsService.set('quickSettings', settings);
        }

        // Returns last saved settings
        factory.getLastSettings = function() {
            return lsService.get('quickSettings');
        }

        if(!activeSettings) {
            activeSettings = {
                recording: {
                    active: false
                },
                favoriteChannel: {
                    active: false
                },
                language: {
                    active: 'English'
                },
                sleepTimer: {
                    active: 'OFF',
                    timestamp: null
                },
                parentalControl: {
                    active: false
                }
            };

            factory.setSettings(activeSettings);
        }

        factory.activeSettings = activeSettings;

        factory.avaliableSettings = avaliableSettings;

        return factory;
    }]);