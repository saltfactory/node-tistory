/**
 * Created by saltfactory on 7/15/14.
 */
var request = require('./request'),
  util = require('util');

/**
 * Category
 *
 * @param options
 * @constructor
 */
function Category(options) {
  this.options = options || {};
}

Category.prototype.list = function (params, callback, options) {

  var options = util._extend(this.options, options);
  var url = options.baseUrl + '/category/list';

  request.post(url, options, params, callback);
};

Category.prototype.findCategoryId = function (name, callback, options) {
  this.list(null, function (err, body) {
    var json = JSON.parse(body);
    var categories = json.tistory.item.categories.category;

    var categoryId;

    categories.forEach(function (category) {
      if (category.name == name) {
        categoryId = category.id;
      }
    });

    if (categoryId == undefined){
      callback(new Error('Not found category'));
    } else {
      callback(err, categoryId);
    }



  }, options);
}


module.exports = Category;