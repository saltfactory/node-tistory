var assert = require("assert");


/**
 * Post BDD
 */
describe('Tistory', function () {
  var Tistory = require('../lib/tistory/tistory.js');
  var tistory;

  before(function () {
    tistory = new Tistory(require('../examples/example-options'));
  });

  describe.only('replace local image path to attached remote file url', function () {
    it('replace file path to attached file in document', function (done) {
      var params = {
        src:'/Users/saltfactory/Dropbox/Blog/posts/2014-07-16-using-passport-tistory-in-express.md',
        type:'markdown'
      };

      tistory.replaceImageToAttached(params, function(err, body){
        console.log(body);
        done();
      });


    });
  });
});