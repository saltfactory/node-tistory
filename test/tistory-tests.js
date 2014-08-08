var assert = require("assert");
var fs = require('fs');
var path = require('path');


/**
 * Post BDD
 */
describe('Tistory', function () {
  var Tistory = require('../lib/tistory/tistory.js');
  var tistory;

  before(function () {
      var settingsPath = path.join(process.env.HOME, '.tistory.json');
      var options = JSON.parse(fs.readFileSync(settingsPath).toString());
    tistory = new Tistory(options);
  });

  describe.only('replace local image path to attached remote file url', function () {
    it('replace file path to attached file in document', function (done) {
      var params = {
        src:'/Users/saltfactory/Dropbox/Blog/posts/2014-08-08-upgrade-github-pages-dependency-versions.md',
        type:'markdown'
      };

      tistory.replaceImageToAttached(params, function(err, body){
        console.log(body);
        done();
      });


    });
  });
});