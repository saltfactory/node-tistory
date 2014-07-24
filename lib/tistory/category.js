/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('request'),
  querystring = require('querystring'),
  util = require('util'),
  logger = require('hbn-logger').tracer(),
  helper = require('./helper');

/**
 * Category
 *
 * @param options
 * @constructor
 */
function Category(options) {
  this.options = options;
  this.params = {
    access_token :this.options.access_token,
    targetUrl : this.options.targetUrl,
    output : this.options.output
  };
}

Category.prototype.list = function (params, callback) {
  if(typeof params === 'function'){
    callback = params;
    params = null;
  }

  this.params = util._extend(this.params, params);
  helper.printParams(this.params);

  var url = this.options.baseUrl + '/category/list?' + querystring.stringify(this.params);

  request.get(url, function (err, res, body) {
    callback(err, body, res);
  });

};

Category.prototype.find = function (name, callback) {
  this.list(function (err, body) {
    var json = JSON.parse(body);
    var categories = json.tistory.item.categories.category;

    var category = null;

    categories.forEach(function (item) {
      if (item.name == name) {
        category = item;
      }
    });

    if (category == null) {
      callback(new Error('Not found category'), category);
    } else {
      callback(err, JSON.stringify(category));
    }


  });
}


module.exports = Category;