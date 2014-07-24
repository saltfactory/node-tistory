node-tistory
============

***node-tistory***는 [Tistory](http://tistory.com)의 오픈 API를 사용하기 위한 Node.js 모듈이다.


Install global module
======================
***node-tistory***는 global로 설치하기 위해서 다음과 같이 `npm install -g`로 설치할 수 있다.

```
npm install -g node-tistory
```

글로벌 설치한 후 `tistory` 명령어를 사용할 수 있다.
```
tistory -help
```

Install local module
====================

```
npm install node-tistory
```
local module로 설치할 경우 다음과 같이 사용할 수 있다.
```javascript
var Tistory = require('node-tistory');
```

Global configuration file
=========================
***node-tistory***는 `$HOME/.tistory.json` 파일을 글로벌 설정 파일로 읽어들인다.
***node-tistory***를 사용할 때 필요한 옵션정보를 `.tistory.json`에 미리 저장해두면 항상 이 설정 파일을 먼저 읽어서 옵션정보로 설정한다.


```bash
echo '{
    "targetUrl": "Tistory URL",
    "access_token": "Tistory API access_token",
    "output": "json"
}' > ~/.tistory.json
```

Tistory API
============
Tistory에서 제공하고 있는 [오픈 API 가이드](http://www.tistory.com/guide/api/oauth) 를 참고하면 된다.

node-tistory API interface
==========================
***node-tistory*** 에서는 Tistory의 오픈 API를 간단하게 바로 사용할 수 있도록 메소드 형태의 interface를 제공하고 있다.


| 모듈 | 인터페이스 | Tistory API | 설명 |
|-----|-------|---------------|---|
|blog|info|/apis/blog/info|블로그 정보|
|post|list|/apis/post/list|글 목록|
||read|/apis/post/read|글 보기|
||write|/apis/post/write|글 쓰기|
||modify|/apis/post/modify|글 수정|
||attach|/apis/post/attach|파일첨부|
|category|list|/apis/category/list|분류 목록|
||find||분류 검색|

모든 interface 메소드는 params, callback을 인자값으로 사용한다. params는 Object 형태이고 callback은 `err`,`body`,`res` 값을 받는 함수 형태이다.
params의 `key`는 Tistory 오픈 API의 ***Request Parameter***의 이름과 동일하다.

e.g. 티스토리 블로그 http://blog.saltfactory.net 정보 보기

```javascript
var params = {
  targetUrl:'blog.satlfactory.net'
};

var callback = function(err, body, res){
  console.log(body);
};

tistory.blog.info(params, callback);
```

e.g. http://blog.saltfactory.net의 글 목록보기
```javascript
var params = {
  page: 1,
  count: 10
};

tistory.post.list(params, function(err, body, res){
  console.log(body);
});

```

node-tistory interface parameters
=================================
***node-tistory***의 인터페이스의 파라미터는 Object 형태로 지정한다.
```javascript
var params = {
  'targetUrl':'blog.saltfactory.net'
};
```

### tistory.blog.info (params, callback)

|params|값|설명|필요|
|--|--|--|--|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| http://saltfactory.tistory.com 과 같이 1차 도메인 경우 ***saltfactory***, http://blog.saltfactory.net 과 같이 2차 도메인일 경우 ***blog.saltfactory.net*** |필수|
|output|'json','xml'| 기본값 'json'|옵션|
|없음|없음|파라미터 없이 콜백함수만 사용 가능 |없음|

### tistory.post.list (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|output|'json','xml'| 기본값 'json'|옵션|
|page|Number| 해당 페이지 글 목록, 기본값 1 |옵션|
|count|1~30| 페이지당 글 갯수, 기본값 10 |옵션|
|categoryId|Number|분류에 해당하는 글 목록, 기본값 전체|옵션|
|sort|'id' or 'date'| 'id'는 글번호, 'date'는 작성날짜, 기본값 `id`|옵션|

### tistory.post.read (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|postId|Number| 글 번호 |필수|
|output|'json','xml'| 기본값 'json'|옵션|


### tistory.post.write (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|title|String| 글 제목 |필수|
|content | String | 글 내용|옵션|
|visibility| 0,1,2,3|0:비공개, 1:보호, 2:공개, 3:발행, 생략시 0|옵션|
|published|String|UNIX_TIMESTAMP() 예약발송|옵션|
|tag|String|,를 사용하여 여러개 태그 문자열|옵션|
|output|'json','xml'| 기본값 'json'|옵션|

### tistory.post.modify (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|postId|Number | 수정할 글 번호 | 필수 |
|title|String| 글 제목 |필수|
|content | String | 글 내용|옵션|
|visibility| 0,1,2,3|0:비공개, 1:보호, 2:공개, 3:발행, 생략시 0|옵션|
|published|String|UNIX_TIMESTAMP() 예약발송|옵션|
|tag|String|,를 사용하여 여러개 태그 문자열|옵션|
|output|'json','xml'| 기본값 'json'|옵션|

### tistory.post.attach (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|uploadedfile|String| 파일경로 |필수|
|output|'json','xml'| 기본값 'json'|옵션|

### tistory.category.list (params, callback)

|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|output|'json','xml'| 기본값 'json'|옵션|


### tistory.category.find (params, callback)
|params|값|설명|필요|
|--|--|---|---|
|access_token|String| OAuth 2.0 인증 후 획득한 access_token|필수|
|targetUrl|String| 블로그 URL |필수|
|name|String| 분류명 |필수|
|output|'json','xml'| 기본값 'json'|옵션|

> Tistory의 모든 API는 access_token, targetUrl 그리고 output 파라미터를 사용하기 때문에
> ***node-tistory***의 global configuration file인 `$HOME/.tistory.json`에 다음과 같이 저장해두면 파라미터로 설정하지 않아도 된다.

```javascript
{
  "targetUrl": "blog.saltfactory.net",
  "access_token": "access_token",
  "output": "json"
}

```
```javascript
var params = {
  page:1,
  count:10
};

tistory.post.list(params, function(err,body){
  console.log(body);
});
```

tistory command
================
***node-tistory***를 `npm install -g`로 설치를 하면 `tistory` 명령어를 사용할 수 있다.
만약 `$HOME/.tistory.json` 파일에 설정이 저장된 상태라고 생각하면 명령어 사용은 다음과 같다.

|명령어 옵션 | 설명 |
|---------|-----|
| -help, --h| 도움말 |
| -pretty | indent 추가해서 JSON 프린트|

| 파라미터 옵션 | 설명 |
|---------|-----|
| -파라미터명 |파라미터의 이름 앞에 -를 붙이고 뒤에 값을 지정|



### tistory.blog.info

```
tistory blog info -pretty
```

### tistory.post.list

```
tistory post list -page 1 -count 10 -output json
```

### tistory.post.read
```
tistory post read 105 --pretty
```

### tistory.post.write
```
tistory post write -title 안녕하세요 -content 테스트입니다. -tag 태그1,태그2
```

### tistory.post.modify
```
tistory post write -postId 105 -title 안녕하세요 -content 테스트입니다. -tag 태그1,태그2
```

### tistory.post.attach
```
tistory post attach -file /Users/saltfactory/Documents/test.png
```

### tistory.category.list
```
tistory category list --pretty
```

### tistory.category.find
```
tistory category find Node.js --pretty
```

Copyright and License
=====================
The MIT License (MIT)

Copyright (c) 2014 SungKwang Song

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
