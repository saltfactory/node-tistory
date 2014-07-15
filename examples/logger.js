/**
 * Created by saltfactory on 7/15/14.
 */
var tracer = require('tracer')
  .colorConsole(
  {
    format: [
      "{{timestamp}} (in {{file}}:{{line}}) <{{title}}> {{message}} ", //default format
      {
        error: "{{timestamp}} (in {{file}}:{{line}}) <{{title}}> {{message}} \nCall Stack:\n{{stack}}" // error format
      }
    ],
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
      data.title = data.title.toUpperCase();
    }
  });

module.exports = tracer;