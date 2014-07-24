/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('request'),
  util = require('util'),
  querystring = require('querystring'),
  helper = require('./helper'),
  fs = require('fs'),
  logger = require('hbn-logger').tracer();

/**
 * Post
 *
 * @param options
 * @constructor
 */
function Post(options) {
//  var defaultOptions = {
//    visibility: 0,
//    categoryId: 0
//  };

  this.options = options;
  this.params = {
    access_token: this.options.access_token,
    targetUrl: this.options.targetUrl,
    output: this.options.output
  };

//  this.params = util._extend({}, options.post);
}

/**
 * list
 *
 * @paaram params
 * @param callback
 * @param options
 */
Post.prototype.list = function (params, callback) {
  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/post/list?' + querystring.stringify(this.params);

  request.get(url, function (err, res, body) {
    callback(err, body, res);
  });
};


/**
 * read
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.read = function (params, callback) {
  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/post/read?' + querystring.stringify(this.params);

  request.get(url, function (err, res, body) {
    callback(err, body, res);
  });
};


/**
 * write
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.write = function (params, callback) {
  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/post/write';

  request.post(url, {form: this.params}, function (err, res, body) {
    callback(err, body, res);
  });
};

/**
 * update
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.modify = function (params, callback) {
  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/post/modify';

  request.post(url, {form: this.params}, function (err, res, body) {
    callback(err, body, res);
  });
};

/**
 * delete
 *
 * @param params
 * @param callback
 * @param options
 */
//TODO: Tistory 협의후 사용 가능
Post.prototype.delete = function (params, callback) {
//  this.params = util._extend(this.params, params);
//  helper.printParams(this.params);
//  var url = this.options.baseUrl + '/post/delete';
//
//  request.post(url, {form:this.params}, function(err,res,body){
//    callback(err, body, res);
//  });
};

/**
 * attach
 *
 * @param params
 * @param callback
 * @param option
 */
Post.prototype.attach = function (params, callback) {

  this.params = util._extend(this.params, params);
  var url = this.options.baseUrl + '/post/attach';
  helper.printParams(this.params);

  var r = request.post(url, function (err, res, body) {
    logger.debug(body);
    callback(err, body, res);
  });

  var form = r.form();
  var self = this;
  var keys = Object.keys(self.params);
  keys.forEach(function (key) {
    form.append(key, self.params[key]);
    if (key === 'uploadedfile') {
      form.append('uploadedfile', fs.createReadStream(self.params.uploadedfile));
    }
  });

};

module.exports = Post;