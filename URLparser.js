//브라우저의 주소 표시줄에 URL을 입력하면 브라우저는 URL을 알맞은 형식으로 파싱
const url = new URL('https://github.com/dotsjs/week03?tab=readme-ov-file');

console.log(url.protocol); // https:
console.log(url.pathname); // /dotsjs/week03
console.log(url.origin);   // https://github.com
console.log(url.search);   // ?tab=readme-ov-file
console.log(url.host);     // github.com


//url이 string으로 들어오면 url구조의 형태를 띄는 객체를 반환하는 함수를 작성
function parseURL(url) {
    var regex = /^(([^:]+:)?(\/\/([^\/?#]+))?([^?#]*)(\?([^#]*))?(#(.*))?)/;
    var match = url.match(regex);

    var parsedURL = {
        href: match[0] || '',
        protocol: match[2] || '',
        host: match[4] || '',
        pathname: match[5] || '',
        search: match[6] || '',
        hash: match[8] || ''
      };

    return parsedURL;
}

//예제
var urlString = 'https://github.com/dotsjs/week03?tab=readme-ov-file';
var parseURL = parseURL(urlString);

console.log(parseURL)


//prototype을 이용한 생성자 함수로 작성
function ParsedURL(url) {
    
    var tokens = this.tokenizer(url);
    var lexemes = this.lexer(tokens);
    var parsedURL = this.parser(lexemes);
  
    this.href = parsedURL.href;
    this.protocol = parsedURL.protocol;
    this.host = parsedURL.host;
    this.pathname = parsedURL.pathname;
    this.search = parsedURL.search;
    this.hash = parsedURL.hash;
  }

  //tokenizer
  ParsedURL.prototype.tokenizer = function(url) {
    return url.match(/[^:/]+:|\/{2}|[^\/?#]*|[\?#]|./g);
  };
  
  //lexer
  ParsedURL.prototype.lexer = function(tokens) {
    return tokens;
  };
  
  //parser
  ParsedURL.prototype.parser = function(lexemes) {
    var parsedURL = {
        href: lexemes.join(''),
        protocol: lexemes[0] || '',
        host: lexemes[3] || '',
        pathname: lexemes[4] || '',
        search: lexemes[6] || '',
        hash: lexemes[8] || ''
    };
      return parsedURL;
  };
  
  //예제
  var urlString = "https://github.com/dotsjs/week03?tab=readme-ov-file";
  var parsedURL = new ParsedURL(urlString);
  
  console.log(parsedURL);

