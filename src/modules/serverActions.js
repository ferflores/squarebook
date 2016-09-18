import errorMessage from './errorMessage';

let _config = null;

function save(){
  if(!_config.state.hasDrawData){
    errorMessage.displayMessage(_config.state.elements.wrapper, 'Draw something!')
  }
}

export default config => {
  _config = config;

  return {
    save:save
  }
}
