//자바스크립트의 실행컨텍스트와 스코프에 대한 html 파일을 string으로 입력받아 HTML 의 DOM tree를 생성하는 함수를 작성

function createDOMFromString(htmlString) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = htmlString;

  var scriptElements = wrapper.querySelectorAll('script');
  
  scriptElements.forEach(function(script) {
    var code = script.textContent || script.innerText;
    eval(code);
  });

  return wrapper;
}

async function readHTMLFile(fileName) {
  try {
    var response = await fetch(fileName);
    var htmlString = await response.text();
    return htmlString;
  } catch (error) {
    console.error('Error reading HTML file:', error);
    return null;
  }
}

readHTMLFile('./JSweek02/스코프.html').then(function(htmlString) {
  if (htmlString) {
    var domTree = createDOMFromString(htmlString);
    console.log(domTree);
  }
});

readHTMLFile('./JSweek02/실행컨텍스트.html').then(function(htmlString) {
  if (htmlString) {
    var domTree = createDOMFromString(htmlString);
    console.log(domTree);
  }
});
