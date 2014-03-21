'use strict';

angular.module('app.services', ['LocalStorageModule'])
    .factory('quickSettings', ['localStorageService', function(lsService) {
        var factory = {},
            callSign = 'WSCBS',
            channelNumber = 2,
            activeSettings = lsService.get('quickSettings'),
            avaliableSettings = [
                {
                    name: 'recording',
                    textEnabled: 'Stop recording ' + callSign + ' ' + channelNumber + ' now',
                    textDisabled:'Start recording ' + callSign + ' ' + channelNumber + ' now'
                },
                {
                    name: 'favoriteChannel',
                    textEnabled: 'Remove ' + callSign + ' ' + channelNumber + ' from Favorites List',
                    textDisabled:'Add ' + callSign + ' ' + channelNumber + ' to Favorites List'
                },
                {
                    name: 'language',
                    text: 'Choose SAP language',
                    items: ['English', 'Español', 'Français'],
                    type: 'slider'
                },
                {
                    name: 'sleepTimer',
                    text: 'Set Sleep Timer  (minutes)',
                    items: ['OFF', 5, 15, 30, 45, 60, 75, 90, 105, 120, 180, 240],
                    type: 'slider',
                    showCurrent: true
                },
                {
                    name: 'parentalControl',
                    textEnabled: 'Turn OFF Parental Control',
                    textDisabled: 'Turn ON Parental Control'
                }
            ];

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