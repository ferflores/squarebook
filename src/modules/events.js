import drawingActions from './drawingActions';
import serverActions from './serverActions';

function bindEvents(config){
  bindDrawingEvents(config);
  bindServerEvents(config);
}

function bindDrawingEvents(config){
  let actions = drawingActions(config);
  let elements = config.state.elements;
  elements.wrapper.addEventListener('mouseup', actions.stopDraw);
  elements.wrapper.addEventListener('mouseleave', actions.stopDraw);
  elements.wrapper.addEventListener('mousedown', actions.beginDraw);

  for (var i = 0; i < elements.squares.length; i++) {
    elements.squares[i].addEventListener('mousemove', actions.draw);
  }

  for (var i = 0; i < elements.colors.length; i++) {
    elements.colors[i].addEventListener('mousedown', actions.setColor);
  }

  elements.clearButton.addEventListener('click', actions.clear);
}

function bindServerEvents(config){
  let actions = serverActions(config);
  let elements = config.state.elements;
  
  elements.saveButton.addEventListener('click', actions.save);
}

export default config => {
  bindEvents(config);
}
