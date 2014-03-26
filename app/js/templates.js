angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/popup_quick_settings.html',
    "<div class=\"popup_wrap\" ng-show=\"isOpen\">\r" +
    "\n" +
    "    <div class=\"popup_fone\"></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <section class=\"popup_window popup_quick_settings\">\r" +
    "\n" +
    "        <header class=\"quick_settings_header\">\r" +
    "\n" +
    "            <h1 class=\"quick_settings_title\">Quick Settings</h1>\r" +
    "\n" +
    "            <div class=\"quick_settings_descr\">Highlight an option, then press SELECT</div>\r" +
    "\n" +
    "        </header>\r" +
    "\n" +
    "        \r" +
    "\n" +
    "        <section class=\"quick_settings_content\">\r" +
    "\n" +
    "            <ul class=\"quick_settings_list\">\r" +
    "\n" +
    "                <li \r" +
    "\n" +
    "                    class=\"quick_settings_item {{'idx_'+ $index}} {{setting.type === 'slider' ? ' inner_slider' : ''}}\" \r" +
    "\n" +
    "                    ng-repeat=\"setting in avaliableSettings | limitTo:5\" \r" +
    "\n" +
    "                    ng-switch=\"setting.type\"\r" +
    "\n" +
    "                >\r" +
    "\n" +
    "                    <span class=\"quick_settings_item_name\" ng-switch-default=\"\">\r" +
    "\n" +
    "                        {{activeSettings[setting.name].active ? setting.textEnabled : setting.textDisabled}}\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <span class=\"quick_settings_item_name\" ng-switch-when=\"slider\">\r" +
    "\n" +
    "                        {{setting.text}}\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <span class=\"quick_settings_item_value\" ng-show=\"setting.showCurrent && activeSettings[setting.name].active != 'OFF'\">\r" +
    "\n" +
    "                        {{activeSettings[setting.name].active}}\r" +
    "\n" +
    "                    </span>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"quick_settings_value_block\" ng-switch-when=\"slider\">\r" +
    "\n" +
    "                        <ul class=\"quick_settings_value_list\">\r" +
    "\n" +
    "                            <li class=\"quick_settings_value_item {{activeSettings[setting.name].active === item ? 'active' : ''}}\" ng-repeat=\"item in setting.items\">\r" +
    "\n" +
    "                                {{item}}\r" +
    "\n" +
    "                            </li>\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <button class=\"quick_settings_value_item_prev\"></button>\r" +
    "\n" +
    "                        <button class=\"quick_settings_value_item_next\"></button>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"quick_settings_item_prev\" ng-click=\"settingsSlideUp()\"></button>\r" +
    "\n" +
    "            <button class=\"quick_settings_item_next\" ng-click=\"settingsSlideDown()\"></button>\r" +
    "\n" +
    "        </section>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <footer class=\"quick_settings_footer\">\r" +
    "\n" +
    "            <button class=\"button button_set\">\r" +
    "\n" +
    "                <i>SET</i>\r" +
    "\n" +
    "                More Settings\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "            <button class=\"button button_exit\">\r" +
    "\n" +
    "                <i>EXIT</i>\r" +
    "\n" +
    "                Return to TV\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </footer>\r" +
    "\n" +
    "    </section>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
