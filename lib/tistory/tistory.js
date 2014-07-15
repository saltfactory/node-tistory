/**
 * Created by saltfactory on 7/15/14.
 */
var util = require('util'),
  Post = require('./post'),
  Category = require('./category');

function Tistory(options) {
  this.options = util._extend({}, options);
  this.options.output = options.output || 'json'
  this.options.baseUrl = 'https://www.tistory.com/apis/';
  this.post = new Post(this.options);
  this.category = new Category(this.options);
}

module.exports = Tistory;