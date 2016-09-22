import errorMessage from './errorMessage';
import httpActions from './serverComm/httpActions';
import firebaseActions from './serverComm/firebaseActions';

let serverActions = null;

function getNextData(config){
  if(config.state.loading){
    return;
  }

  if(!config.state.topIndex || config.state.currentIndex < config.state.topIndex){
    config.state.currentIndex++;
    serverActions.getData(config.state.currentIndex, 1, handleGetResponse);
  }
}

function getPrevData(config){
  if(config.state.loading){
    return;
  }

  if(config.state.currentIndex > 0){
    config.state.currentIndex--;
    serverActions.getData(config.state.currentIndex, -1, handleGetResponse);
  }
}

function handleGetResponse(config, data){
  config.state.ndex = config.state.currentIndex;
  config.state.currentPoints = data.points.slice(0);
  config.state.currentName = data.name;
  config.drawingActions.drawData(data, config.state.currentIndex);
}

function handlePostResponse(config){
  errorMessage.displayMessage(config.state.elements.wrapper, 'Your draw has been saved, thanks!');
  config.drawingActions.drawDone();
  getRequest(config, 0, 1);
  storage.set('signed','true');
}

export default config => {

  serverActions = config.firebaseConfig ? firebaseActions(config) : httpActions(config);

  return {
    postData: () => { serverActions.postData(handlePostResponse) },
    getNextData: () => { getNextData(config) },
    getPrevData: () => { getPrevData(config) }
  }
}
