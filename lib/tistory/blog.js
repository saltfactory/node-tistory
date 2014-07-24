/**
 * Created by saltfactory on 7/24/14.
 */

var request = require('request'),
  querystring = require('querystring'),
  util = require('util'),
  helper = require('./helper');

function Blog(options){
  this.options = options;
  this.params = {
    access_token : this.options.access_token,
    output : this.options.output,
    targetUrl : this.options.targetUrl
  };
}

Blog.prototype.info = function(params, callback){

  if(typeof params === 'function'){
    callback = params;
    params = null;
  }

  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/post/list?' + querystring.stringify(this.params);

  request.get(url, function (err, res, body) {
    callback(err, body, res);
  });

};

module.exports = Blog;