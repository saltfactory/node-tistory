/**
 * Created by saltfactory on 7/24/14.
 */

var assert = require("assert");


/**
 * Post BDD
 */
describe('Tistory Blog API', function () {
  var Blog = require('../lib/tistory/blog.js');
  var blog;

  /**
   * before run test method
   */
  before(function () {
    blog = new Blog(require('../examples/example-options'));
  });

  /**
   * test settings blog.options.baseUrl
   */
  describe('set baseUrl to Blog property', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(blog.options.baseUrl, 'https://www.tistory.com/apis', 'not equal');
      done();
    });
  });

  /**
   * test settings blog info
   */
  describe.only('get blog info', function () {
    it('should return blog info', function (done) {
//      var params = {
//        targetUrl : 'blog.saltfactory.net'
//      };
      blog.info(function(err,body){
        var json = JSON.parse(body);

        console.log(JSON.stringify(json, null, 2));
        done();
      });

    });
  });

});