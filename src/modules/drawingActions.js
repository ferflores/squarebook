let _config = null;

function beginDraw(event){
  _config.state.drawing = true;
}

function stopDraw(event){
  _config.state.drawing = false;
}

function prepareToDraw(){
  _config.state.drawMode = true;
  clear();
  _config.state.elements.clearButton.style.display = 'inline';
  _config.state.elements.saveButton.style.display = 'inline';
  _config.state.elements.signButton.style.display = 'none';
  _config.state.elements.nextButton.style.display = 'none';
  _config.state.elements.prevButton.style.display = 'none';
  _config.state.elements.cancelButton.style.display = 'inline';
  _config.state.elements.nameInput.removeAttribute('readonly');
  _config.state.elements.nameInput.value = '';
  _config.state.currentIndex = 0;
  _config.state.drawingIndex = 0;
  let colors = _config.state.elements.colors;
  for (var i = 0; i < colors.length; i++) {
    colors[i].style.display = 'inline';
  }
}

function cancelDraw(){
  _config.state.drawMode = false;
  clear();
  _config.state.elements.clearButton.style.display = 'none';
  _config.state.elements.saveButton.style.display = 'none';
  _config.state.elements.signButton.style.display = 'inline';
  _config.state.elements.nextButton.style.display = 'inline';
  _config.state.elements.prevButton.style.display = 'inline';
  _config.state.elements.cancelButton.style.display = 'none';
  _config.state.elements.nameInput.value = `draw by: ${_config.state.currentName}`;
  _config.state.elements.nameInput.setAttribute('readonly', 'readonly');
  _config.state.currentIndex = 0;
  _config.state.drawingIndex = 0;
  let colors = _config.state.elements.colors;
  for (var i = 0; i < colors.length; i++) {
    colors[i].style.display = 'none';
  }

  drawPoints(_config.state.currentPoints, _config.state.currentIndex);
}

function drawDone(){
  _config.state.drawMode = false;
  _config.state.elements.clearButton.style.display = 'none';
  _config.state.elements.saveButton.style.display = 'none';
  _config.state.elements.nextButton.style.display = 'inline';
  _config.state.elements.prevButton.style.display = 'inline';
  _config.state.elements.cancelButton.style.display = 'none';
  _config.state.drawingIndex = 0;
  _config.state.currentIndex = -1;
  let colors = _config.state.elements.colors;
  for (var i = 0; i < colors.length; i++) {
    colors[i].style.display = 'none';
  }
}

function draw(event){
  event.preventDefault();
  if(_config.state.drawing && _config.state.drawMode){
    _config.state.hasDrawData = true;
    event.target.style.backgroundColor = _config.state.currentColor;
    event.target.setAttribute('data-draw',_config.state.currentColor);
  }
}

function setColor(event){
  _config.state.currentColor = event.target.style.backgroundColor;
}

function clear(){
  for (var i = 0; i < _config.state.elements.squares.length; i++) {
    _config.state.elements.squares[i].style.backgroundColor = _config.squareColor;
    _config.state.elements.squares[i].removeAttribute('data-draw');
  }
  _config.state.hasDrawData = false;
}

function drawData(data, currentIndex){
  _config.state.elements.nameInput.value = `draw by: ${data.name}`;
  drawPoints(data.points, currentIndex);
}

function drawPoints(points, currentIndex){
  if(points.length < 1 || currentIndex != _config.state.drawingIndex || _config.state.drawMode){
    _config.state.drawingServerData = false;
    return;
  }
  _config.state.drawingServerData = true;
  var rand = Math.floor(Math.random() * points.length);
  _config.state.elements.squares[points[rand].index].style.backgroundColor = points[rand].color;

  setTimeout(() => {
    points.splice(rand,1);
    drawPoints(points, currentIndex);
  }, 50);
}

export default config => {
  _config = config;
  return {
      beginDraw:beginDraw,
      stopDraw:stopDraw,
      draw:draw,
      setColor: setColor,
      clear: clear,
      drawData:drawData,
      prepareToDraw:prepareToDraw,
      cancelDraw:cancelDraw,
      drawDone:drawDone
  }

}
