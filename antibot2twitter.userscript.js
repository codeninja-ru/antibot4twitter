// ==UserScript==
// @name         Twitter Antibot
// @namespace    twitter
// @version      0.1
// @description  antibot for twitter
// @author       codeninja_ru
// @match               *://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant    GM_addStyle
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_deleteValue
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
                        element.querySelectorAll('article[role=article]').forEach(function(tweet) {
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

async function getDbFromCache() {
    const timestamp = await getGmValue('db_lastupdate', 0);
    if (Date.now() - timestamp < 3600 * 24) {
        var db = await getGmValue('db');
        if (db) {
            console.log('the db has been loaded from the cache');
            return db;
        }
    } else {
        GM.deleteValue('db_lastupdate');
        GM.deleteValue('db');
    }
}

var botDb = await getDbFromCache();
var botDbStatus = 0; // 0 - not loaded, 1 - loading, 2 - loaded, 3 - failed;
const LOADING_STAUS = {NOT_LOADED: 0, LOADING: 1, LOADED: 2, FAILED: 3};
if (botDb) {
    botDbStatus = LOADING_STAUS.LOADED;
}

var botDbLoadingPromise;
function getDb() {
    if (botDbStatus == LOADING_STAUS.LOADING) {
        return botDbLoadingPromise;
    }
    botDbLoadingPromise = new Promise(function(resolve, reject) {
        if (botDbStatus == LOADING_STAUS.NOT_LOADED) {
            botDbStatus = LOADING_STAUS.LOADING;
            console.log('loading the bot db');
            fetch(BOT_DB_URL).then(function(resp) {
                resp.json().then(function(db) {
                    botDbStatus = LOADING_STAUS.LOADED;
                    botDb = db;
                    GM.setValue('db', db);
                    GM.setValue('db_lastupdate',  Date.now());
                    console.log('the bot db is loaded');
                    resolve(db);
                }).catch(function(err) {
                    alert('Could not parse the bot db, error: ' + err);
                    botDbStatus = LOADING_STAUS.FAILED;
                    reject(err);
                });

            }).catch(function(err) {
                botDbStatus = LOADING_STAUS.FAILED;
                alert('Could not load the bot db, error: ' + err);
                reject(err);
            });
        } else if (botDbStatus == LOADING_STAUS.LOADED) {
            resolve(botDb);
        } else {
            reject('not loaded');
        }

    });

    return botDbLoadingPromise;
}

function checkIfBot(userName, botCallback) {
    getDb().then(function(db) {
        if (db[userName] !== undefined) {
            botCallback(db[userName]);
        }
    });
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

document.querySelectorAll('article[role=article]').forEach(processTweet);

watchOnTweets(function(tweets) {
    tweets.forEach(processTweet);
});

console.log('Twitter Antibot has started');
