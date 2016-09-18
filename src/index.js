import styles from './modules/styles';
import ui from './modules/ui';

let _config = {
  state: {
    elements: {
      container: null,
      wrapper: null,
      squares:[],
      controlsWrapper: null,
      colors: [],
      nextButton: null,
      prevButton: null,
      clearButton:null,
      saveButton:null,
      nameInput:null
    }
  },
  backgroundColor: '#0e1122'
}

function render(){
 styles(_config);
 ui(_config).build();
}

function squarebook(config){
  if(config){
    _config = Object.assign(_config, config);
  }
  render();
}

window.squarebook = squarebook;
