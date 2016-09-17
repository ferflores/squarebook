let _config;
let wrapper = null;

function buildGrid(){
  createWrapper();
  createSquares();
}

function createWrapper(){
  wrapper = document.createElement('div');
  wrapper.className = 'squarebook_wrapper';
  _config.container.appendChild(wrapper);
  return wrapper;
}

function createSquares(){
  let squareWidth = (wrapper.clientWidth / 50) - 2;
  let squareHeight = (wrapper.clientHeight / 30) - 2;

  for (var i = 0; i < 30; i++) {
    var row = document.createElement('div');
    row.className = "squarebook_row";
    wrapper.appendChild(row);

    for (var j = 0; j < 50;j++) {
      var squareDiv = document.createElement('div');
      squareDiv.className = 'squarebook_square';
      squareDiv.style.width = squareWidth + 'px';
      squareDiv.style.height = squareHeight + 'px';
      row.appendChild(squareDiv);
    }
  }
}

export default config => {
  _config = config;

  return {
    buildGrid: buildGrid
  }
}
