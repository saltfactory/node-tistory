/**
 * Created by saltfactory on 7/15/14.
 */
var util = require('util'),
  Post = require('./post'),
  Category = require('./category'),
  path = require('path'),
  fs = require('fs');

function Tistory(options) {
  var settingsPath, json;

  this.baseUrl = 'https://www.tistory.com/apis';
  this.options = {
    output:'json'
  };

  settingsPath = path.join(process.env.HOME, '.tistory.json');
  if (fs.existsSync(settingsPath)) {
    json = JSON.parse(fs.readFileSync(settingsPath).toString());
  }

  this.options = util._extend(this.options, json);
  this.options = util._extend(this.options, options);

//  this.options = util._extend({}, options);
//  this.options.output = options.output || 'json'

  this.post = new Post(this.options);
  this.post.baseUrl = this.baseUrl;

  this.category = new Category(this.options);
  this.category.baseUrl = this.baseUrl;
}


Tistory.prototype.writeFromFile = function (src, options, callback) {
  var self = this;

  var opt = util._extend(this.options.post, options);

  if (fs.existsSync(src)) {
    fs.readFile(src, function (err, data) {
      if (err) throw err;

      opt.content = data.toString();

      this.post.write(opt, callback);

    });
  } else {
    console.log(src + " not found!");
  }
};

module.exports = Tistory;