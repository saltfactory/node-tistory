/**
 * Created by saltfactory on 7/21/14.
 */
var assert = require("assert");


/**
 * Post BDD
 */
describe('Tistory Category API', function () {
  var Category = require('../lib/tistory/category.js');
  var category;

  /**
   * before run test method
   */
  before(function () {
    category = new Category(require('../examples/example-options'));
  });


  /**
   * test settings category.options.baseUrl
   */
  describe('set baseUrl to Category property', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(category.options.baseUrl, 'https://www.tistory.com/apis', 'not equal');
      done();
    });
  });

  /**
   * test Tistory Category list API
   */
  describe('#list()', function () {
    it('sould return tistory json', function (done) {

      category.list(function (err, body) {
        var json = JSON.parse(body);

        console.log(body);

        assert.equal(json.tistory.status, '200', 'post failed!');
        assert.equal(json.tistory.item.categories.category[0].name, 'Ruby', 'not equal');

        done();
      });
    });
  });

  /**
   * test Tistory Category list API
   */
  describe.only('#find()', function () {
    it('sould return tistory json', function (done) {

      category.find('Ruby', function (err, body) {
        console.log(body);
        var json = JSON.parse(body);
        assert.equal(json.name, 'Ruby', 'not equal');
        assert.equal(json.id, '224060', 'not equal');

        done();
      });
    });
  });

});