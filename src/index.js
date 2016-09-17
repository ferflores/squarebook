import styles from './modules/styles';
import grid from './modules/grid';

let _config = {
  backgroundColor: '#0e1122'
}

function render(){
 styles(_config);
 grid(_config).buildGrid();
}

function squarebook(config){
  if(config){
    _config = config
  }
  render();
}

window.squarebook = squarebook;
