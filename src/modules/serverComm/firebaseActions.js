import firebase from 'firebase/app';
import db from 'firebase/database';
import def from '../defaultData';
import errorMessage from '../errorMessage';

let app = null;

function initializeFirebase(firebaseConfig){
  app = firebase.initializeApp(firebaseConfig);
}

function displayNoItemsData(config){
  config.drawingActions.drawData(def.noData, -1);
  config.state.currentIndex++;
}

function getData(config, index, increment, responseHandler){
  config.drawingActions.clear();
  config.state.elements.nameInput.value = 'loading...';
  config.state.loading = true;

  var postRef = app.database().ref('/posts');
  postRef.once("value", snapshot =>  {
    var count = snapshot.numChildren();
    var getRef = app.database().ref(`/posts/post${count-(index == 0 ? 1 : index + 1)}`);
    getRef.once('value', snapshot =>  {
      var value = snapshot.val();
      if(!value){
        displayNoItemsData(config);
        config.state.topIndex = index;
        config.state.currentIndex -= increment;
      }else{
        responseHandler(config, value);
      }
      config.state.loading = false;
    }, error => {
      errorMessage.displayMessage(config.state.elements.wrapper, error);
      config.state.loading = false;
      config.state.currentIndex -= increment;
    });
  });
}

function postData(config, responseHandler){

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
          errorMessage.displayMessage(config.state.elements.wrapper, error);
          config.state.elements.saveButton.addEventListener('click', config.serverActions.postData);
        }else{
          responseHandler(config)
        }
      })
    });
  }
}

export default config => {

  initializeFirebase(config.firebaseConfig);

  return {
    getData: (index, increment, responseHandler) => { getData(config, index, increment, responseHandler)},
    postData: (responseHandler) => { postData(config, responseHandler)}
  }
}
