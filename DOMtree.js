// //자바스크립트의 실행컨텍스트와 스코프에 대한 html 파일을 string으로 입력받아 HTML 의 DOM tree를 생성하는 함수를 작성

function parseHTMLString(htmlString) {
  const domTree = {
    tagName: 'document',
    children: [],
  };

  let currentNode = domTree;

  const tagRegex = /<\s*([a-zA-Z0-9-]+)[^>]*>/g;
  let matches;
  while ((matches = tagRegex.exec(htmlString)) !== null) {
    // matches[1]: 태그 이름
    const tagName = matches[1].toLowerCase();

    const newNode = {
      tagName,
      children: [],
    };

    currentNode.children.push(newNode);

    // 새로운 노드가 자식을 가질 수 있는 경우, 현재 노드를 갱신
    if (!isVoidElement(tagName)) {
      currentNode = newNode;
    }
  }

  return domTree;
}

function isVoidElement(tagName) {
  const voidElements = ['br', 'img', 'hr', 'input', 'meta'];
  return voidElements.includes(tagName);
}

const htmltoString = '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>HTML Parser Example</title></head><body><div><p>스코프와 실행컨텍스트</p></div></body></html>';
const domTree = parseHTMLString(htmltoString);

console.log(JSON.stringify(domTree, null, 2));