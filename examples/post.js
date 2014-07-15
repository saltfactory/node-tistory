var Tistory = require('../lib/tistory'),
  logger = require('./logger'),
  options = require('./example-options');

var tistory = new Tistory(options);

var callback = function (err, body) {
  if (err) {
    logger.error(err);
  } else {
    logger.debug(body);
    var json = JSON.parse(body);
    logger.info(json.tistory);
  }
};

//tistory.post.list({
//  page: 1,        //default:1
//  count: 10,      //default:10, max:30
////  categoryId:   //default all categories
//  sort: 'id'      //default:id(글번호) , date(날짜)
//}, callback);
tistory.post.list({page: 1}, callback);

//tistory.post.read({postId: 12}, callback);
//
//tistory.post.write({
//  visibility: 0,              //default: 0(비공개), 1(보호), 2(공개), 3(발행), 생략시 비공개
////  published:                //UNIX_TIMESTAMP() 값을 넣을 경우, 예약발행
//  categoryId: 0,               //default:0 (생략시 분류없음)
//  tag: 'nodejs, node-tistory',
//  title: 'test',
//  content: '본문'
//}, callback);
//
//tistory.post.update({
//  postId: 11,
//  visibility: 0,              //default: 0(비공개), 1(보호), 2(공개), 3(발행), 생략시 비공개
//  categoryId: 0,               //default:0 (생략시 분류없음)
//  tag: 'nodejs, node-tistory',
//  title: 'test',
//  content: '본문 수정'
//}, callback);
//
//tistory.post.attach({uploadedfile: '/Users/saltfactory/Downloads/square.png'}, callback);
//
//tistory.post.delete({postId: 11}, callback);



