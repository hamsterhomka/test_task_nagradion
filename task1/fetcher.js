'use strict';

let urls = require('./services');
const fetch = require('node-fetch');

(async function main() {
  const results = await fetcher(urls) || [];
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

async function fetcher(urls) {
  const MAX_CONNECTIONS = 3;
  const initialFetchUrls = urls.slice(0, MAX_CONNECTIONS);
  const secondaryFetchUrls = urls.slice(MAX_CONNECTIONS);
  const responseTimeItems = [];

  return new Promise((resolve) => {
    initialFetchUrls.forEach(fetchUrlNext);

    function fetchUrlNext(url) {
      fetchUrl(url, new Date())
        .then((responseTimeItem) => {
          responseTimeItems.push(responseTimeItem);

          if(responseTimeItems.length === urls.length) {
            responseTimeItems.sort((a, b) => a.responseTime - b.responseTime);
            resolve(responseTimeItems);
          }

          if(secondaryFetchUrls.length) {
            fetchUrlNext(secondaryFetchUrls.shift());
          }
        });
    }
  });
}

function fetchUrl(url, startTime) {
  return fetch(url)
    .then(() => {
      const endTime = new Date();
      const responseTime = endTime - startTime;
      return {url, responseTime};
    })
    .catch((error) => {
        console.error(error.message);
        return {url};
      });
}



