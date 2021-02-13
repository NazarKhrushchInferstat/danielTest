const textBlock = document.getElementById('textBlock');
let inVal = '';
const input = document.getElementById('inp').addEventListener('input', e => inVal = e.target.value);
const button = document.getElementById('btn');

// creating image
function createImage(source, alter, appendTo, brake) {
  const elem = document.createElement('img');
  elem.src = source;
  elem.alt = alter;
  appendTo.appendChild(elem);
  if (brake) {
    const br = document.createElement('br');
    appendTo.appendChild(br);
  }
}
// creating paragraph
function createParagraph (text, appendTo) {
  const elem = document.createElement('p');
  elem.innerHTML = text;
  appendTo.appendChild(elem);
}

async function asyncFetchData() {
  try {
    const requestBody = `https://api.chucknorris.io/jokes/search?query=${inVal}`;
    const getData = await fetch(requestBody);
    if (getData.ok) {
      return await getData.json();
    }
    console.log(getData)
  } catch(e) {
    console.error(e);
  }
}
const appendData = (block, data) => {
  block.innerHTML = '';
  return data.forEach(({value, icon_url, id}) => {
  createImage(icon_url, id, textBlock, true);
  createParagraph(value, textBlock)
})
}
async function convertDataInUi() {
  const data = await asyncFetchData();
  return appendData(textBlock, data.result);
}

// const fechData = () => {
//   textBlock.innerHTML = '';
//   fetch(`https://api.chucknorris.io/jokes/search?query=${inVal}`)
//   .then(response => response.json())
//   .then(json => { 
//   return json.result.forEach(({value, icon_url, id}) => {
//     createImage(icon_url, id, textBlock, true);
//     createParagraph(value, textBlock)
//     })

//   })
//   .catch(e => console.log(e));
 
// }

button.addEventListener('click', convertDataInUi);
