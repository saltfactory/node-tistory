/**
 * Created by saltfactory on 7/23/14.
 */

var util = require('util')
exports.printParams = function(params){
  util.print("\n[parameters:]\n");
  util.print(JSON.stringify(params, null, 2));
};
