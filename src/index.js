import loadStyles from './modules/styles';
import ui from './modules/ui';
import bindEvents from './modules/events';
import serverActions from './modules/serverActions';
import drawingActions from './modules/drawingActions';

let _config = {
  state: {
    currentColor: '#FF0000',
    currentIndex: -1,
    currentName: '',
    currentPoints: [],
    drawingServerData: false,
    loading: false,
    drawing:false,
    drawMode: false,
    hasDrawData: false,
    topIndex: null,
    elements: {
      container: null,
      wrapper: null,
      squares:[],
      squareRows:[],
      colors: [],
      controlsWrapper: null,
      nextButton: null,
      prevButton: null,
      signButton: null,
      cancelButton: null,
      clearButton:null,
      saveButton:null,
      nameInput:null
    }
  },
  backgroundColor: '#0e1122',
  squareColor:'#282754',
  postDataUrl: null,
  getDataUrl: null,
  serverActions:null,
  drawingActions:null,
  firebaseConfig:null
};

function render(){
 loadStyles(_config);
 ui(_config).build();
 bindEvents(_config);
}

function squarebook(config){
  if(config){
    if(!config.container || !config.firebaseConfig && (!config.postDataUrl || !config.getDataUrl) ){
      throw new
        Error(`squarebook: container, postDataUrl and getDataUrl or firebaseConfig
          are required in configuration, read README.MD file`);
    }else{
      _config = Object.assign(_config, config);
      _config.serverActions = serverActions(_config);
      _config.drawingActions = drawingActions(_config);
      render();
      _config.serverActions.getNextData();
    }
  }else{
    throw new Error('squarebook: missing configuration object');
  }
}

export default squarebook;
