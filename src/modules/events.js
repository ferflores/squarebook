function bindEvents(config){
  bindDrawingEvents(config);
  bindServerEvents(config);
}

function bindDrawingEvents(config){
  let elements = config.state.elements;
  elements.wrapper.addEventListener('mouseup', config.drawingActions.stopDraw);
  elements.wrapper.addEventListener('mouseleave', config.drawingActions.stopDraw);
  elements.wrapper.addEventListener('mousedown', config.drawingActions.beginDraw);
  elements.signButton.addEventListener('click', config.drawingActions.prepareToDraw);
  elements.cancelButton.addEventListener('click', config.drawingActions.cancelDraw);

  for (var i = 0; i < elements.squares.length; i++) {
    elements.squares[i].addEventListener('mousemove', config.drawingActions.draw);
  }

  for (var i = 0; i < elements.colors.length; i++) {
    elements.colors[i].addEventListener('mousedown', config.drawingActions.setColor);
  }

  elements.clearButton.addEventListener('click', config.drawingActions.clear);
}

function bindServerEvents(config){
  let elements = config.state.elements;

  elements.saveButton.addEventListener('click', config.serverActions.postData);
  elements.nextButton.addEventListener('click', config.serverActions.getNextData);
  elements.prevButton.addEventListener('click', config.serverActions.getPrevData);
}

export default config => {
  bindEvents(config);
}
