/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('request'),
  util = require('util'),
  querystring = require('querystring'),
  logger = require('hbn-logger').tracer();
/**
 * Post
 *
 * @param options
 * @constructor
 */
function Post(options) {
  var defaultOptions = {
    visibility: 0,
    categoryId: 0
  };

  this.options = util._extend(defaultOptions, options);
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
  var p, url;

  p = util._extend(this.options, params);
  url = this.baseUrl + '/post/list?' + querystring.stringify(p);

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
  var p, url;

  p = util._extend(this.options, params);
  url = this.baseUrl + '/post/read?' + querystring.stringify(p);

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
  var p, url;
  p = util._extend(this.options, params);
  url = this.baseUrl + '/post/write';

  request.post(url, {form: p}, function (err, res, body) {
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
Post.prototype.update = function (params, callback) {
  var p, url;

  p = util._extend(this.options, params);
  url = this.baseUrl + '/post/modify';

  request.post(url, {form: p}, function (err, res, body) {
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
Post.prototype.delete = function (params, callback, options) {
  var options = extend(this.options, options);
  var url = options.baseUrl + '/post/delete';

  request.post(url, options, params, callback);
};

/**
 * attach
 *
 * @param params
 * @param callback
 * @param option
 */
Post.prototype.attach = function (params, callback, options) {
  var options = extend(this.options, options);
  var url = options.baseUrl + '/post/attach';

  request.form(url, options, params, callback);

////  params.uploadedfile = fs.createReadStream(params.uploadedfile);
////  _post(url, options, params, callback);
//
//  var r = request.post(url, function (err, reponse, body) {
//    callback(err, body);
//  });
//
//  var form = r.form()
//  form.append('access_token', options.accessToken);
//  form.append('targetUrl', options.targetUrl);
//  form.append('output', options.output);
//  form.append('uploadedfile', fs.createReadStream(params.uploadedfile));
////  form.append('remote_file', request('http://google.com/doodle.png'))
//
};

module.exports = Post;