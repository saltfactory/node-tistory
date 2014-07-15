/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('./request'),
  util = require('util');
/**
 * Post
 *
 * @param options
 * @constructor
 */
function Post(options) {
  this.options = options || {};
}

/**
 * list
 *
 * @param options
 * @param callback
 */
Post.prototype.list = function (params, callback, options) {

  options = util._extend(this.options, options);

  var url = options.baseUrl + '/post/list';

  request.post(url, options, params, callback);
};

/**
 * write
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.write = function (params, callback, options) {
  var options = extend(this.options, options);
  var url = options.baseUrl + '/post/write';

  request.post(url, options, params, callback);
};

/**
 * update
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.update = function (params, callback, options) {
  var options = extend(this.options, options);
  var url = options.baseUrl + '/post/modify';

  request.post(url, options, params, callback);
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

/**
 * read
 *
 * @param params
 * @param callback
 * @param options
 */
Post.prototype.read = function (params, callback, options) {
  var options = extend(this.options, options);
  var url = options.baseUrl + '/post/read';

  request.post(url, options, params, callback);
};

module.exports = Post;