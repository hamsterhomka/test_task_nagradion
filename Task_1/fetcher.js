'use strict'

let urls = require('./services');

(function main() {
    const results = fetcher(urls) || [];
    results.forEach(result => {
        console.log(result.url, ' - ', result.responseTime);
    });
})();

/**
 * @typedef Result
 * @type {object}
 * @property {string} url.
 * @property {number} responseTime - time of response in ms .
 */

/*
 * @param {string[]} urls - services urls
 * @returns {Result[]} results 
 */
function fetcher(urls) {
    /* Ваш код здесь */
}


