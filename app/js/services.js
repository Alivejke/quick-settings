'use strict';

angular.module('app.services', ['LocalStorageModule'])
    .factory('quickSettings', ['localStorageService', function(lsService) {
        function getIdxByName (name) {
            var idx = -1;
            settings 
            for (var i = settings.length - 1; i >= 0; i--) {
                if(settings[i].name === name) {
                    idx = i;
                    break;
                }
            };
            return idx;
        }

        function extendSettings (settings, avaliableSettings) {
            for (var i = settings.length - 1; i >= 0; i--) {
                settings[i].state = avaliableSettings[settings[i].name];                
            };

            return settings;
        }

        function removeTempItem (idx) {
            if(settings[idx].tempItem) {
                settings[idx].items.splice(settings[idx].tempItem, 1);
                settings[idx].tempItem = false;
            }
        }

        function addTempItem (idx) {
            var timestamp = settings[idx].state.timestamp,
                timeleft = parseInt( (timestamp - new Date()) / 1000 / 60 );

            if(settings[idx].tempItem) {
                removeTempItem(idx);
            }

            if(timeleft > 0) {
                if(settings[idx].items.indexOf(timeleft) === -1) {
                    settings[idx].items.push(timeleft);
                    settings[idx].items.sort(function(a, b) {return a - b;});
                    settings[idx].tempItem = settings[idx].items.indexOf(timeleft);
                }
                settings[idx].state.active = timeleft;
            } else {
                settings[idx].state.active = 'OFF';
            } 
        }

        var settings = [
                {
                    name: 'recording'
                },
                {
                    name: 'language',
                    widget: 'slider',
                    items: ['English', 'Español', 'Français']
                },
                {
                    name: 'sleepTimer',
                    widget: 'slider',
                    items: ['OFF', 5, 15, 30, 45, 60, 75, 90, 105, 120, 180, 240],
                    showCurrent: true
                },
                {
                    name: 'parentalControl'
                },
                {
                    name: 'favoriteChannel'
                }
            ],
            factory = {
                getSettings: function() {
                    return settings;
                },
                getActiveSettings: function () {
                    return lsService.get('quickSettings');
                },
                setActiveSettings: function(data) {
                    lsService.set('quickSettings', data || activeSettings);
                },
                restoreSettings: function() {
                    activeSettings = factory.getActiveSettings()
                    extendSettings(settings, activeSettings);
                },
                adjustByTime: function (isOpen) {
                    var sleepTimerIdx = getIdxByName('sleepTimer');

                    if(!settings[sleepTimerIdx].state.timestamp) {
                        return;
                    }

                    if(isOpen) {
                        addTempItem(sleepTimerIdx);                
                    } else {
                        removeTempItem(sleepTimerIdx);
                    }
                }
            },
            activeSettings = factory.getActiveSettings();

        if( !activeSettings ) {
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

            factory.setActiveSettings(activeSettings);
        }

        extendSettings(settings, activeSettings);

        return factory;
    }])
    .factory('quickSettingsTexts', function () {
        var callSign = 'WSCBS',
            channelNumber = 2,
            factory = {
                getTexts: function(options) {
                    return {
                        'recording_enabled': 'Stop recording ' + callSign + ' ' + channelNumber + ' now',
                        'recording_disabled':'Start recording ' + callSign + ' ' + channelNumber + ' now',
                        'favoriteChannel_enabled': 'Remove ' + callSign + ' ' + channelNumber + ' from Favorites List',
                        'favoriteChannel_disabled':'Add ' + callSign + ' ' + channelNumber + ' to Favorites List',
                        'language_text': 'Choose SAP language',
                        'sleepTimer_text': 'Set Sleep Timer  (minutes)',
                        'parentalControl_enabled': 'Turn OFF Parental Control',
                        'parentalControl_disabled': 'Turn ON Parental Control'
                    };
                }
            };

        return factory;
    });