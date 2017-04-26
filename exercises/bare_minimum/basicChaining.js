/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor');
var promisification = require('./promisification');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
  .then((username) => {
    if (!username) {
      console.log('no username');
      throw username;
    }
    promisification.getGitHubProfileAsync(username)
    .then((response) => {
      if (!response) {
        console.log('no response');
        throw response;
      }
      fs.writeFile(writeFilePath, JSON.stringify(response), (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
