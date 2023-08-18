# Подсветка кремлеботов в Twitter (Userscript)

Подсвечивает ботов в твиттере.

Пример:
<p align="center" width="100%">
    <img width="60%" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/example.png?raw=true">
</p>

Основан на расширении для браузера и базе кремлеботов
https://github.com/antibot4navalny/metabot © [antibot4navalny](https://twitter.com/antibot4navalny)

Протестировано на
* Safari + [Tampermonkey](https://www.tampermonkey.net/)
* Chrome + [Violentmonkey](https://violentmonkey.github.io/)
* Safari (iOS) + [Userscripts](https://github.com/quoid/userscripts/)

# Установка

Для установки скрипта вам нужено иметь юзерскрип мендажер. Установите один из следующих менаджеров подходящий для вашего браузера:
* [Tampermonkey](https://www.tampermonkey.net/) (Поддерживает: Chrome, Microsoft Edge, Firefox, Safari💲, Opera Next)
* [Violentmonkey](https://violentmonkey.github.io/) (Поддерживает: Chrome, Microsoft Edge, Firefox)
* [Userscripts](https://github.com/quoid/userscripts/) (Поддерживает: Safari, Safari iOS)

## Tampermonkey (Chrome, Microsoft Edge, Firefox, Safari💲, Opera Next)
## Violentmonkey (Chrome, Microsoft Edge, Firefox)
## Userscripts (iOS)

Установите расширение Userscripts из [AppStore](https://itunes.apple.com/us/app/userscripts/id1463298887)

Зайдите в настройки браузера Safari вашего устройства ![Настройки](/img/ios_settings.png){:height="36px" width="36px"}Настройки > ![Safari](/img/safari.png){:height="36px" width="36px"}Safari > Расширения
Вкючите расширение ![Userscripts](/img/userscripts.png){:height="36px" width="36px"}Userscripts и укажите папку с юзерскритами. Если вы планируете испльзоваться Userscripts на вашем ПК и других устройствах, имеет смысл выбрать папку в iCloud.
Скачайте antibot4twitter в выбранную папку.

Откройте [twitter](https://twitter.com/) в Safari и убидетись, что Userscripts нашел antibot4twitter и он включен. Для этого каснитесь кнопки ![AA](/img/ios_safari_aa.png){:height="36px" width="36px"} в меню настроек в адрессной строке Safari.

![Safari Aa Menu](/img/safari_aa_menu.png){:width="640px"} ![Safari Userscripts Menu](/img/safari_userscripts_on.png){:width="640px"}

Добавьте следующую ссылку в свой скрипт менеджер
https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot4twitter.userscript.js

