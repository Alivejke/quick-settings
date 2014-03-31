'use strict';

angular.module('app.services', ['LocalStorageModule'])
    .factory('quickSettings', ['localStorageService', function(lsService) {
        function getIdxByName(name, array) {
            var idx = -1;

            for (var i = array.length - 1; i >= 0; i--) {
                if(array[i].name === name) {
                    idx = i;
                }
            };

            return idx;
        }

        var callSign = 'WSCBS',
            channelNumber = 2,
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
            ],
            activeSettings,
            factory = {
                setActiveSettings: function(activeSettings) {
                    lsService.set('quickSettings', activeSettings);
                },
                getSettings: function() {
                    var settings = helpers.extend(avaliableSettings, activeSettings);
                    return settings;
                },
                getAvaliableSettings: function () {
                    return avaliableSettings;
                },
                getActiveSettings: function () {
                    activeSettings = lsService.set('quickSettings');
                    return activeSettings;
                }/*,
                updateSettings: function (activeSettings) {
                    var updated = factory.avaliableSettings.slice();

                    if(activeSettings.sleepTimer.timestamp) {
                        var timepast = ( new Date() - new Date(activeSettings.sleepTimer.timestamp) ) / 1000 / 60,
                            timeleft = parseInt(activeSettings.sleepTimer.active - timepast);
                        
                        if(timeleft > 0) {
                            var sleepTimerIdx = getIdxByName('sleepTimer', updated);
                            updated[sleepTimerIdx].items.push(timeleft);
                            updated[sleepTimerIdx].items.sort(function(a, b) {return a - b;});
                            activeSettings.sleepTimer.active = timeleft;
                            activeSettings.sleepTimer.timestamp = new Date();
                        } else {
                            activeSettings.sleepTimer.active = 'OFF';
                        }

                        this.setSettings(activeSettings);
                    }

                    return updated;
                }*/
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
        }

        return factory;
    }]);