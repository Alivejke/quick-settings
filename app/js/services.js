'use strict';

angular.module('app.services', ['LocalStorageModule'])
    .factory('quickSettings', ['localStorageService', function(lsService) {
        function getIdxByName(name) {
            var idx = -1;

            for (var i = arr.length - 1; i >= 0; i--) {
                if(arr[i].name === name) {
                    idx = i;
                }
            };

            return idx;
        }

        var callSign = 'WSCBS',
            channelNumber = 2,
            factory = {
                setSettings: function(settings) {
                    lsService.set('quickSettings', settings);
                },
                getSettings: function() {
                    return lsService.get('quickSettings');
                },
                updateSettings: function () {
                    var updated = factory.avaliableSettings.slice();

                    if(activeSettings.sleepTimer.timestamp) {
                        var timepast = ( new Date() - new Date(activeSettings.sleepTimer.timestamp) ) / 1000 / 60,
                            timeleft = parseInt(activeSettings.sleepTimer.active - timepast);
                        
                        if(timeleft > 0) {
                            updated[getIdxByName(sleepTimer)].items.push(timeleft);
                            updated[getIdxByName(sleepTimer)].items.sort(function(a, b) {return a - b;});
                            activeSettings.sleepTimer.active = timeleft;
                            activeSettings.sleepTimer.timestamp = new Date();
                        }
                    }

                    return updated;
                },
                avaliableSettings: [
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
                        widget: 'slider'
                    },
                    {
                        name: 'sleepTimer',
                        text: 'Set Sleep Timer  (minutes)',
                        items: ['OFF', 5, 15, 30, 45, 60, 75, 90, 105, 120, 180, 240],
                        widget: 'slider',
                        showCurrent: true
                    },
                    {
                        name: 'parentalControl',
                        textEnabled: 'Turn OFF Parental Control',
                        textDisabled: 'Turn ON Parental Control'
                    }
                ]
            },
            activeSettings = factory.getSettings();

        if( !activeSettings ) {
            factory.setSettings({
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
            });
        } else {
            // if(activeSettings.sleepTimer.timestamp) {
            //     var timepast = ( new Date() - new Date(activeSettings.sleepTimer.timestamp) ) / 1000 / 60,
            //         timeleft = parseInt(activeSettings.sleepTimer.active - timepast);
                
            //     if(timeleft > 0) {
            //         var idx = factory.avaliableSettings[3].items.indexOf(activeSettings.sleepTimer.active);
            //         factory.avaliableSettings[3].items.splice(idx, 0, timeleft);
            //         activeSettings.sleepTimer.active = timeleft;
            //         factory.setSettings(activeSettings);
            //     }
            // }
        }

        return factory;
    }]);