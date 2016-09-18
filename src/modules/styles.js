
function buildCss(config) {
  let cssText =
    `
    .squarebook_wrapper {
        width:100%;
        height:100%;
        background-color: ${config.backgroundColor || '#0e1122'};
        -khtml-opacity: ${config.opacity || .8};
        -webkit-opacity: ${config.opacity || .8};
        opacity: ${config.backgroundColor || .8};
        position:relative;
        font-family:Arial;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        -webkit-user-select: none;
    }

    .squarebook_square {
      background-color: ${config.squareColor || '#282754'};
      float:left;
      margin:1px;
    }

    .squarebook_square:hover {
      background-color: ${config.squareColorHover || '#595881'};
    }

    .squarebook_controls {
      background-color:black;
      position:absolute;
      bottom:0;
    }

    .squarebook_color {
      float:right;
      border: 1px dashed #555555;
      cursor:pointer;
    }

    .squarebook_color:hover {
      border: 1px solid #FFFFFF;
    }

    .squarebook_navButton {
      float:right;
      color:#777777;
      text-align:center;
      cursor:pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      font-weight:none;
    }

    .squarebook_navButton:hover {
      background-color:#121645;
    }

    .squarebook_nameInput {
      border:none;
      background-color:black;
      color:white;
      padding-left:10px;
    }
  `;

    return cssText;
}

export default config => {
  let css = buildCss(config);
  let style = document.createElement('style');
  let head = document.head || document.getElementsByTagName('head')[0];
  style.type = 'text/css';

  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}
