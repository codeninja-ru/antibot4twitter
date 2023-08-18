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

Для установки скрипта вам нужно иметь юзерскрип-менеджер. Установите один из следующих менеджеров подходящий для вашего браузера:
* [Tampermonkey](https://www.tampermonkey.net/) (Поддерживает: Chrome, Microsoft Edge, Firefox, Safari💲, Opera Next)
* [Violentmonkey](https://violentmonkey.github.io/) (Поддерживает: Chrome, Microsoft Edge, Firefox)
* [Userscripts](https://github.com/quoid/userscripts/) (Поддерживает: Safari, Safari iOS)

Добавьте следующую ссылку в свой скрипт менеджер
https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot4twitter.user.js

## Tampermonkey (Chrome, Microsoft Edge, Firefox, Safari💲, Opera Next)

1. Установите расширение [Tampermonkey](https://www.tampermonkey.net/)
2. Перейдите по ссылке [antibot4twitter](https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot4twitter.user.js)
3. Tampermonkey должен предложить вам установить юзерскрипт. Нажмите кнопку _Install_
<p align="center" width="100%">
    <img width="640px" alt="Tampermonkey install" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/tampermonkey_install.png?raw=true">
</p>


## Violentmonkey (Chrome, Microsoft Edge, Firefox)

1. Установите расширение [Violentmonkey](https://violentmonkey.github.io/)
2. Перейдите по ссылке [antibot4twitter](https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot4twitter.user.js)
3. Violentmonkey должен предложить вам установить юзерскрипт. Нажмите кнопку *Confirm Installation*
<p align="center" width="100%">
    <img width="640px" alt="Violentmonkey install" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/violentmonkey_install.png?raw=true">
</p>

## Userscripts (iOS)

Установите расширение Userscripts из [AppStore](https://itunes.apple.com/us/app/userscripts/id1463298887)

Зайдите в настройки браузера Safari вашего устройства <img width="18px" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/ios_settings.png?raw=true">Настройки > <img width="18px" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari.png?raw=true">Safari > Расширения

Включите расширение <img width="18px" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/userscripts.png?raw=true">Userscripts и укажите папку со скриптами. _Если вы планируете использовать Userscripts на вашем ПК и других устройствах, имеет смысл выбрать папку в iCloud._

Перейдите по ссылке [antibot4twitter](https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot4twitter.user.js) 

Коснитесь кнопки <img width="18px" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/ios_safari_aa.png?raw=true"> в адресной строке и выберите _Userscrips_ в появившемся меню. Userscripts запросит доступ к сайту github и предложит вам установить скрипт.
<p align="center" width="100%">
    <img width="240px" alt="Safari Install 1" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari_install1.png?raw=true">
    <img width="240px" alt="Safari Install 2" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari_install2.png?raw=true">
    <img width="240px" alt="Safari Install 3" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari_install3.png?raw=true">
</p>

Откройте [Twitter](https://twitter.com/) в Safari и убедитесь, что Userscripts нашел antibot4twitter и он включен. Для этого коснитесь кнопки <img width="18px" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/ios_safari_aa.png?raw=true"> в меню настроек в адресной строке Safari.

<p align="center" width="100%">
    <img width="240px" alt="Safari As menu" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari_aa_menu.png?raw=true">
    <img width="240px" alt="Safari Userscripts Menu" src="https://github.com/codeninja-ru/antibot4twitter/blob/main/img/safari_userscripts_on.png?raw=true">
</p>

Примечание: К сожалению, расширения Userscripts не работают в сайтах установленных как Web App.
