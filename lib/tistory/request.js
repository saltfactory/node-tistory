/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('request'),
  util = require('util'),
  fs = require('fs');


exports.post = function(url, options, params, callback) {

  var form = {
    access_token: options.accessToken,
    targetUrl: options.targetUrl,
    output: options.output
  };

  form = util._extend(form, params);

  request.post(url, {form: form}, function (err, res, body) {
    callback(err, body)
  });
};

/**
 * form
 *
 * @param url
 * @param options
 * @param params
 * @param callback
 */
exports.form = function(url, options, params, callback) {
  var r = request.post(url, function (err, reponse, body) {
    callback(err, body);
  });

  var form = r.form()
  form.append('access_token', options.accessToken);
  form.append('targetUrl', options.targetUrl);
  form.append('output', options.output);

  var keys = Object.keys(params);
  keys.forEach(function (key) {
    form.append(key, params[key]);
    if (key == 'uploadedfile'){
      form.append('uploadedfile', fs.createReadStream(params.uploadedfile));
    }
  });
};

