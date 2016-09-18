let _config = null;

function beginDraw(event){
  event.preventDefault();
  _config.state.drawing = true;
}

function stopDraw(event){
  _config.state.drawing = false;
}

function draw(event){
  event.preventDefault();
  if(_config.state.drawing){
    event.target.style.backgroundColor = _config.state.currentColor;
  }
}

function setColor(event){
  _config.state.currentColor = event.target.style.backgroundColor;
}

function clear(){
  for (var i = 0; i < _config.state.elements.squares.length; i++) {
    _config.state.elements.squares[i].style.backgroundColor = _config.squareColor;
  }
}

export default config => {
  _config = config;
  return {
      beginDraw:beginDraw,
      stopDraw:stopDraw,
      draw:draw,
      setColor: setColor,
      clear: clear
  }

}
