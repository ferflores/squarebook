let _config;
let wrapper = null;
let controlsWrapper = null;
let colors = [
  {name:'red', hex:'#FF0000'},
  {name:'green', hex:'#00FF00'},
  {name:'blue', hex:'#0000FF'},
  {name:'yellow', hex:'#FFFF00'},
  {name:'pink', hex:'#FF00FF'},
  {name:'white', hex:'#FFFFFF'}
];

function buildGrid(){
  createWrapper();
  createSquares();
  createControls();
}

function createWrapper(){
  wrapper = document.createElement('div');
  wrapper.className = 'squarebook_wrapper';
  _config.container.appendChild(wrapper);
  return wrapper;
}

function createSquares(){
  let controlsHeight = wrapper.clientHeight / 10;
  let squareWidth = (wrapper.clientWidth / 50) - 2;
  let squareHeight = ((wrapper.clientHeight-controlsHeight) / 30) - 2;

  for (var i = 0; i < 30; i++) {
    var row = document.createElement('div');
    row.className = "squarebook_row";
    wrapper.appendChild(row);

    for (var j = 0; j < 50;j++) {
      var squareDiv = document.createElement('div');
      squareDiv.className = 'squarebook_square';
      squareDiv.style.width = squareWidth + 'px';
      squareDiv.style.height = squareHeight + 'px';
      row.appendChild(squareDiv);
    }
  }
}

function createControls(){
  controlsWrapper = document.createElement('div');
  controlsWrapper.className = 'squarebook_controls';
  controlsWrapper.style.width = wrapper.clientWidth + 'px';
  controlsWrapper.style.height = (wrapper.clientHeight / 10) + 'px';
  wrapper.appendChild(controlsWrapper);
  createColors();
  createButtons();
}

function createColors(){
  for (var i = 0; i < colors.length; i++) {
    let color = document.createElement('div');
    color.className = 'squarebook_color';
    color.style.width = (controlsWrapper.clientWidth / 10) -2 + 'px';
    color.style.height = (controlsWrapper.clientHeight - 2) + 'px';
    color.style.backgroundColor = colors[i].hex;
    controlsWrapper.appendChild(color);
  }
}

function createButtons(){
  let button1 = document.createElement('div');
  button1.className = 'squarebook_button';
  button1.style.width = (controlsWrapper.clientWidth / 10) * 2 - 2+ 'px';
  button1.style.height = (controlsWrapper.clientHeight - 2) + 'px';
  controlsWrapper.appendChild(button1);

  let button1Text = document.createTextNode('<');
  button1.appendChild(button1Text);

  let button2 = document.createElement('div');
  button2.className = 'squarebook_button';
  button2.style.width = (controlsWrapper.clientWidth / 10) * 2 - 2 +'px';
  button2.style.height = (controlsWrapper.clientHeight - 2) + 'px';
  controlsWrapper.appendChild(button2);

  let button2Text = document.createTextNode('>');
  button2.appendChild(button2Text);
}

export default config => {
  _config = config;

  return {
    buildGrid: buildGrid
  }
}
