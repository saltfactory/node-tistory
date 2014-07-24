#!/usr/bin/env node

"use strict";
var path = require('path'),
  fs = require('fs'),
  lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib'),
  util = require('util'),
  Tistory = require(lib + '/tistory'),
  logger = require('hbn-logger').tracer(),
  nopt = require("nopt");

var knownOpts = { "targetUrl": String,
  "cfg": path,
  "token": String,
  "opt": String,
  "output": String,

  "src": path,
  "pretty": Boolean,

// posts list
  "page": Number,
  "count": Number,

  "categoryId": Number,
  "sort": String,

// posts write
  "title": String,
  "tag": String,
  "content": String,
  "visibility": Number,
  "published": String,
  "category": Number,

// post read
  "postId": Number,

// post attach
  "uploadedfile": String,

// category
  "name":String

};

var shortHands = { "url": ["-targetUrl"], "t": ["-token"], "file": ["-uploadedfile"]};
var parsed = nopt(knownOpts, shortHands, process.argv, 1);
var options = {};


util.print("*** start mark2html ***\n");

var defaultCfg = path.join(process.env.HOME, '.tistory.json');

if (!fs.existsSync(defaultCfg)) {
  logger.warn('Not found global options file! node-tistory go on with default options');
  util.print("[Solution] You do create global options file. e.g. echo \"{'targetUrl':'blog.saltfactory.net'}\" > " + defaultCfg);
} else {
  var settingsPath = path.join(process.env.HOME, '.tistory.json');
  if (fs.existsSync(settingsPath)) {
    json = JSON.parse(fs.readFileSync(settingsPath).toString());
  }
  options = util._extend(options, json);
}


if (parsed.cfg) {
  if (!fs.existsSync(parsed.cfg)) {
    logger.warn('Not found global options file! node-tistory go on with default options');
    console.log("[Solution] You do create global options file. e.g. echo \"{'targetUrl':'blog.saltfactory.net'}\" > " + defaultCfg);
  } else {
    options = util._extend(options, JSON.parse(fs.readFileSync(parsed.cfg)));
  }
}


if (parsed.opt) {
  var json;
  try {
    json = JSON.parse(parsed.opt);
    options = util._extend(options, json);
  } catch (e) {
    logger.error(e.message);
  }
}

if (parsed.url) {
  options = util._extend(options, {targetUrl: parsed.url});
}

if (parsed.output) {
  options = util._extend(options, {output: parsed.output});
}

if (parsed.pretty) {
  options.prettyprint = parsed.pretty;
}

//util.print(JSON.stringify(options));
var command = parsed.argv.remain[1];
var subCommand = parsed.argv.remain[2];

//logger.debug(command);

function end() {
  util.print("\n*** end mark2html ***\n");
}

function out(str) {
  util.print("\n[output:]\n");
  if ((options.output === 'json') && options.prettyprint) {
    util.print(JSON.stringify(JSON.parse(str), null, 2));
  } else {
    util.print(str);
  }
}

var tistory = new Tistory(options);
if (command === "blog") {
  var params = {};

  if (subCommand === "info") {
    if (parsed.targetUrl) {
      params = util._extend(params, {targetUrl: parsed.targetUrl});
    }

    tistory.blog.info(params, function (err, body) {
      out(body);
      end();
    });

  }


}
else if (command === "post") {
//  var tistory = new Tistory(options);
  var params = {};

  if (subCommand === 'list') {

    if (parsed.page) {
      params = util._extend(params, {page: parsed.page});
    }

    if (parsed.count) {
      params = util._extend(params, {count: parsed.count});
    }

    tistory.post.list(params, function (err, body) {
      out(body);
      end();
    });
  }
  else if (subCommand == 'read') {
    if (parsed.postId) {
      params = util._extend(params, {postId: parsed.postId});
    }

    tistory.post.read(params, function (err, body) {
      out(body);
      end();
    });
  }
  else if ((subCommand == 'write') || (subCommand == 'update')) {
    if (parsed.postId) {
      params = util._extend(params, {postId: parsed.postId});
    }

    if (parsed.title) {
      params = util._extend(params, {title: parsed.title});
    }

    if (parsed.content) {
      params = util._extend(params, {title: parsed.content});
    }

    if (parsed.visibility) {
      params = util._extend(params, {visibility: parsed.visibility});
    }

    if (parsed.category) {
      params = util._extend(params, {category: parsed.category});
    }

    if (parsed.tag) {
      params = util._extend(params, {tag: parsed.tag});
    }

    if (subCommand === 'write') {
      tistory.post.write(params, function (err, body) {
        out(body);
        end();
      });
    } else {
      tistory.post.update(params, function (err, body) {
        out(body);
        end();
      });
    }
  }
  else if (subCommand == "attach") {
    params = util._extend(params, {uploadedfile: parsed.uploadedfile});

    tistory.post.attach(params, function (err, body) {
      out(body);
      end()
    });
  }
}
else if (command === 'category'){
  var params = {};

  if (subCommand === 'list'){
     tistory.category.list(function(err,body){
       out(body);
       end();
     });
  }
  else if (subCommand === 'find'){

    if(parsed.name){
      tistory.category.find(parsed.name, function(err, body){
        out(body);
        end();
      });
    } else {
      logger.error('enter category name with -name!');
    }
  }
}

