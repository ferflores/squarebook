let _config = null;

function beginDraw(event){
  _config.state.drawing = true;
}

function stopDraw(event){
  _config.state.drawing = false;
}

function draw(event){
  event.preventDefault();
  if(_config.state.drawing){
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
  _config.state.elements.nameInput.value = data.name;
  drawPoints(data.points, currentIndex);
}

function drawPoints(points, currentIndex){
  if(points.length < 1 || currentIndex != _config.state.drawingIndex){
    _config.state.drawingServerData = false;
    return;
  }
  _config.state.drawingServerData = true;
  var rand = Math.floor(Math.random() * points.length);
  _config.state.elements.squares[points[rand].index].style.backgroundColor = points[rand].color;

  setTimeout(() => {
    points.splice(rand,1);
    drawPoints(points, currentIndex);
  }, 100);
}

export default config => {
  _config = config;
  return {
      beginDraw:beginDraw,
      stopDraw:stopDraw,
      draw:draw,
      setColor: setColor,
      clear: clear,
      drawData:drawData
  }

}
