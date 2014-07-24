/**
 * Created by saltfactory on 7/15/14.
 */
var util = require('util'),
  Blog = require('./blog'),
  Post = require('./post'),
  Category = require('./category'),
  path = require('path'),
  logger = require('hbn-logger').tracer(),
  fs = require('fs');

function Tistory(options) {
  var settingsPath, json;

//  this.baseUrl = 'https://www.tistory.com/apis';
  this.options = {
    output:'json',
    baseUrl:'https://www.tistory.com/apis',
    prettyprint: false
  };

  settingsPath = path.join(process.env.HOME, '.tistory.json');
  if (fs.existsSync(settingsPath)) {
    json = JSON.parse(fs.readFileSync(settingsPath).toString());
  }


  this.options = util._extend(this.options, json);
  this.options = util._extend(this.options, options);

  util.print("[options:]\n")
  util.print(JSON.stringify(this.options, null, 2));

  this.blog = new Blog(this.options);
  this.post = new Post(this.options);
  this.category = new Category(this.options);

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



Tistory.prototype.listPosts = function(params){
  this.post.list(params, function(err, body){
    util.print(body);
  });
};

module.exports = Tistory;