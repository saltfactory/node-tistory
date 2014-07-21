/**
 * Created by saltfactory on 7/18/14.
 */
var assert = require("assert");


/**
 * Post BDD
 */
describe('Tistory Post API', function () {
  var Post = require('../lib/tistory/post.js');
  var post = new Post(require('../examples/example-options'));

  /**
   * before run test method
   */
  before(function () {
    post.baseUrl = 'https://www.tistory.com/apis';
  });

  /**
   * test settings post.baseUrl
   */
  describe('set baseUrl to Post property', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(post.baseUrl, 'https://www.tistory.com/apis', 'not equal');
      done();
    });
  });

  /**
   * test Tistory Posts list API
   */
  describe.only('#list()', function () {
    it('sould return tistory json', function (done) {

      post.list({page: 1}, function (err, body) {
        var json = JSON.parse(body);

        assert.equal(json.tistory.status, '200', 'post failed!');
        assert.equal(json.tistory.item.url, 'http://rubygalaxy.tistory.com', 'not equal');

        done();
      });
    });

  });

  /**
   * test Tistory Post write API
   */
  describe('#write()', function () {
    it('should return postId', function (done) {
      var params = {
        tag: 'nodejs, node-tistory',
        title: 'test',
        content: '본문'
      };

      post.write(params, function (err, body) {
        var json = JSON.parse(body);

        assert.equal(json.tistory.status, '200', 'post failed!');

        done();
      });

    });

  });

  /**
   * test Tistory Post read API
   */
    describe('#read()', function () {
      it('shoud return post item', function(done){
        var params = {
          postId:8
        };

        post.read(params, function(err, body){
          var json = JSON.parse(body);

          assert.equal(json.tistory.status, '200', 'post failed!');
          assert.equal(json.tistory.item.postUrl, 'http://rubygalaxy.tistory.com/8', 'post failed!');

          done();
        });
      })
    });

  /**
   * test Tistory Post update API
   */
  describe('#update()', function () {
    it('shoud return post item', function(done){
      var params = {
        postId:8,
        tag: 'nodejs, node-tistory',
        title: 'test2',
        content: '본문2'
      };

      post.update(params, function(err, body){
        var json = JSON.parse(body);
        console.log(body);
        assert.equal(json.tistory.status, '200', 'post failed!');
        assert.equal(json.tistory.url, 'http://rubygalaxy.tistory.com/8', 'post failed!');

        done();
      });
    })
  });

})