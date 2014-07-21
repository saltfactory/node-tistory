/**
 * Created by saltfactory on 7/21/14.
 */
var assert = require("assert"),
  logger = require('hbn-logger').tracer();


/**
 * Post BDD
 */
describe('Tistory Settings File Load', function () {
  var Tistory = require('../lib/tistory/tistory.js');

  /**
   * test loading global settings
   */
  describe('load global settings .tistory.json', function () {
    it('should return rubygalaxy when the value is not present', function (done) {
      var tistory = new Tistory();
      logger.info(tistory.category.options);
      assert.equal(tistory.category.options.targetUrl, 'rubygalaxy', 'not equal');
      done();
    });
  });

  /**
   * test loading option settings
   */
  describe('set option settings', function () {
    it('should return blog.saltfactory.net when the value is not present', function (done) {
      var tistory = new Tistory({
        targetUrl:'blog.saltfactory.net'
      });

      logger.info(tistory.category.options);
      assert.equal(tistory.category.options.targetUrl, 'blog.saltfactory.net', 'not equal');
      done();
    });
  });

});