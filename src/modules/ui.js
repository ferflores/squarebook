import storage from 'key-storage';

let _config = null;
let elements = null;
let wrapper = null;
let controlsWrapper = null;
let adjusting = false;

let colors = [
  {name:'red', hex:'#FF0000'},
  {name:'green', hex:'#00FF00'},
  {name:'blue', hex:'#0000FF'},
  {name:'yellow', hex:'#FFFF00'},
  {name:'pink', hex:'#FF00FF'},
  {name:'white', hex:'#FFFFFF'}
];

function build(){
  createWrapper();
  createSquares();
  createControls();
  bindEvents();
}

function createWrapper(){
  wrapper = document.createElement('div');
  wrapper.className = 'squarebook_wrapper';
  _config.container.appendChild(wrapper);
  elements.container = _config.container;
  elements.wrapper = wrapper;

  return wrapper;
}

function createSquares(){

  for (var i = 0; i < 20; i++) {
    var row = document.createElement('div');
    row.className = "squarebook_row";
    wrapper.appendChild(row);
    elements.squareRows.push(row);

    for (var j = 0; j < 30;j++) {
      var squareDiv = document.createElement('div');
      squareDiv.className = 'squarebook_square';
      row.appendChild(squareDiv);
      elements.squares.push(squareDiv);
    }
  }
}

function createControls(){
  controlsWrapper = document.createElement('div');
  controlsWrapper.className = 'squarebook_controls';
  wrapper.appendChild(controlsWrapper);
  elements.controlsWrapper = controlsWrapper;
  createNavButtons();
  createColors();
  createInputs();
  adjustUI();
}

function createColors(){
  for (var i = 0; i < colors.length; i++) {
    let color = document.createElement('div');
    color.className = 'squarebook_color';
    color.style.backgroundColor = colors[i].hex;
    color.style.display = 'none';
    controlsWrapper.appendChild(color);
    elements.colors.push(color);
  }
}

function createNavButtons(){
  let nextButton = document.createElement('div');
  nextButton.className = 'squarebook_navButton';
  controlsWrapper.appendChild(nextButton);
  elements.nextButton = nextButton;

  let nextButtonText = document.createTextNode('>');
  nextButton.appendChild(nextButtonText);

  let prevButton = document.createElement('div');
  prevButton.className = 'squarebook_navButton';
  controlsWrapper.appendChild(prevButton);
  elements.prevButton = prevButton;

  let prevButtonText = document.createTextNode('<');
  prevButton.appendChild(prevButtonText);
}

function createInputs(){
  var nameInput = document.createElement("input");
  nameInput.className = 'squarebook_nameInput';
  nameInput.id = 'squarebook_nameInput'
  nameInput.type = "text";
  nameInput.placeholder = 'Your name';
  nameInput.setAttribute('maxlength', 15);
  nameInput.setAttribute('readonly','readonly');
  controlsWrapper.appendChild(nameInput);
  elements.nameInput = nameInput;

  let signButton = document.createElement('div');
  signButton.className = 'squarebook_navButton';
  signButton.style.float = 'left';
  signButton.style.display = storage.get('sign') || isMoble() ? 'none' : 'inline'; //mobile touch events not supported yet
  controlsWrapper.appendChild(signButton);
  elements.signButton = signButton;

  let signButtonText = document.createTextNode('start drawing');
  signButton.appendChild(signButtonText);

  let cancelButton = document.createElement('div');
  cancelButton.className = 'squarebook_navButton';
  cancelButton.style.float = 'right';
  cancelButton.style.display = 'none';
  controlsWrapper.appendChild(cancelButton);
  elements.cancelButton = cancelButton;

  let cancelButtonText = document.createTextNode('cancel');
  cancelButton.appendChild(cancelButtonText);

  let clearButton = document.createElement('div');
  clearButton.style.display = 'none';
  clearButton.className = 'squarebook_navButton';
  controlsWrapper.appendChild(clearButton);
  elements.clearButton = clearButton;

  let clearButtonText = document.createTextNode('clear');
  clearButton.appendChild(clearButtonText);

  let saveButton = document.createElement('div');
  saveButton.style.display = 'none';
  saveButton.className = 'squarebook_navButton';
  controlsWrapper.appendChild(saveButton);
  elements.saveButton = saveButton;

  let saveButtonText = document.createTextNode('save');
  saveButton.appendChild(saveButtonText);
}

function adjustUI(){

  if(adjusting){
    return;
  }

  adjusting = true;

  setTimeout(()=>{adjusting=false},2000);

  let controlsHeight = wrapper.clientHeight / 10;
  let squareWidth = (wrapper.clientWidth / 30) - 2;
  let squareHeight = ((wrapper.clientHeight-controlsHeight) / 20) - 2;

  for (var i = 0; i < elements.squares.length; i++) {
    elements.squares[i].style.width = squareWidth + 'px';
    elements.squares[i].style.height = squareHeight + 'px';
  }

  elements.controlsWrapper.style.width = wrapper.clientWidth + 'px';
  elements.controlsWrapper.style.height = (wrapper.clientHeight / 10) + 'px';

  for (var i = 0; i < elements.colors.length; i++) {
    elements.colors[i].style.width = (controlsWrapper.clientWidth / 20) -2 + 'px';
    elements.colors[i].style.height = (controlsWrapper.clientHeight - 2) + 'px';
  }

  elements.nextButton.style.width = (controlsWrapper.clientWidth / 20) *3 - 2+ 'px';
  elements.nextButton.style.height = (controlsWrapper.clientHeight) + 'px';
  elements.nextButton.style.fontSize = controlsWrapper.clientHeight + 'px';

  elements.prevButton.style.width = (controlsWrapper.clientWidth / 20) * 3 - 2 +'px';
  elements.prevButton.style.height = (controlsWrapper.clientHeight) + 'px';
  elements.prevButton.style.fontSize = controlsWrapper.clientHeight + 'px';

  elements.signButton.style.width = (controlsWrapper.clientWidth / 20) * 4 - 2 +'px';
  elements.signButton.style.height = (controlsWrapper.clientHeight) /2 + 'px';
  elements.signButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
  elements.signButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

  elements.cancelButton.style.width = (controlsWrapper.clientWidth / 20) * 4 - 2 +'px';
  elements.cancelButton.style.height = (controlsWrapper.clientHeight) /2 + 'px';
  elements.cancelButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
  elements.cancelButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

  elements.nameInput.style.width = (controlsWrapper.clientWidth / 20) * 5 - 2 +'px';
  elements.nameInput.style.height = (controlsWrapper.clientHeight - 6) +'px';
  elements.nameInput.style.fontSize = controlsWrapper.clientHeight / 3 + 'px';

  elements.clearButton.style.width = (controlsWrapper.clientWidth / 20) * 2 - 2 +'px';
  elements.clearButton.style.height = (controlsWrapper.clientHeight) / 2 + 'px';
  elements.clearButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
  elements.clearButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

  elements.saveButton.style.width = (controlsWrapper.clientWidth / 20) * 2 - 2 +'px';
  elements.saveButton.style.height = (controlsWrapper.clientHeight) / 2 + 'px';
  elements.saveButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
  elements.saveButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';
}

function bindEvents(){
  window.addEventListener('resize', ()=>{setTimeout(adjustUI,1000)});
}

function isMoble(){
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export default config => {
  _config = config;
  elements = config.state.elements;
  return {
    build: build
  }
}
