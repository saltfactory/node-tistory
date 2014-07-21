/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('request'),
  querystring = require('querystring'),
  util = require('util'),
  logger = require('hbn-logger').tracer();

/**
 * Category
 *
 * @param options
 * @constructor
 */
function Category(options) {
//  logger.debug(options);
  this.options = options || {};
}

Category.prototype.list = function (params, callback) {
  var p, url;

  if(typeof params === 'function'){
    callback = params;
    params = null;
  }

  p = util._extend(this.options, params);
  url = this.baseUrl + '/category/list?' + querystring.stringify(p);

  request.get(url, function (err, res, body) {
    callback(err, body, res);
  });

};

Category.prototype.find = function (name, callback, options) {
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
      callback(err, category);
    }


  }, options);
}


module.exports = Category;