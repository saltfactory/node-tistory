/**
 * Created by saltfactory on 7/21/14.
 */
var assert = require("assert");


/**
 * Post BDD
 */
describe('Tistory Category API', function () {
  var Category = require('../lib/tistory/category.js');
  var category = new Category(require('../examples/example-options'));

  /**
   * before run test method
   */
  before(function () {
    category.baseUrl = 'https://www.tistory.com/apis';
  });


  /**
   * test settings category.baseUrl
   */
  describe('set baseUrl to Category property', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(category.baseUrl, 'https://www.tistory.com/apis', 'not equal');
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

        assert.equal(json.tistory.status, '200', 'post failed!');
        assert.equal(json.tistory.item.categories.category[0].name, 'Ruby', 'not equal');

        done();
      });
    });
  });

  /**
   * test Tistory Category list API
   */
  describe('#find()', function () {
    it('sould return tistory json', function (done) {

      category.find('Ruby', function (err, category) {
        console.log(category);
        assert.equal(category.name, 'Ruby', 'not equal');
        assert.equal(category.id, '224060', 'not equal');

        done();
      });
    });
  });

});