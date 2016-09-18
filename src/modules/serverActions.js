import errorMessage from './errorMessage';
import axios from 'axios';

let dActions = null;
let _config = null;

function postData(){
  let name = document.getElementById('squarebook_nameInput');

  if(!_config.state.hasDrawData){
    errorMessage.displayMessage(_config.state.elements.wrapper, 'Draw something!');
  }else if(name.value.length<3){
    errorMessage.displayMessage(_config.state.elements.wrapper, 'Please input your name!');
  }else{
    var data = {
      name: name.value,
      points:[]
    }

    let squares = _config.state.elements.squares;

    for (var i = 0; i < squares.length; i++) {
      let color = squares[i].getAttribute('data-draw');
      if(color){
        data.points.push({
          color:color,
          index:i
        })
      }
    }

    axios.post(_config.postDataUrl, data).then(response => {
        handlePostResponse();
    }).catch(error => {
      errorMessage.displayMessage(_config.state.elements.wrapper, error)
    });
  }
}

function handlePostResponse(){
  errorMessage.displayMessage(_config.state.elements.wrapper, 'Your draw has been saved, thanks!');
}

function handleGetResponse(data){
  _config.drawingActions.drawData(data, _config.state.drawingIndex);
}

function getPrevData(){
  if(_config.state.loading || _config.state.currentIndex - 1 < 0){
    return;
  }

  getRequest(_config.state.currentIndex - 1, -1);
}

function getNextData(){
  if(_config.state.loading || (_config.state.topIndex && _config.state.currentIndex + 1 >= _config.state.topIndex)){
    return;
  }

  getRequest(_config.state.currentIndex + 1, 1);
}

function getRequest(index, increment){
  _config.drawingActions.clear();
  _config.state.loading = true;
  axios.get(`${_config.getDataUrl}/?index=${index}`).then(response => {
    if(!response.data.lastItem){
      _config.state.drawingIndex = _config.state.currentIndex;
      handleGetResponse(response.data);
      _config.state.currentIndex += increment;
    }else{
      _config.state.topIndex = index;
      errorMessage.displayMessage(_config.state.elements.wrapper, 'There are no more items!');
    }
    _config.state.loading = false;
  }).catch(error => {
    errorMessage.displayMessage(_config.state.elements.wrapper, error);
    _config.state.loading = true;
  });
}

export default config => {
  _config = config;

  return {
    postData:postData,
    getNextData:getNextData,
    getPrevData:getPrevData
  }
}
