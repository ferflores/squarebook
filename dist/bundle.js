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

	var _ui = __webpack_require__(3);

	var _ui2 = _interopRequireDefault(_ui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _config = {
	  state: {
	    elements: {
	      container: null,
	      wrapper: null,
	      squares: [],
	      controlsWrapper: null,
	      colors: [],
	      nextButton: null,
	      prevButton: null,
	      clearButton: null,
	      saveButton: null,
	      nameInput: null
	    }
	  },
	  backgroundColor: '#0e1122'
	};

	function render() {
	  (0, _styles2.default)(_config);
	  (0, _ui2.default)(_config).build();
	}

	function squarebook(config) {
	  if (config) {
	    _config = Object.assign(_config, config);
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
	  var cssText = '\n    .squarebook_wrapper {\n        width:100%;\n        height:100%;\n        background-color: ' + (config.backgroundColor || '#0e1122') + ';\n        -khtml-opacity: ' + (config.opacity || .8) + ';\n        opacity: ' + (config.backgroundColor || .8) + ';\n        position:relative;\n        font-family:Arial;\n    }\n\n    .squarebook_square {\n      background-color: ' + (config.squareColor || '#282754') + ';\n      float:left;\n      margin:1px;\n    }\n\n    .squarebook_square:hover {\n      background-color: ' + (config.squareColorHover || '#595881') + ';\n    }\n\n    .squarebook_controls {\n      background-color:black;\n      position:absolute;\n      bottom:0;\n    }\n\n    .squarebook_color {\n      float:right;\n      border: 1px dashed #555555;\n      cursor:pointer;\n    }\n\n    .squarebook_color:hover {\n      border: 1px solid #FFFFFF;\n    }\n\n    .squarebook_navButton {\n      float:right;\n      color:#777777;\n      text-align:center;\n      cursor:pointer;\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      font-weight:none;\n    }\n\n    .squarebook_navButton:hover {\n      background-color:#121645;\n    }\n\n    .squarebook_nameInput {\n      border:none;\n      background-color:black;\n      color:white;\n    }\n  ';

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
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _config = null;
	var elements = null;
	var wrapper = null;
	var controlsWrapper = null;
	var adjusting = false;

	var colors = [{ name: 'red', hex: '#FF0000' }, { name: 'green', hex: '#00FF00' }, { name: 'blue', hex: '#0000FF' }, { name: 'yellow', hex: '#FFFF00' }, { name: 'pink', hex: '#FF00FF' }, { name: 'white', hex: '#FFFFFF' }];

	function build() {
	  createWrapper();
	  createSquares();
	  createControls();
	  bindEvents();
	}

	function createWrapper() {
	  wrapper = document.createElement('div');
	  wrapper.className = 'squarebook_wrapper';
	  _config.container.appendChild(wrapper);
	  elements.container = _config.container;
	  elements.wrapper = wrapper;

	  return wrapper;
	}

	function createSquares() {

	  for (var i = 0; i < 30; i++) {
	    var row = document.createElement('div');
	    row.className = "squarebook_row";
	    wrapper.appendChild(row);

	    for (var j = 0; j < 50; j++) {
	      var squareDiv = document.createElement('div');
	      squareDiv.className = 'squarebook_square';
	      row.appendChild(squareDiv);
	      elements.squares.push(squareDiv);
	    }
	  }
	}

	function createControls() {
	  controlsWrapper = document.createElement('div');
	  controlsWrapper.className = 'squarebook_controls';
	  wrapper.appendChild(controlsWrapper);
	  elements.controlsWrapper = controlsWrapper;
	  createNavButtons();
	  createColors();
	  createInputs();
	  adjustUI();
	}

	function createColors() {
	  for (var i = 0; i < colors.length; i++) {
	    var color = document.createElement('div');
	    color.className = 'squarebook_color';
	    color.style.backgroundColor = colors[i].hex;
	    controlsWrapper.appendChild(color);
	    elements.colors.push(color);
	  }
	}

	function createNavButtons() {
	  var nextButton = document.createElement('div');
	  nextButton.className = 'squarebook_navButton';
	  controlsWrapper.appendChild(nextButton);
	  elements.nextButton = nextButton;

	  var nextButtonText = document.createTextNode('>');
	  nextButton.appendChild(nextButtonText);

	  var prevButton = document.createElement('div');
	  prevButton.className = 'squarebook_navButton';
	  controlsWrapper.appendChild(prevButton);
	  elements.prevButton = prevButton;

	  var prevButtonText = document.createTextNode('<');
	  prevButton.appendChild(prevButtonText);
	}

	function createInputs() {
	  var nameInput = document.createElement("input");
	  nameInput.className = 'squarebook_nameInput';
	  nameInput.type = "text";
	  nameInput.placeholder = 'Your name';
	  nameInput.setAttribute('maxlength', 15);
	  controlsWrapper.appendChild(nameInput);
	  elements.nameInput = nameInput;

	  var clearButton = document.createElement('div');
	  clearButton.className = 'squarebook_navButton';
	  controlsWrapper.appendChild(clearButton);
	  elements.clearButton = clearButton;

	  var clearButtonText = document.createTextNode('clear');
	  clearButton.appendChild(clearButtonText);

	  var saveButton = document.createElement('div');
	  saveButton.className = 'squarebook_navButton';
	  controlsWrapper.appendChild(saveButton);
	  elements.saveButton = saveButton;

	  var saveButtonText = document.createTextNode('save');
	  saveButton.appendChild(saveButtonText);
	}

	function adjustUI() {

	  if (adjusting) {
	    return;
	  }

	  adjusting = true;

	  setTimeout(function () {
	    adjusting = false;
	  }, 2000);

	  var controlsHeight = wrapper.clientHeight / 10;
	  var squareWidth = wrapper.clientWidth / 50 - 2;
	  var squareHeight = (wrapper.clientHeight - controlsHeight) / 30 - 2;

	  for (var i = 0; i < elements.squares.length; i++) {
	    elements.squares[i].style.width = squareWidth + 'px';
	    elements.squares[i].style.height = squareHeight + 'px';
	  }

	  elements.controlsWrapper.style.width = wrapper.clientWidth + 'px';
	  elements.controlsWrapper.style.height = wrapper.clientHeight / 10 + 'px';

	  for (var i = 0; i < elements.colors.length; i++) {
	    elements.colors[i].style.width = controlsWrapper.clientWidth / 20 - 2 + 'px';
	    elements.colors[i].style.height = controlsWrapper.clientHeight - 2 + 'px';
	  }

	  elements.nextButton.style.width = controlsWrapper.clientWidth / 20 * 3 - 2 + 'px';
	  elements.nextButton.style.height = controlsWrapper.clientHeight + 'px';
	  elements.nextButton.style.fontSize = controlsWrapper.clientHeight + 'px';

	  elements.prevButton.style.width = controlsWrapper.clientWidth / 20 * 3 - 2 + 'px';
	  elements.prevButton.style.height = controlsWrapper.clientHeight + 'px';
	  elements.prevButton.style.fontSize = controlsWrapper.clientHeight + 'px';

	  elements.nameInput.style.width = controlsWrapper.clientWidth / 20 * 4 - 2 + 'px';
	  elements.nameInput.style.height = controlsWrapper.clientHeight - 6 + 'px';
	  elements.nameInput.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
	  elements.nameInput.style.fontSize = controlsWrapper.clientHeight / 3 + 'px';

	  elements.clearButton.style.width = controlsWrapper.clientWidth / 20 * 2 - 2 + 'px';
	  elements.clearButton.style.height = controlsWrapper.clientHeight / 2 + 'px';
	  elements.clearButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
	  elements.clearButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

	  elements.saveButton.style.width = controlsWrapper.clientWidth / 20 * 2 - 2 + 'px';
	  elements.saveButton.style.height = controlsWrapper.clientHeight / 2 + 'px';
	  elements.saveButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
	  elements.saveButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';
	}

	function bindEvents() {
	  window.addEventListener('resize', function () {
	    setTimeout(adjustUI, 1000);
	  });
	}

	exports.default = function (config) {
	  _config = config;
	  elements = config.state.elements;
	  return {
	    build: build
	  };
	};

/***/ }
/******/ ]);