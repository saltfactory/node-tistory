/**
 * Created by saltfactory on 7/15/14.
 */
var Tistory = require('../lib/tistory'),
  logger = require('./logger'),
  options = require('./example-options')

var tistory = new Tistory(options);
//tistory.category.list(null,
//  function (err, body) {
//    var json = JSON.parse(body);
//    logger.debug(json.tistory.item.categories)
//  }, {targetUrl: 'rubygalaxy'});


tistory.category.findCategoryId('Ruby', function(err, categoryId){
  if(err){
    logger.error(err.message);
  } else {
    logger.info("categoryId: " + categoryId);
  }

});