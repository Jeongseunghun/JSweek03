// //자바스크립트의 실행컨텍스트와 스코프에 대한 html 파일을 string으로 입력받아 HTML 의 DOM tree를 생성하는 함수를 작성

const parser = input => {
  input = input.trim();
  const result = { name: 'ROOT', type: 'node', children: [] };
  const stack = [{ tag: result }]; // DOM 객체

  let curr, i = 0, j = input.length;
  while (curr = stack.pop()) {
    while (i < j) {
      const cursor = i; // 헷갈리기 때문에 조회용으로 따로
      if (input[cursor] === '<') {
        const idx = input.indexOf('>', cursor);
        i = idx + 1;
        if (input[cursor + 1] === '/') {
          // 닫는 태그
          curr = curr.back;
        } else {
          if (elementNode(input, cursor, idx, curr, stack))
            break;
        }
      } else i = textNode(input, cursor, curr);
    }
  }
  return result;
};

const textNode = (input, cursor, curr) => {
  const idx = input.indexOf('<', cursor);
  curr.tag.children.push({
    type: 'text',
    text: input.substring(cursor, idx),
  });
  return idx;
};

const elementNode = (input, cursor, idx, curr, stack) => {
  const isClose = input[idx - 1] === '/';
  const tag = { name: input.substring(cursor + 1, idx - (isClose ? 1 : 0)), type: 'node', children: [] };
  curr.tag.children.push(tag);
  if (!isClose) {
    stack.push({ tag, back: curr });
    curr = stack[stack.length - 1];
    return true;
  }
  return false;
};

const htmlString = '<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>HTML Parser Example</title></head><body><div><p>스코프와 실행컨텍스트</p></div></body></html>';
const domTree = parser(htmlString);

console.log(JSON.stringify(domTree, null, 2));
