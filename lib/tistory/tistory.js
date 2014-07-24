/**
 * Created by saltfactory on 7/15/14.
 */
var util = require('util'),
  Blog = require('./blog'),
  Post = require('./post'),
  Category = require('./category'),
  path = require('path'),
  logger = require('hbn-logger').tracer(),
  asyncReplace = require('async-replace'),
  fs = require('fs');

/**
 * Tistory
 *
 * @param options
 * @constructor
 */
function Tistory(options) {
  var settingsPath, json;

//  this.baseUrl = 'https://www.tistory.com/apis';
  this.options = {
    output: 'json',
    baseUrl: 'https://www.tistory.com/apis',
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

/**
 * replaceImageToAttached
 *
 * 파일안에 로컬 이미지의 path를 검색해서 티스토리에 파일 첨부한 후 획득한 URL로 변경하여 새롭게 파일을 저장함
 * @param params
 * @param callback
 */
//TODO: 현재 markdown 파일만 가능한데 HTML 파일도 변환 가능하게 수정할 것
Tistory.prototype.replaceImageToAttached = function (params, callback) {
  var src = params.src;
  var dest = path.join(path.dirname(params.src), path.basename(params.src, path.extname(params.src))+".copy"+ path.extname(params.src));
  var self = this;

  fs.readFile(src, function (err, data) {
    var body = data.toString();

    function replacer(whole, a, href, c, offset, input, done) {
      var replacedHref;

      self.post.attach({uploadedfile: href}, function (err, body) {
        if (err) {
          logger.error(err);
        } else {
          var json = JSON.parse(body);
          replacedHref = json.tistory.url;
          done(null, a + replacedHref + c);
        }
      });
    }

    asyncReplace(body, /(!\[.*?\]\()(.+?)(\))/g, replacer, function (err, result) {
      fs.writeFile(dest, result, function(err){
        return callback(err, result);
      });

    });

  });

};


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


Tistory.prototype.listPosts = function (params) {
  this.post.list(params, function (err, body) {
    util.print(body);
  });
};

module.exports = Tistory;