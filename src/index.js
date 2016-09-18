import loadStyles from './modules/styles';
import ui from './modules/ui';
import bindEvents from './modules/events';

let _config = {
  state: {
    currentColor: '#FF0000',
    drawing:false,
    hasDrawData: false,
    elements: {
      container: null,
      wrapper: null,
      squares:[],
      squareRows:[],
      colors: [],
      controlsWrapper: null,
      nextButton: null,
      prevButton: null,
      clearButton:null,
      saveButton:null,
      nameInput:null
    }
  },
  backgroundColor: '#0e1122',
  squareColor:'#282754',
  postDataUrl: null,
  getDataUrl: null
}

function render(){
 loadStyles(_config);
 ui(_config).build();
 bindEvents(_config);
}

function squarebook(config){
  if(config){
    if(!config.postDataUrl || !config.getDataUrl || !config.container){
      throw new Error('squarebook: container, postDataUrl and getDataUrl are required in configuration');
    }else{
      _config = Object.assign(_config, config);
      render();
    }
  }else{
    throw new Error('squarebook: missing configuration object');
  }
}

window.squarebook = squarebook;
