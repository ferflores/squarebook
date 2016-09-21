import firebase from 'firebase/app';
import db from 'firebase/database';
import def from './defaultData';

let app = null;

function displayNoItemsData(config){
  config.drawingActions.drawData(def.noData, -1);
  config.state.currentIndex++;
  config.state.drawingIndex++;
}

function initializeFirebase(firebaseConfig){
  app = firebase.initializeApp(firebaseConfig);
}

function getNextData(config){
  if(config.state.loading || (config.state.topIndex && config.state.currentIndex + 1 >= config.state.topIndex)){
    return;
  }

  getRequest(config, config.state.currentIndex, 1);
}

function getPrevData(config){
  if(config.state.loading || config.state.currentIndex - 1 < 0){
    return;
  }
  getRequest(config, config.state.currentIndex, -1);
}

function getRequest(config, index, increment){
  config.drawingActions.clear();
  config.state.elements.nameInput.value = 'loading...';
  config.state.loading = true;

  var postRef = app.database().ref('/posts');
  postRef.once("value", snapshot =>  {
    var count = snapshot.numChildren();
    var getRef = app.database().ref(`/posts/post${count-(index == 0 ? 1 : index+increment)}`);
    getRef.once('value', snapshot =>  {
      var value = snapshot.val();
      if(!value){
        displayNoItemsData(config);
        config.state.topIndex = index;
      }else{
        handleGetResponse(config, snapshot.val(), increment);
      }
      config.state.loading = false;
    }, error => {
      errorMessage.displayMessage(_config.state.elements.wrapper, error);
      config.state.loading = false;
    });
  });
}

function handleGetResponse(config, data, increment){
  config.state.drawingIndex = config.state.currentIndex;
  config.state.currentPoints = data.points.slice(0);
  config.state.currentName = data.name;
  config.drawingActions.drawData(data, config.state.drawingIndex);
  config.state.currentIndex += increment;
}

function handlePostResponse(config){
  errorMessage.displayMessage(config.state.elements.wrapper, 'Your draw has been saved, thanks!');
  config.drawingActions.drawDone();
  getRequest(config, 0, 1);
  storage.set('signed','true');
}

function postData(config){

  let name = document.getElementById('squarebook_nameInput');

  if(!config.state.hasDrawData){
    errorMessage.displayMessage(config.state.elements.wrapper, 'Draw something!');
  }else if(name.value.length<3){
    errorMessage.displayMessage(config.state.elements.wrapper, 'Please input your name!');
  }else{
    config.state.elements.saveButton.removeEventListener('click', config.serverActions.postData);

    var postRef = app.database().ref('/posts');
    postRef.once("value", snapshot =>  {
      var data = {
        name: name.value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,""),
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

      var nextIndex = snapshot.numChildren();
      app.database().ref(`/posts/post${nextIndex}`).set(data, error => {
        if(error){
          errorMessage.displayMessage(_config.state.elements.wrapper, error);
          config.state.elements.saveButton.addEventListener('click', config.serverActions.postData);
        }else{
          handlePostResponse();
        }
      })
    });
  }
}

export default config => {

  initializeFirebase(config.firebaseConfig);

  return {
    postData: () => { postData(config) },
    getNextData: () => { getNextData(config) },
    getPrevData: () => { getPrevData(config) }
  }
}
