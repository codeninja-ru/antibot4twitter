// ==UserScript==
// @name         Twitter Antibot
// @namespace    twitter
// @version      0.2
// @description  antibot for twitter
// @author       codeninja_ru
// @match               *://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant    GM_addStyle
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_deleteValue
// @updateURL https://raw.githubusercontent.com/codeninja-ru/antibot4twitter/main/antibot2twitter.userscript.js
// ==/UserScript==


const BOT_DB_URL = 'https://raw.githubusercontent.com/antibot4navalny/accounts_labelled/main/labels.json';

GM_addStyle(`article[data-bot] {
        background: #FEE !important;
    }

    article[data-bot] [data-bot-name]:before {
         color: red !important;
         content: 'БОТ:';
         display: inline;
    }

    article[data-bot=red] [data-bot-name]:before {
        content: 'БОТ:';
    }

    article[data-bot=yellow] [data-bot-name]:before {
        content: '⚠️';
    }

    @media (prefers-color-scheme: dark) {
        article[data-bot] {
           background: #4b3333 !important;
        }
    }
`);

function watchOnTweets(newTweetCallback) {
    var targetNode = document.body;
    if (targetNode) {
        var config = { childList: true, subtree: true };
        // Callback function to execute when mutations are observed
        var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    var tweets = [];
                    Array.prototype.filter.call(mutation.addedNodes, function(node) {
                        return node instanceof Element;
                    })
                        .forEach(function(element) {
                        selectAllTweets(element).forEach(function(tweet) {
                            tweets.push(tweet);
                        });
                    });

                    if (tweets.length > 0) {
                        newTweetCallback(tweets);
                    }
                }

            }
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }
}

function getUserName(tweet) {
    const firstLink = tweet.querySelector('a[href]');
    if (firstLink) {
        return firstLink.getAttribute('href')
            .substring(1);
    }
}

function getGmValue(name, defaultValue = undefined) {
    const value = GM.getValue(name, defaultValue);

    // GM.set/getValue in  Violentmonkey are sync, in most other enginese they are async
    if (value instanceof Promise) {
        return value;
    } else {
        return new Promise(value);
    }
}

var botDb = {};

function loadBotDb(url) {
    return getGmValue(url).then(cache => {
        if (cache && cache.value && cache.last_update) {
            if (Date.now() - cache.last_update < 3600 * 24) {
                console.log(`the db ${url} has been loaded from the cache`);
                return cache.value;
            }
        }
        GM.deleteValue(url);
        return fetch(url)
            .then(resp => resp.json());
    }).then(db => {
        botDb = Object.assign(botDb, db);
        GM.setValue(url, {
            last_update: Date.now(),
            value: db,
        });
        return db;
    }).catch(err => {
        alert(`Could not load the db from url: ${url}, err: ${err}`);
    });

}

function checkIfBot(userName, botCallback) {
    if (botDb[userName] !== undefined) {
        botCallback(botDb[userName]);
    }
}

function processTweet(tweet) {
    const userName = getUserName(tweet);
    if (userName) {
        checkIfBot(userName, function(botInfo) {
            console.log("bot's message found, userName: " + userName);
            tweet.dataset.bot = botInfo == 'yellow' ? 'yellow' : 'red';
            tweet.querySelector('span').dataset.botName = 1;
        });
    }
}

function selectAllTweets(element) {
    return element.querySelectorAll('article[role=article]');
}

watchOnTweets(function(tweets) {
    tweets.forEach(processTweet);
});

loadBotDb(BOT_DB_URL).then(() => selectAllTweets(document).forEach(processTweet));

console.log('Twitter Antibot has started');
