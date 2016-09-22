import errorMessage from '../errorMessage';
import axios from 'axios';
import def from '../defaultData';

function displayNoItemsData(config){
  config.drawingActions.drawData({name:def.noData.name, points: def.noData.points.slice(0)}, -1, true);
  config.state.currentIndex++;
}

function postData(config, responseHandler){
  let name = document.getElementById('squarebook_nameInput');

  if(!config.state.hasDrawData){
    errorMessage.displayMessage(config.state.elements.wrapper, 'Draw something!');
  }else if(name.value.length<3){
    errorMessage.displayMessage(config.state.elements.wrapper, 'Please input your name!');
  }else{
    config.state.elements.saveButton.removeEventListener('click', config.serverActions.postData);

    var data = {
      name: name.value,
      points:[]
    }

    let squares = config.state.elements.squares;

    for (var i = 0; i < squares.length; i++) {
      let color = squares[i].getAttribute('data-draw');
      if(color){
        data.points.push({
          color:color,
          index:i
        })
      }
    }

    axios.post(config.postDataUrl, data).then(response => {
        responseHandler(config);
    }).catch(error => {
      errorMessage.displayMessage(config.state.elements.wrapper, error);
      config.state.elements.saveButton.addEventListener('click', config.serverActions.postData);
    });
  }
}

function getData(config, index, increment, responseHandler){
  config.drawingActions.clear();
  config.state.elements.nameInput.value = 'loading...';
  config.state.loading = true;
  axios.get(`${config.getDataUrl}/?index=${index}`).then(response => {
    if(response.data){
      responseHandler(config, response.data);
    }else{
      config.state.topIndex = index;
      displayNoItemsData(config);
      config.state.currentIndex -= increment;
    }
    config.state.loading = false;
  }).catch(error => {
    errorMessage.displayMessage(config.state.elements.wrapper, error);
    config.state.loading = false;
    config.state.currentIndex -= increment;
  });
}

export default config => {
  return {
    getData: (index, increment, responseHandler) => { getData(config, index, increment, responseHandler)},
    postData: (responseHandler) => { postData(config, responseHandler)}
  }
}
