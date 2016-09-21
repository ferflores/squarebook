import errorMessage from './errorMessage';
import axios from 'axios';
import storage from 'key-storage';

let _config = null;

function displayNoItemsData(config){
  config.drawingActions.drawData(def.noData, -1);
}

function postData(){
  let name = document.getElementById('squarebook_nameInput');

  if(!_config.state.hasDrawData){
    errorMessage.displayMessage(_config.state.elements.wrapper, 'Draw something!');
  }else if(name.value.length<3){
    errorMessage.displayMessage(_config.state.elements.wrapper, 'Please input your name!');
  }else{
    _config.state.elements.saveButton.removeEventListener('click', config.serverActions.postData);

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
      errorMessage.displayMessage(_config.state.elements.wrapper, error);
      _config.state.elements.saveButton.addEventListener('click', _config.serverActions.postData);
    });
  }
}

function handlePostResponse(){
  errorMessage.displayMessage(_config.state.elements.wrapper, 'Your draw has been saved, thanks!');
  _config.drawingActions.drawDone();
  getRequest(0, 1);
  storage.set('signed','true');
}

function handleGetResponse(data, increment){
  _config.state.drawingIndex = _config.state.currentIndex;
  _config.state.currentPoints = data.points.slice(0);
  _config.state.currentName = data.name;
  _config.drawingActions.drawData(data, _config.state.drawingIndex);
  _config.state.currentIndex += increment;
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
  _config.state.elements.nameInput.value = 'loading...';
  _config.state.loading = true;
  axios.get(`${_config.getDataUrl}/?index=${index}`).then(response => {
    if(response.data){
      handleGetResponse(response.data, increment);
    }else{
      _config.state.topIndex = index;
      displayNoItemsData(_config);
    }
    _config.state.loading = false;
  }).catch(error => {
    errorMessage.displayMessage(_config.state.elements.wrapper, error);
    _config.state.loading = false;
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
