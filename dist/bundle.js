/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _styles = __webpack_require__(1);

	var _styles2 = _interopRequireDefault(_styles);

	var _grid = __webpack_require__(2);

	var _grid2 = _interopRequireDefault(_grid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _config = {
	  backgroundColor: '#0e1122'
	};

	function render() {
	  (0, _styles2.default)(_config);
	  (0, _grid2.default)(_config).buildGrid();
	}

	function squarebook(config) {
	  if (config) {
	    _config = config;
	  }
	  render();
	}

	window.squarebook = squarebook;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function buildCss(config) {
	  var cssText = '\n    .squarebook_wrapper {\n        width:100%;\n        height:100%;\n        background-color: ' + (config.backgroundColor || '#0e1122') + ';\n        -khtml-opacity: ' + (config.opacity || .8) + ';\n        opacity: ' + (config.backgroundColor || .8) + ';\n        position:relative;\n    }\n\n    .squarebook_square {\n      background-color: ' + (config.squareColor || '#282754') + ';\n      float:left;\n      margin:1px;\n    }\n\n    .squarebook_square:hover {\n      background-color: ' + (config.squareColorHover || '#595881') + ';\n    }\n\n    .squarebook_controls {\n      background-color:black;\n      position:absolute;\n      bottom:0;\n    }\n\n    .squarebook_color {\n      float:right;\n      border: 1px dashed #555555;\n    }\n\n    .squarebook_button {\n      float:left;\n      color:#777777;\n      text-align:center;\n    }\n  ';

	  return cssText;
	}

	exports.default = function (config) {
	  var css = buildCss(config);
	  var style = document.createElement('style');
	  var head = document.head || document.getElementsByTagName('head')[0];
	  style.type = 'text/css';

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }

	  head.appendChild(style);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _config = void 0;
	var wrapper = null;
	var controlsWrapper = null;
	var colors = [{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }, { name: 'yellow', hex: '#FFFF00' }, { name: 'pink', hex: '#FF00FF' }, { name: 'white', hex: '#FFFFFF' }];

	function buildGrid() {
	  createWrapper();
	  createSquares();
	  createControls();
	}

	function createWrapper() {
	  wrapper = document.createElement('div');
	  wrapper.className = 'squarebook_wrapper';
	  _config.container.appendChild(wrapper);
	  return wrapper;
	}

	function createSquares() {
	  var controlsHeight = wrapper.clientHeight / 10;
	  var squareWidth = wrapper.clientWidth / 50 - 2;
	  var squareHeight = (wrapper.clientHeight - controlsHeight) / 30 - 2;

	  for (var i = 0; i < 30; i++) {
	    var row = document.createElement('div');
	    row.className = "squarebook_row";
	    wrapper.appendChild(row);

	    for (var j = 0; j < 50; j++) {
	      var squareDiv = document.createElement('div');
	      squareDiv.className = 'squarebook_square';
	      squareDiv.style.width = squareWidth + 'px';
	      squareDiv.style.height = squareHeight + 'px';
	      row.appendChild(squareDiv);
	    }
	  }
	}

	function createControls() {
	  controlsWrapper = document.createElement('div');
	  controlsWrapper.className = 'squarebook_controls';
	  controlsWrapper.style.width = wrapper.clientWidth + 'px';
	  controlsWrapper.style.height = wrapper.clientHeight / 10 + 'px';
	  wrapper.appendChild(controlsWrapper);
	  createColors();
	  createButtons();
	}

	function createColors() {
	  for (var i = 0; i < colors.length; i++) {
	    var color = document.createElement('div');
	    color.className = 'squarebook_color';
	    color.style.width = controlsWrapper.clientWidth / 10 - 2 + 'px';
	    color.style.height = controlsWrapper.clientHeight - 2 + 'px';
	    color.style.backgroundColor = colors[i].hex;
	    controlsWrapper.appendChild(color);
	  }
	}

	function createButtons() {
	  var button1 = document.createElement('div');
	  button1.className = 'squarebook_button';
	  button1.style.width = controlsWrapper.clientWidth / 10 * 2 - 2 + 'px';
	  button1.style.height = controlsWrapper.clientHeight - 2 + 'px';
	  controlsWrapper.appendChild(button1);

	  var button1Text = document.createTextNode('<');
	  button1.appendChild(button1Text);

	  var button2 = document.createElement('div');
	  button2.className = 'squarebook_button';
	  button2.style.width = controlsWrapper.clientWidth / 10 * 2 - 2 + 'px';
	  button2.style.height = controlsWrapper.clientHeight - 2 + 'px';
	  controlsWrapper.appendChild(button2);

	  var button2Text = document.createTextNode('>');
	  button2.appendChild(button2Text);
	}

	exports.default = function (config) {
	  _config = config;

	  return {
	    buildGrid: buildGrid
	  };
	};

/***/ }
/******/ ]);