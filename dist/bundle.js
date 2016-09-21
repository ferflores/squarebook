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

	var _ui = __webpack_require__(2);

	var _ui2 = _interopRequireDefault(_ui);

	var _events = __webpack_require__(8);

	var _events2 = _interopRequireDefault(_events);

	var _serverActions = __webpack_require__(9);

	var _serverActions2 = _interopRequireDefault(_serverActions);

	var _firebaseActions = __webpack_require__(34);

	var _firebaseActions2 = _interopRequireDefault(_firebaseActions);

	var _drawingActions = __webpack_require__(38);

	var _drawingActions2 = _interopRequireDefault(_drawingActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _config = {
	  state: {
	    currentColor: '#FF0000',
	    currentIndex: 0,
	    currentName: '',
	    currentPoints: [],
	    drawingIndex: 0,
	    drawingServerData: false,
	    loading: false,
	    drawing: false,
	    drawMode: false,
	    hasDrawData: false,
	    topIndex: null,
	    elements: {
	      container: null,
	      wrapper: null,
	      squares: [],
	      squareRows: [],
	      colors: [],
	      controlsWrapper: null,
	      nextButton: null,
	      prevButton: null,
	      signButton: null,
	      cancelButton: null,
	      clearButton: null,
	      saveButton: null,
	      nameInput: null
	    }
	  },
	  backgroundColor: '#0e1122',
	  squareColor: '#282754',
	  postDataUrl: null,
	  getDataUrl: null,
	  serverActions: null,
	  drawingActions: null,
	  firebaseConfig: null
	};

	function render() {
	  (0, _styles2.default)(_config);
	  (0, _ui2.default)(_config).build();
	  (0, _events2.default)(_config);
	}

	function squarebook(config) {
	  if (config) {
	    if (!config.container || !config.firebaseConfig && (!config.postDataUrl || !config.getDataUrl)) {
	      throw new Error('squarebook: container, postDataUrl and getDataUrl or firebaseConfig\n          are required in configuration, read README.MD file');
	    } else {
	      _config = Object.assign(_config, config);
	      _config.serverActions = _config.firebaseConfig ? (0, _firebaseActions2.default)(_config) : (0, _serverActions2.default)(_config);
	      _config.drawingActions = (0, _drawingActions2.default)(_config);
	      render();
	      _config.serverActions.getNextData();
	    }
	  } else {
	    throw new Error('squarebook: missing configuration object');
	  }
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
	  var cssText = '\n    .squarebook_wrapper {\n        width:100%;\n        height:100%;\n        background-color: ' + (config.backgroundColor || '#0e1122') + ';\n        -khtml-opacity: ' + (config.opacity || .8) + ';\n        -webkit-opacity: ' + (config.opacity || .8) + ';\n        opacity: ' + (config.backgroundColor || .8) + ';\n        position:relative;\n        font-family:Arial;\n        -moz-user-select: none;\n        -khtml-user-select: none;\n        user-select: none;\n        -webkit-user-select: none;\n    }\n\n    .squarebook_square {\n      background-color: ' + (config.squareColor || '#282754') + ';\n      float:left;\n      margin:1px;\n    }\n\n    .squarebook_square:hover {\n      background-color: ' + (config.squareColorHover || '#595881') + ';\n    }\n\n    .squarebook_controls {\n      background-color:black;\n      position:absolute;\n      bottom:0;\n    }\n\n    .squarebook_color {\n      float:right;\n      border: 1px dashed #555555;\n      cursor:pointer;\n    }\n\n    .squarebook_color:hover {\n      border: 1px solid #FFFFFF;\n    }\n\n    .squarebook_navButton {\n      float:right;\n      color:#777777;\n      text-align:center;\n      cursor:pointer;\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      font-weight:none;\n    }\n\n    .squarebook_navButton:hover {\n      background-color:#121645;\n    }\n\n    .squarebook_nameInput {\n      border:none;\n      background-color:black;\n      color:white;\n      padding-left:10px;\n    }\n  ';

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keyStorage = __webpack_require__(3);

	var _keyStorage2 = _interopRequireDefault(_keyStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	  for (var i = 0; i < 20; i++) {
	    var row = document.createElement('div');
	    row.className = "squarebook_row";
	    wrapper.appendChild(row);
	    elements.squareRows.push(row);

	    for (var j = 0; j < 30; j++) {
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
	    color.style.display = 'none';
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
	  nameInput.id = 'squarebook_nameInput';
	  nameInput.type = "text";
	  nameInput.placeholder = 'Your name';
	  nameInput.setAttribute('maxlength', 15);
	  nameInput.setAttribute('readonly', 'readonly');
	  controlsWrapper.appendChild(nameInput);
	  elements.nameInput = nameInput;

	  var signButton = document.createElement('div');
	  signButton.className = 'squarebook_navButton';
	  signButton.style.float = 'left';
	  signButton.style.display = _keyStorage2.default.get('sign') ? 'none' : 'inline';
	  controlsWrapper.appendChild(signButton);
	  elements.signButton = signButton;

	  var signButtonText = document.createTextNode('start drawing');
	  signButton.appendChild(signButtonText);

	  var cancelButton = document.createElement('div');
	  cancelButton.className = 'squarebook_navButton';
	  cancelButton.style.float = 'right';
	  cancelButton.style.display = 'none';
	  controlsWrapper.appendChild(cancelButton);
	  elements.cancelButton = cancelButton;

	  var cancelButtonText = document.createTextNode('cancel');
	  cancelButton.appendChild(cancelButtonText);

	  var clearButton = document.createElement('div');
	  clearButton.style.display = 'none';
	  clearButton.className = 'squarebook_navButton';
	  controlsWrapper.appendChild(clearButton);
	  elements.clearButton = clearButton;

	  var clearButtonText = document.createTextNode('clear');
	  clearButton.appendChild(clearButtonText);

	  var saveButton = document.createElement('div');
	  saveButton.style.display = 'none';
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
	  var squareWidth = wrapper.clientWidth / 30 - 2;
	  var squareHeight = (wrapper.clientHeight - controlsHeight) / 20 - 2;

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

	  elements.signButton.style.width = controlsWrapper.clientWidth / 20 * 4 - 2 + 'px';
	  elements.signButton.style.height = controlsWrapper.clientHeight / 2 + 'px';
	  elements.signButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
	  elements.signButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

	  elements.cancelButton.style.width = controlsWrapper.clientWidth / 20 * 4 - 2 + 'px';
	  elements.cancelButton.style.height = controlsWrapper.clientHeight / 2 + 'px';
	  elements.cancelButton.style.fontSize = controlsWrapper.clientHeight / 2 + 'px';
	  elements.cancelButton.style.marginTop = controlsWrapper.clientHeight / 5 + 'px';

	  elements.nameInput.style.width = controlsWrapper.clientWidth / 20 * 5 - 2 + 'px';
	  elements.nameInput.style.height = controlsWrapper.clientHeight - 6 + 'px';
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.8.0
	(function() {
	  var CookieStorage, LocalStorage, cookie, isLocalStorageAvailable;

	  cookie = __webpack_require__(4);

	  isLocalStorageAvailable = function() {
	    var data, error, key;
	    if (!window.localStorage) {
	      return false;
	    }
	    try {
	      key = 'test_key';
	      data = Date.now() + Math.round(Math.random() * 1000) + '';
	      window.localStorage.setItem(key, data);
	      if (window.localStorage.getItem(key) !== data) {
	        return false;
	      }
	      window.localStorage.removeItem(key);
	    } catch (_error) {
	      error = _error;
	      return false;
	    }
	    return true;
	  };

	  CookieStorage = (function() {
	    function CookieStorage() {}

	    CookieStorage.prototype.set = function(key, value) {
	      return cookie(key, value, {
	        path: '/'
	      });
	    };

	    CookieStorage.prototype.get = function(key) {
	      return cookie(key);
	    };

	    CookieStorage.prototype.remove = function(key) {
	      return cookie(key, null);
	    };

	    return CookieStorage;

	  })();

	  LocalStorage = (function() {
	    function LocalStorage() {}

	    LocalStorage.prototype.set = function(key, value) {
	      return window.localStorage.setItem(key, value);
	    };

	    LocalStorage.prototype.get = function(key) {
	      return window.localStorage.getItem(key);
	    };

	    LocalStorage.prototype.remove = function(key) {
	      return window.localStorage.removeItem(key);
	    };

	    return LocalStorage;

	  })();

	  this.storageClass = isLocalStorageAvailable() ? LocalStorage : CookieStorage;

	  module.exports = new this.storageClass();

	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(5)('cookie');

	/**
	 * Set or get cookie `name` with `value` and `options` object.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {Mixed}
	 * @api public
	 */

	module.exports = function(name, value, options){
	  switch (arguments.length) {
	    case 3:
	    case 2:
	      return set(name, value, options);
	    case 1:
	      return get(name);
	    default:
	      return all();
	  }
	};

	/**
	 * Set cookie `name` to `value`.
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @api private
	 */

	function set(name, value, options) {
	  options = options || {};
	  var str = encode(name) + '=' + encode(value);

	  if (null == value) options.maxage = -1;

	  if (options.maxage) {
	    options.expires = new Date(+new Date + options.maxage);
	  }

	  if (options.path) str += '; path=' + options.path;
	  if (options.domain) str += '; domain=' + options.domain;
	  if (options.expires) str += '; expires=' + options.expires.toUTCString();
	  if (options.secure) str += '; secure';

	  document.cookie = str;
	}

	/**
	 * Return all cookies.
	 *
	 * @return {Object}
	 * @api private
	 */

	function all() {
	  var str;
	  try {
	    str = document.cookie;
	  } catch (err) {
	    if (typeof console !== 'undefined' && typeof console.error === 'function') {
	      console.error(err.stack || err);
	    }
	    return {};
	  }
	  return parse(str);
	}

	/**
	 * Get cookie `name`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @api private
	 */

	function get(name) {
	  return all()[name];
	}

	/**
	 * Parse cookie `str`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parse(str) {
	  var obj = {};
	  var pairs = str.split(/ *; */);
	  var pair;
	  if ('' == pairs[0]) return obj;
	  for (var i = 0; i < pairs.length; ++i) {
	    pair = pairs[i].split('=');
	    obj[decode(pair[0])] = decode(pair[1]);
	  }
	  return obj;
	}

	/**
	 * Encode.
	 */

	function encode(value){
	  try {
	    return encodeURIComponent(value);
	  } catch (e) {
	    debug('error `encode(%o)` - %o', value, e)
	  }
	}

	/**
	 * Decode.
	 */

	function decode(value) {
	  try {
	    return decodeURIComponent(value);
	  } catch (e) {
	    debug('error `decode(%o)` - %o', value, e)
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(6);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(7);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function bindEvents(config) {
	  bindDrawingEvents(config);
	  bindServerEvents(config);
	}

	function bindDrawingEvents(config) {
	  var elements = config.state.elements;
	  elements.wrapper.addEventListener('mouseup', config.drawingActions.stopDraw);
	  elements.wrapper.addEventListener('mouseleave', config.drawingActions.stopDraw);
	  elements.wrapper.addEventListener('mousedown', config.drawingActions.beginDraw);
	  elements.signButton.addEventListener('click', config.drawingActions.prepareToDraw);
	  elements.cancelButton.addEventListener('click', config.drawingActions.cancelDraw);

	  for (var i = 0; i < elements.squares.length; i++) {
	    elements.squares[i].addEventListener('mousemove', config.drawingActions.draw);
	  }

	  for (var i = 0; i < elements.colors.length; i++) {
	    elements.colors[i].addEventListener('mousedown', config.drawingActions.setColor);
	  }

	  elements.clearButton.addEventListener('click', config.drawingActions.clear);
	}

	function bindServerEvents(config) {
	  var elements = config.state.elements;

	  elements.saveButton.addEventListener('click', config.serverActions.postData);
	  elements.nextButton.addEventListener('click', config.serverActions.getNextData);
	  elements.prevButton.addEventListener('click', config.serverActions.getPrevData);
	}

	exports.default = function (config) {
	  bindEvents(config);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _errorMessage = __webpack_require__(10);

	var _errorMessage2 = _interopRequireDefault(_errorMessage);

	var _axios = __webpack_require__(11);

	var _axios2 = _interopRequireDefault(_axios);

	var _keyStorage = __webpack_require__(3);

	var _keyStorage2 = _interopRequireDefault(_keyStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _config = null;

	function displayNoItemsData(config) {
	  config.drawingActions.drawData(def.noData, -1);
	}

	function postData() {
	  var name = document.getElementById('squarebook_nameInput');

	  if (!_config.state.hasDrawData) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Draw something!');
	  } else if (name.value.length < 3) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Please input your name!');
	  } else {
	    _config.state.elements.saveButton.removeEventListener('click', config.serverActions.postData);

	    var data = {
	      name: name.value,
	      points: []
	    };

	    var squares = _config.state.elements.squares;

	    for (var i = 0; i < squares.length; i++) {
	      var color = squares[i].getAttribute('data-draw');
	      if (color) {
	        data.points.push({
	          color: color,
	          index: i
	        });
	      }
	    }

	    _axios2.default.post(_config.postDataUrl, data).then(function (response) {
	      handlePostResponse();
	    }).catch(function (error) {
	      _errorMessage2.default.displayMessage(_config.state.elements.wrapper, error);
	      _config.state.elements.saveButton.addEventListener('click', _config.serverActions.postData);
	    });
	  }
	}

	function handlePostResponse() {
	  _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Your draw has been saved, thanks!');
	  _config.drawingActions.drawDone();
	  getRequest(0, 1);
	  _keyStorage2.default.set('signed', 'true');
	}

	function handleGetResponse(data, increment) {
	  _config.state.drawingIndex = _config.state.currentIndex;
	  _config.state.currentPoints = data.points.slice(0);
	  _config.state.currentName = data.name;
	  _config.drawingActions.drawData(data, _config.state.drawingIndex);
	  _config.state.currentIndex += increment;
	}

	function getPrevData() {
	  if (_config.state.loading || _config.state.currentIndex - 1 < 0) {
	    return;
	  }

	  getRequest(_config.state.currentIndex - 1, -1);
	}

	function getNextData() {
	  if (_config.state.loading || _config.state.topIndex && _config.state.currentIndex + 1 >= _config.state.topIndex) {
	    return;
	  }

	  getRequest(_config.state.currentIndex + 1, 1);
	}

	function getRequest(index, increment) {
	  _config.drawingActions.clear();
	  _config.state.elements.nameInput.value = 'loading...';
	  _config.state.loading = true;
	  _axios2.default.get(_config.getDataUrl + '/?index=' + index).then(function (response) {
	    if (response.data) {
	      handleGetResponse(response.data, increment);
	    } else {
	      _config.state.topIndex = index;
	      displayNoItemsData(_config);
	    }
	    _config.state.loading = false;
	  }).catch(function (error) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, error);
	    _config.state.loading = false;
	  });
	}

	exports.default = function (config) {
	  _config = config;

	  return {
	    postData: postData,
	    getNextData: getNextData,
	    getPrevData: getPrevData
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function displayMessage(wrapper, message) {
	  if (document.getElementById('squarebook_error')) {
	    return;
	  }

	  var div = document.createElement('div');
	  div.id = 'squarebook_error';
	  div.style.backgroundColor = 'black';
	  div.style.width = wrapper.clientWidth + 'px';
	  div.style.height = wrapper.clientHeight / 10 + 'px';
	  div.style.position = 'absolute';
	  div.style.textAlign = 'center';
	  div.style.color = 'red';
	  var text = document.createTextNode(message);
	  div.appendChild(text);

	  wrapper.appendChild(div);

	  setTimeout(function () {
	    document.getElementById('squarebook_error').parentNode.removeChild(document.getElementById('squarebook_error'));
	  }, 3000);
	}

	exports.default = {
	  displayMessage: displayMessage
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);
	var bind = __webpack_require__(14);
	var Axios = __webpack_require__(15);

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance();

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return createInstance(defaultConfig);
	};

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(33);

	module.exports = axios;

	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bind = __webpack_require__(14);

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(16);
	var utils = __webpack_require__(13);
	var InterceptorManager = __webpack_require__(18);
	var dispatchRequest = __webpack_require__(19);
	var isAbsoluteURL = __webpack_require__(31);
	var combineURLs = __webpack_require__(32);

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 */
	function Axios(defaultConfig) {
	  this.defaults = utils.merge(defaults, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	module.exports = Axios;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);
	var normalizeHeaderName = __webpack_require__(17);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(13);
	var transformData = __webpack_require__(21);

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter;

	  if (typeof config.adapter === 'function') {
	    // For custom adapter support
	    adapter = config.adapter;
	  } else if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(22);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(22);
	  }

	  return Promise.resolve(config)
	    // Wrap synchronous adapter errors and pass configuration
	    .then(adapter)
	    .then(function onFulfilled(response) {
	      // Transform response data
	      response.data = transformData(
	        response.data,
	        response.headers,
	        config.transformResponse
	      );

	      return response;
	    }, function onRejected(error) {
	      // Transform response data
	      if (error && error.response) {
	        error.response.data = transformData(
	          error.response.data,
	          error.response.headers,
	          config.transformResponse
	        );
	      }

	      return Promise.reject(error);
	    });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(13);
	var settle = __webpack_require__(23);
	var buildURL = __webpack_require__(26);
	var parseHeaders = __webpack_require__(27);
	var isURLSameOrigin = __webpack_require__(28);
	var createError = __webpack_require__(24);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(29);

	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      if (request.status === 0) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(30);

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        if (request.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }


	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createError = __webpack_require__(24);

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response
	    ));
	  }
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var enhanceError = __webpack_require__(25);

	/**
	 * Create an Error with the specified message, config, error code, and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, response);
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 @ @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.response = response;
	  return error;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(13);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _app = __webpack_require__(35);

	var _app2 = _interopRequireDefault(_app);

	var _database = __webpack_require__(36);

	var _database2 = _interopRequireDefault(_database);

	var _defaultData = __webpack_require__(37);

	var _defaultData2 = _interopRequireDefault(_defaultData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = null;

	function displayNoItemsData(config) {
	  config.drawingActions.drawData(_defaultData2.default.noData, -1);
	  config.state.currentIndex++;
	  config.state.drawingIndex++;
	}

	function initializeFirebase(firebaseConfig) {
	  app = _app2.default.initializeApp(firebaseConfig);
	}

	function _getNextData(config) {
	  if (config.state.loading || config.state.topIndex && config.state.currentIndex + 1 >= config.state.topIndex) {
	    return;
	  }

	  getRequest(config, config.state.currentIndex, 1);
	}

	function _getPrevData(config) {
	  if (config.state.loading || config.state.currentIndex - 1 < 0) {
	    return;
	  }
	  getRequest(config, config.state.currentIndex, -1);
	}

	function getRequest(config, index, increment) {
	  config.drawingActions.clear();
	  config.state.elements.nameInput.value = 'loading...';
	  config.state.loading = true;

	  var postRef = app.database().ref('/posts');
	  postRef.once("value", function (snapshot) {
	    var count = snapshot.numChildren();
	    var getRef = app.database().ref('/posts/post' + (count - (index == 0 ? 1 : index + increment)));
	    getRef.once('value', function (snapshot) {
	      var value = snapshot.val();
	      if (!value) {
	        displayNoItemsData(config);
	        config.state.topIndex = index;
	      } else {
	        handleGetResponse(config, snapshot.val(), increment);
	      }
	      config.state.loading = false;
	    }, function (error) {
	      errorMessage.displayMessage(_config.state.elements.wrapper, error);
	      config.state.loading = false;
	    });
	  });
	}

	function handleGetResponse(config, data, increment) {
	  config.state.drawingIndex = config.state.currentIndex;
	  config.state.currentPoints = data.points.slice(0);
	  config.state.currentName = data.name;
	  config.drawingActions.drawData(data, config.state.drawingIndex);
	  config.state.currentIndex += increment;
	}

	function handlePostResponse(config) {
	  errorMessage.displayMessage(config.state.elements.wrapper, 'Your draw has been saved, thanks!');
	  config.drawingActions.drawDone();
	  getRequest(config, 0, 1);
	  storage.set('signed', 'true');
	}

	function _postData(config) {

	  var name = document.getElementById('squarebook_nameInput');

	  if (!config.state.hasDrawData) {
	    errorMessage.displayMessage(config.state.elements.wrapper, 'Draw something!');
	  } else if (name.value.length < 3) {
	    errorMessage.displayMessage(config.state.elements.wrapper, 'Please input your name!');
	  } else {
	    config.state.elements.saveButton.removeEventListener('click', config.serverActions.postData);

	    var postRef = app.database().ref('/posts');
	    postRef.once("value", function (snapshot) {
	      var data = {
	        name: name.value.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, ""),
	        points: []
	      };

	      var squares = config.state.elements.squares;

	      for (var i = 0; i < squares.length; i++) {
	        var color = squares[i].getAttribute('data-draw');
	        if (color) {
	          data.points.push({
	            color: color,
	            index: i
	          });
	        }
	      }

	      var nextIndex = snapshot.numChildren();
	      app.database().ref('/posts/post' + nextIndex).set(data, function (error) {
	        if (error) {
	          errorMessage.displayMessage(_config.state.elements.wrapper, error);
	          config.state.elements.saveButton.addEventListener('click', config.serverActions.postData);
	        } else {
	          handlePostResponse();
	        }
	      });
	    });
	  }
	}

	exports.default = function (config) {

	  initializeFirebase(config.firebaseConfig);

	  return {
	    postData: function postData() {
	      _postData(config);
	    },
	    getNextData: function getNextData() {
	      _getNextData(config);
	    },
	    getPrevData: function getPrevData() {
	      _getPrevData(config);
	    }
	  };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	var firebase = null; (function() { var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},h="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this,k=function(){k=function(){};h.Symbol||(h.Symbol=ba)},ca=0,ba=function(a){return"jscomp_symbol_"+(a||"")+ca++},n=function(){k();var a=h.Symbol.iterator;a||(a=h.Symbol.iterator=h.Symbol("iterator"));
	"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return m(this)}});n=function(){}},m=function(a){var b=0;return da(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},da=function(a){n();a={next:a};a[h.Symbol.iterator]=function(){return this};return a},q=this,r=function(){},t=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);
	if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},v=function(a){return"function"==t(a)},ea=function(a,
	b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},w=function(a,b,c){w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return w.apply(null,arguments)},x=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},y=function(a,b){function c(){}c.prototype=b.prototype;a.ga=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.fa=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var z;z="undefined"!==typeof window?window:"undefined"!==typeof self?self:global;function __extends(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}
	function __decorate(a,b,c,d){var e=arguments.length,f=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;g=z.Reflect;if("object"===typeof g&&"function"===typeof g.decorate)f=g.decorate(a,b,c,d);else for(var l=a.length-1;0<=l;l--)if(g=a[l])f=(3>e?g(f):3<e?g(b,c,f):g(b,c))||f;return 3<e&&f&&Object.defineProperty(b,c,f),f}function __metadata(a,b){var c=z.Reflect;if("object"===typeof c&&"function"===typeof c.metadata)return c.metadata(a,b)}
	var __param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,f){function g(a){try{p(d.next(a))}catch(u){f(u)}}function l(a){try{p(d.throw(a))}catch(u){f(u)}}function p(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(g,l)}p((d=d.apply(a,b)).next())})};"undefined"!==typeof z.L&&z.L||(z.ca=__extends,z.ba=__decorate,z.da=__metadata,z.ea=__param,z.aa=__awaiter);var A=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,A);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};y(A,Error);A.prototype.name="CustomError";var ga=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var B=function(a,b){b.unshift(a);A.call(this,ga.apply(null,b));b.shift()};y(B,A);B.prototype.name="AssertionError";var ha=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new B(""+e,f||[]);},C=function(a,b,c){a||ha("",null,b,Array.prototype.slice.call(arguments,2))},D=function(a,b,c){v(a)||ha("Expected function but got %s: %s.",[t(a),a],b,Array.prototype.slice.call(arguments,2))};var E=function(a,b,c){this.S=c;this.M=a;this.U=b;this.s=0;this.o=null};E.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.M();return a};E.prototype.put=function(a){this.U(a);this.s<this.S&&(this.s++,a.next=this.o,this.o=a)};var F;a:{var ia=q.navigator;if(ia){var ja=ia.userAgent;if(ja){F=ja;break a}}F=""};var ka=function(a){q.setTimeout(function(){throw a;},0)},G,la=function(){var a=q.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==F.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
	"//"+b.location.host,a=w(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==F.indexOf("Trident")&&-1==F.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.F;c.F=null;a()}};return function(a){d.next={F:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){q.setTimeout(a,0)}};var H=function(){this.v=this.f=null},ma=new E(function(){return new I},function(a){a.reset()},100);H.prototype.add=function(a,b){var c=ma.get();c.set(a,b);this.v?this.v.next=c:(C(!this.f),this.f=c);this.v=c};H.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.v=null),a.next=null);return a};var I=function(){this.next=this.scope=this.B=null};I.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
	I.prototype.reset=function(){this.next=this.scope=this.B=null};var M=function(a,b){J||na();L||(J(),L=!0);oa.add(a,b)},J,na=function(){if(q.Promise&&q.Promise.resolve){var a=q.Promise.resolve(void 0);J=function(){a.then(pa)}}else J=function(){var a=pa;!v(q.setImmediate)||q.Window&&q.Window.prototype&&-1==F.indexOf("Edge")&&q.Window.prototype.setImmediate==q.setImmediate?(G||(G=la()),G(a)):q.setImmediate(a)}},L=!1,oa=new H,pa=function(){for(var a;a=oa.remove();){try{a.B.call(a.scope)}catch(b){ka(b)}ma.put(a)}L=!1};var O=function(a,b){this.b=0;this.K=void 0;this.j=this.g=this.u=null;this.m=this.A=!1;if(a!=r)try{var c=this;a.call(b,function(a){N(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}N(c,3,a)})}catch(d){N(this,3,d)}},qa=function(){this.next=this.context=this.h=this.c=this.child=null;this.w=!1};qa.prototype.reset=function(){this.context=this.h=this.c=this.child=null;this.w=!1};
	var ra=new E(function(){return new qa},function(a){a.reset()},100),sa=function(a,b,c){var d=ra.get();d.c=a;d.h=b;d.context=c;return d},ua=function(a,b,c){ta(a,b,c,null)||M(x(b,a))};O.prototype.then=function(a,b,c){null!=a&&D(a,"opt_onFulfilled should be a function.");null!=b&&D(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return va(this,v(a)?a:null,v(b)?b:null,c)};O.prototype.then=O.prototype.then;O.prototype.$goog_Thenable=!0;
	O.prototype.X=function(a,b){return va(this,null,a,b)};var xa=function(a,b){a.g||2!=a.b&&3!=a.b||wa(a);C(null!=b.c);a.j?a.j.next=b:a.g=b;a.j=b},va=function(a,b,c,d){var e=sa(null,null,null);e.child=new O(function(a,g){e.c=b?function(c){try{var e=b.call(d,c);a(e)}catch(K){g(K)}}:a;e.h=c?function(b){try{var e=c.call(d,b);a(e)}catch(K){g(K)}}:g});e.child.u=a;xa(a,e);return e.child};O.prototype.Y=function(a){C(1==this.b);this.b=0;N(this,2,a)};O.prototype.Z=function(a){C(1==this.b);this.b=0;N(this,3,a)};
	var N=function(a,b,c){0==a.b&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,ta(c,a.Y,a.Z,a)||(a.K=c,a.b=b,a.u=null,wa(a),3!=b||ya(a,c)))},ta=function(a,b,c,d){if(a instanceof O)return null!=b&&D(b,"opt_onFulfilled should be a function."),null!=c&&D(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),xa(a,sa(b||r,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),
	!0;e=typeof a;if("object"==e&&null!=a||"function"==e)try{var f=a.then;if(v(f))return za(a,f,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1},za=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},l=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,l)}catch(p){l(p)}},wa=function(a){a.A||(a.A=!0,M(a.O,a))},Aa=function(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.j=null);null!=b&&C(null!=b.c);return b};
	O.prototype.O=function(){for(var a;a=Aa(this);){var b=this.b,c=this.K;if(3==b&&a.h&&!a.w){var d;for(d=this;d&&d.m;d=d.u)d.m=!1}if(a.child)a.child.u=null,Ba(a,b,c);else try{a.w?a.c.call(a.context):Ba(a,b,c)}catch(e){Ca.call(null,e)}ra.put(a)}this.A=!1};var Ba=function(a,b,c){2==b?a.c.call(a.context,c):a.h&&a.h.call(a.context,c)},ya=function(a,b){a.m=!0;M(function(){a.m&&Ca.call(null,b)})},Ca=ka;function P(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=P(a[c],b[c]));return a};var Da=Error.captureStackTrace,R=function(a,b){this.code=a;this.message=b;if(Da)Da(this,Q.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};R.prototype=Object.create(Error.prototype);R.prototype.constructor=R;R.prototype.name="FirebaseError";var Q=function(a,b,c){this.V=a;this.W=b;this.N=c;this.pattern=/\{\$([^}]+)}/g};
	Q.prototype.create=function(a,b){void 0===b&&(b={});var c=this.N[a];a=this.V+"/"+a;var c=void 0===c?"Error":c.replace(this.pattern,function(a,c){a=b[c];return void 0!==a?a.toString():"<"+c+"?>"}),c=this.W+": "+c+" ("+a+").",c=new R(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};O.all=function(a){return new O(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},l=0,p;l<a.length;l++)p=a[l],ua(p,x(f,l),g);else b(e)})};O.resolve=function(a){if(a instanceof O)return a;var b=new O(r);N(b,2,a);return b};O.reject=function(a){return new O(function(b,c){c(a)})};O.prototype["catch"]=O.prototype.X;var S=O;"undefined"!==typeof Promise&&(S=Promise);var Ea=S;function Fa(a,b){a=new T(a,b);return a.subscribe.bind(a)}var T=function(a,b){var c=this;this.a=[];this.J=0;this.task=Ea.resolve();this.l=!1;this.D=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};T.prototype.next=function(a){U(this,function(b){b.next(a)})};T.prototype.error=function(a){U(this,function(b){b.error(a)});this.close(a)};T.prototype.complete=function(){U(this,function(a){a.complete()});this.close()};
	T.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=Ga(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=V);void 0===e.error&&(e.error=V);void 0===e.complete&&(e.complete=V);a=this.$.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.G?e.error(d.G):e.complete()}catch(f){}});this.a.push(e);return a};
	T.prototype.$=function(a){void 0!==this.a&&void 0!==this.a[a]&&(delete this.a[a],--this.J,0===this.J&&void 0!==this.D&&this.D(this))};var U=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Ha(a,c,b)},Ha=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){}})};T.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.G=a),this.task.then(function(){b.a=void 0;b.D=void 0}))};
	function Ga(a){if("object"!==typeof a||null===a)return!1;var b;b=["next","error","complete"];n();var c=b[Symbol.iterator];b=c?c.call(b):m(b);for(c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1}function V(){};var W=S,X=function(a,b,c){var d=this;this.H=c;this.I=!1;this.i={};this.C=b;this.T=P(void 0,a);Object.keys(c.INTERNAL.factories).forEach(function(a){var b=c.INTERNAL.useAsService(d,a);null!==b&&(d[a]=d.R.bind(d,b))})};X.prototype.delete=function(){var a=this;return(new W(function(b){Y(a);b()})).then(function(){a.H.INTERNAL.removeApp(a.C);return W.all(Object.keys(a.i).map(function(b){return a.i[b].INTERNAL.delete()}))}).then(function(){a.I=!0;a.i={}})};
	X.prototype.R=function(a){Y(this);void 0===this.i[a]&&(this.i[a]=this.H.INTERNAL.factories[a](this,this.P.bind(this)));return this.i[a]};X.prototype.P=function(a){P(this,a)};var Y=function(a){a.I&&Z(Ia("deleted",{name:a.C}))};h.Object.defineProperties(X.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.C}},options:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.T}}});X.prototype.name&&X.prototype.options||X.prototype.delete||console.log("dc");
	function Ja(){function a(a){a=a||"[DEFAULT]";var b=d[a];void 0===b&&Z("noApp",{name:a});return b}function b(a,b){Object.keys(e).forEach(function(d){d=c(a,d);if(null!==d&&f[d])f[d](b,a)})}function c(a,b){if("serverAuth"===b)return null;var c=b;a=a.options;"auth"===b&&(a.serviceAccount||a.credential)&&(c="serverAuth","serverAuth"in e||Z("serverAuthMissing"));return c}var d={},e={},f={},g={__esModule:!0,initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||Z("bad-app-name",
	{name:c+""});void 0!==d[c]&&Z("dupApp",{name:c});a=new X(a,c,g);d[c]=a;b(a,"create");void 0!=a.INTERNAL&&void 0!=a.INTERNAL.getToken||P(a,{INTERNAL:{getToken:function(){return W.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return a},app:a,apps:null,Promise:W,SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,c,d,u){e[b]&&Z("dupService",{name:b});e[b]=c;u&&(f[b]=u);c=function(c){void 0===c&&(c=a());return c[b]()};void 0!==d&&P(c,d);return g[b]=c},createFirebaseNamespace:Ja,
	extendNamespace:function(a){P(g,a)},createSubscribe:Fa,ErrorFactory:Q,removeApp:function(a){b(d[a],"delete");delete d[a]},factories:e,useAsService:c,Promise:O,deepExtend:P}};g["default"]=g;Object.defineProperty(g,"apps",{get:function(){return Object.keys(d).map(function(a){return d[a]})}});a.App=X;return g}function Z(a,b){throw Error(Ia(a,b));}
	function Ia(a,b){b=b||{};b={noApp:"No Firebase App '"+b.name+"' has been created - call Firebase App.initializeApp().","bad-app-name":"Illegal App name: '"+b.name+"'.",dupApp:"Firebase App named '"+b.name+"' already exists.",deleted:"Firebase App named '"+b.name+"' already deleted.",dupService:"Firebase Service named '"+b.name+"' already registered.",serverAuthMissing:"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain."}[a];
	return void 0===b?"Application Error: ("+a+")":b};"undefined"!==typeof firebase&&(firebase=Ja()); })();
	firebase.SDK_VERSION = "3.4.0";
	module.exports = firebase;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var firebase = __webpack_require__(35);
	/*! @license Firebase v3.4.0
	    Build: 3.4.0-rc.3
	    Terms: https://developers.google.com/terms */
	(function() {var g,n=this;function p(a){return void 0!==a}function aa(){}function ba(a){a.Wb=function(){return a.bf?a.bf:a.bf=new a}}
	function ca(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"array"==ca(a)}function ea(a){var b=ca(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function fa(a){return"number"==typeof a}function ga(a){return"function"==ca(a)}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
	function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
	function ka(a,b){function c(){}c.prototype=b.prototype;a.Ig=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Eg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function t(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function la(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function ma(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function na(a){var b=0,c;for(c in a)b++;return b}function oa(a){for(var b in a)return b}function pa(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function qa(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function ra(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function sa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function ta(a,b){var c=sa(a,b,void 0);return c&&a[c]}function ua(a){for(var b in a)return!1;return!0}function va(a){var b={},c;for(c in a)b[c]=a[c];return b};function wa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function xa(){this.Fd=void 0}
	function ya(a,b,c){switch(typeof b){case "string":za(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(da(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],ya(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),za(f,c),
	c.push(":"),ya(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Aa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ba=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function za(a,b){b.push('"',a.replace(Ba,function(a){if(a in Aa)return Aa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Aa[a]=e+b.toString(16)}),'"')};var v;a:{var Ca=n.navigator;if(Ca){var Da=Ca.userAgent;if(Da){v=Da;break a}}v=""};function Ea(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Ea);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}ka(Ea,Error);Ea.prototype.name="CustomError";var w=Array.prototype,Fa=w.indexOf?function(a,b,c){return w.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(q(a))return q(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ga=w.forEach?function(a,b,c){w.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ha=w.filter?function(a,b,c){return w.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=q(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(e[f++]=m)}return e},Ia=w.map?function(a,b,c){return w.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ja=w.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=r(b,d));return w.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ga(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Ka=w.every?function(a,b,
	c){return w.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function La(a,b){var c=Ma(a,b,void 0);return 0>c?null:q(a)?a.charAt(c):a[c]}function Ma(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Na(a,b){var c=Fa(a,b);0<=c&&w.splice.call(a,c,1)}function Oa(a,b,c){return 2>=arguments.length?w.slice.call(a,b):w.slice.call(a,b,c)}
	function Pa(a,b){a.sort(b||Qa)}function Qa(a,b){return a>b?1:a<b?-1:0};var Ra=-1!=v.indexOf("Opera")||-1!=v.indexOf("OPR"),Sa=-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE"),Ta=-1!=v.indexOf("Gecko")&&-1==v.toLowerCase().indexOf("webkit")&&!(-1!=v.indexOf("Trident")||-1!=v.indexOf("MSIE")),Ua=-1!=v.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Ra&&n.opera)return a=n.opera.version,ga(a)?a():a;Ta?b=/rv\:([^\);]+)(\)|;)/:Sa?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Ua&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(v))?a[1]:"");return Sa&&(b=(b=n.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();function Va(a){n.setTimeout(function(){throw a;},0)}var Wa;
	function Xa(){var a=n.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==v.indexOf("Presto")&&(a=function(){var a=document.createElement("iframe");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=r(function(a){if(("*"==d||a.origin==
	d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==v.indexOf("Trident")&&-1==v.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(p(c.next)){c=c.next;var a=c.Le;c.Le=null;a()}};return function(a){d.next={Le:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("script")?function(a){var b=
	document.createElement("script");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){n.setTimeout(a,0)}};function Ya(a,b){Za||$a();ab||(Za(),ab=!0);bb.push(new cb(a,b))}var Za;function $a(){if(n.Promise&&n.Promise.resolve){var a=n.Promise.resolve();Za=function(){a.then(db)}}else Za=function(){var a=db;!ga(n.setImmediate)||n.Window&&n.Window.prototype&&n.Window.prototype.setImmediate==n.setImmediate?(Wa||(Wa=Xa()),Wa(a)):n.setImmediate(a)}}var ab=!1,bb=[];[].push(function(){ab=!1;bb=[]});
	function db(){for(;bb.length;){var a=bb;bb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.Wf.call(c.scope)}catch(d){Va(d)}}}ab=!1}function cb(a,b){this.Wf=a;this.scope=b};function eb(a,b){this.L=fb;this.uf=void 0;this.Ca=this.Ha=null;this.jd=this.be=!1;if(a==gb)hb(this,ib,b);else try{var c=this;a.call(b,function(a){hb(c,ib,a)},function(a){if(!(a instanceof jb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(b){}hb(c,kb,a)})}catch(d){hb(this,kb,d)}}var fb=0,ib=2,kb=3;function gb(){}eb.prototype.then=function(a,b,c){return lb(this,ga(a)?a:null,ga(b)?b:null,c)};eb.prototype.then=eb.prototype.then;eb.prototype.$goog_Thenable=!0;g=eb.prototype;
	g.Ag=function(a,b){return lb(this,null,a,b)};g.cancel=function(a){this.L==fb&&Ya(function(){var b=new jb(a);mb(this,b)},this)};function mb(a,b){if(a.L==fb)if(a.Ha){var c=a.Ha;if(c.Ca){for(var d=0,e=-1,f=0,h;h=c.Ca[f];f++)if(h=h.m)if(d++,h==a&&(e=f),0<=e&&1<d)break;0<=e&&(c.L==fb&&1==d?mb(c,b):(d=c.Ca.splice(e,1)[0],nb(c,d,kb,b)))}a.Ha=null}else hb(a,kb,b)}function ob(a,b){a.Ca&&a.Ca.length||a.L!=ib&&a.L!=kb||pb(a);a.Ca||(a.Ca=[]);a.Ca.push(b)}
	function lb(a,b,c,d){var e={m:null,hf:null,kf:null};e.m=new eb(function(a,h){e.hf=b?function(c){try{var e=b.call(d,c);a(e)}catch(l){h(l)}}:a;e.kf=c?function(b){try{var e=c.call(d,b);!p(e)&&b instanceof jb?h(b):a(e)}catch(l){h(l)}}:h});e.m.Ha=a;ob(a,e);return e.m}g.Cf=function(a){this.L=fb;hb(this,ib,a)};g.Df=function(a){this.L=fb;hb(this,kb,a)};
	function hb(a,b,c){if(a.L==fb){if(a==c)b=kb,c=new TypeError("Promise cannot resolve to itself");else{var d;if(c)try{d=!!c.$goog_Thenable}catch(e){d=!1}else d=!1;if(d){a.L=1;c.then(a.Cf,a.Df,a);return}if(ha(c))try{var f=c.then;if(ga(f)){qb(a,c,f);return}}catch(h){b=kb,c=h}}a.uf=c;a.L=b;a.Ha=null;pb(a);b!=kb||c instanceof jb||rb(a,c)}}function qb(a,b,c){function d(b){f||(f=!0,a.Df(b))}function e(b){f||(f=!0,a.Cf(b))}a.L=1;var f=!1;try{c.call(b,e,d)}catch(h){d(h)}}
	function pb(a){a.be||(a.be=!0,Ya(a.Uf,a))}g.Uf=function(){for(;this.Ca&&this.Ca.length;){var a=this.Ca;this.Ca=null;for(var b=0;b<a.length;b++)nb(this,a[b],this.L,this.uf)}this.be=!1};function nb(a,b,c,d){if(c==ib)b.hf(d);else{if(b.m)for(;a&&a.jd;a=a.Ha)a.jd=!1;b.kf(d)}}function rb(a,b){a.jd=!0;Ya(function(){a.jd&&sb.call(null,b)})}var sb=Va;function jb(a){Ea.call(this,a)}ka(jb,Ea);jb.prototype.name="cancel";var tb=null,ub=null,vb=null;function wb(a,b){if(!ea(a))throw Error("encodeByteArray takes an array as a parameter");xb();for(var c=b?ub:tb,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,m=e+2<a.length,l=m?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|l>>6,l=l&63;m||(l=64,h||(k=64));d.push(c[u],c[f],c[k],c[l])}return d.join("")}
	function xb(){if(!tb){tb={};ub={};vb={};for(var a=0;65>a;a++)tb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),ub[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),vb[ub[a]]=a,62<=a&&(vb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function yb(){this.Ya=-1};function zb(){this.Ya=-1;this.Ya=64;this.N=[];this.Wd=[];this.Jf=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Ya;++a)this.zd[a]=0;this.Pd=this.ac=0;this.reset()}ka(zb,yb);zb.prototype.reset=function(){this.N[0]=1732584193;this.N[1]=4023233417;this.N[2]=2562383102;this.N[3]=271733878;this.N[4]=3285377520;this.Pd=this.ac=0};
	function Ab(a,b,c){c||(c=0);var d=a.Jf;if(q(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.N[0];c=a.N[1];for(var h=a.N[2],k=a.N[3],m=a.N[4],l,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),l=1518500249):(f=c^h^k,l=1859775393):60>e?(f=c&h|k&(c|h),l=2400959708):(f=c^h^k,l=3395469782),f=(b<<
	5|b>>>27)+f+m+l+d[e]&4294967295,m=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.N[0]=a.N[0]+b&4294967295;a.N[1]=a.N[1]+c&4294967295;a.N[2]=a.N[2]+h&4294967295;a.N[3]=a.N[3]+k&4294967295;a.N[4]=a.N[4]+m&4294967295}
	zb.prototype.update=function(a,b){if(null!=a){p(b)||(b=a.length);for(var c=b-this.Ya,d=0,e=this.Wd,f=this.ac;d<b;){if(0==f)for(;d<=c;)Ab(this,a,d),d+=this.Ya;if(q(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Ya){Ab(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Ya){Ab(this,e);f=0;break}}this.ac=f;this.Pd+=b}};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function Bb(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function y(a,b,c,d){if((!d||p(c))&&!ga(c))throw Error(Bb(a,b,d)+"must be a valid function.");}function Cb(a,b,c){if(p(c)&&(!ha(c)||null===c))throw Error(Bb(a,b,!0)+"must be a valid context object.");};var Db=n.Promise||eb;eb.prototype["catch"]=eb.prototype.Ag;function Eb(){var a=this;this.reject=this.resolve=null;this.sa=new Db(function(b,c){a.resolve=b;a.reject=c})}function Fb(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ga(b)&&(Gb(a.sa),1===b.length?b(c):b(c,d))}}function Gb(a){a.then(void 0,aa)};function Hb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function A(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function Ib(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function Jb(a){var b=[];Ib(a,function(a,d){da(d)?Ga(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};function Kb(a){return"undefined"!==typeof JSON&&p(JSON.parse)?JSON.parse(a):wa(a)}function B(a){if("undefined"!==typeof JSON&&p(JSON.stringify))a=JSON.stringify(a);else{var b=[];ya(new xa,a,b);a=b.join("")}return a};function Lb(a,b){if(!a)throw Mb(b);}function Mb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function Nb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,Lb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function Ob(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function Pb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function Qb(a){this.te=a;this.Bd=[];this.Rb=0;this.Yd=-1;this.Gb=null}function Rb(a,b,c){a.Yd=b;a.Gb=c;a.Yd<a.Rb&&(a.Gb(),a.Gb=null)}function Sb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Rb];){var d=a.Bd[a.Rb];delete a.Bd[a.Rb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;Tb(function(){f.te(d[e])})}if(a.Rb===a.Yd){a.Gb&&(clearTimeout(a.Gb),a.Gb(),a.Gb=null);break}a.Rb++}};function Ub(){this.qc={}}Ub.prototype.set=function(a,b){null==b?delete this.qc[a]:this.qc[a]=b};Ub.prototype.get=function(a){return Hb(this.qc,a)?this.qc[a]:null};Ub.prototype.remove=function(a){delete this.qc[a]};Ub.prototype.cf=!0;function Vb(a){this.vc=a;this.Cd="firebase:"}g=Vb.prototype;g.set=function(a,b){null==b?this.vc.removeItem(this.Cd+a):this.vc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.vc.getItem(this.Cd+a);return null==a?null:Kb(a)};g.remove=function(a){this.vc.removeItem(this.Cd+a)};g.cf=!1;g.toString=function(){return this.vc.toString()};function Wb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new Vb(b)}}catch(c){}return new Ub}var Xb=Wb("localStorage"),Yb=Wb("sessionStorage");function Zb(a,b){this.type=$b;this.source=a;this.path=b}Zb.prototype.Nc=function(){return this.path.e()?new Zb(this.source,C):new Zb(this.source,D(this.path))};Zb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function ac(a,b,c){this.type=bc;this.source=a;this.path=b;this.Ja=c}ac.prototype.Nc=function(a){return this.path.e()?new ac(this.source,C,this.Ja.R(a)):new ac(this.source,D(this.path),this.Ja)};ac.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ja.toString()+")"};function cc(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.pe=c;this.Cg=d;this.nf=e||"";this.bb=Xb.get("host:"+a)||this.host}function dc(a,b){b!==a.bb&&(a.bb=b,"s-"===a.bb.substr(0,2)&&Xb.set("host:"+a.host,a.bb))}
	function ec(a,b,c){E("string"===typeof b,"typeof type must == string");E("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.bb+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.bb+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.bb&&(c.ns=a.pe);var d=[];t(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	cc.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.nf&&(a+="<"+this.nf+">");return a};function fc(){this.Jd=F}fc.prototype.j=function(a){return this.Jd.Q(a)};fc.prototype.toString=function(){return this.Jd.toString()};function H(a,b,c,d){this.type=a;this.Ma=b;this.Za=c;this.qe=d;this.Dd=void 0}function gc(a){return new H(hc,a)}var hc="value";function ic(a,b,c,d){this.ae=b;this.Md=c;this.Dd=d;this.gd=a}ic.prototype.Zb=function(){var a=this.Md.xb();return"value"===this.gd?a.path:a.getParent().path};ic.prototype.ge=function(){return this.gd};ic.prototype.Ub=function(){return this.ae.Ub(this)};ic.prototype.toString=function(){return this.Zb().toString()+":"+this.gd+":"+B(this.Md.Ue())};function jc(a,b,c){this.ae=a;this.error=b;this.path=c}jc.prototype.Zb=function(){return this.path};jc.prototype.ge=function(){return"cancel"};
	jc.prototype.Ub=function(){return this.ae.Ub(this)};jc.prototype.toString=function(){return this.path.toString()+":cancel"};function kc(){}kc.prototype.Xe=function(){return null};kc.prototype.fe=function(){return null};var lc=new kc;function mc(a,b,c){this.Gf=a;this.Na=b;this.yd=c}mc.prototype.Xe=function(a){var b=this.Na.O;if(nc(b,a))return b.j().R(a);b=null!=this.yd?new oc(this.yd,!0,!1):this.Na.w();return this.Gf.rc(a,b)};mc.prototype.fe=function(a,b,c){var d=null!=this.yd?this.yd:pc(this.Na);a=this.Gf.Xd(d,b,1,c,a);return 0===a.length?null:a[0]};function qc(){this.wb=[]}function rc(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Zb();null===c||f.$(c.Zb())||(a.wb.push(c),c=null);null===c&&(c=new sc(f));c.add(e)}c&&a.wb.push(c)}function tc(a,b,c){rc(a,c);uc(a,function(a){return a.$(b)})}function vc(a,b,c){rc(a,c);uc(a,function(a){return a.contains(b)||b.contains(a)})}
	function uc(a,b){for(var c=!0,d=0;d<a.wb.length;d++){var e=a.wb[d];if(e)if(e=e.Zb(),b(e)){for(var e=a.wb[d],f=0;f<e.hd.length;f++){var h=e.hd[f];if(null!==h){e.hd[f]=null;var k=h.Ub();wc&&I("event: "+h.toString());Tb(k)}}a.wb[d]=null}else c=!1}c&&(a.wb=[])}function sc(a){this.ra=a;this.hd=[]}sc.prototype.add=function(a){this.hd.push(a)};sc.prototype.Zb=function(){return this.ra};function oc(a,b,c){this.A=a;this.ea=b;this.Tb=c}function xc(a){return a.ea}function yc(a){return a.Tb}function zc(a,b){return b.e()?a.ea&&!a.Tb:nc(a,J(b))}function nc(a,b){return a.ea&&!a.Tb||a.A.Fa(b)}oc.prototype.j=function(){return this.A};function Ac(a,b){this.Oa=a;this.ca=b?b:Bc}g=Ac.prototype;g.Ra=function(a,b){return new Ac(this.Oa,this.ca.Ra(a,b,this.Oa).Y(null,null,!1,null,null))};g.remove=function(a){return new Ac(this.Oa,this.ca.remove(a,this.Oa).Y(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ca;!c.e();){b=this.Oa(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function Cc(a,b){for(var c,d=a.ca,e=null;!d.e();){c=a.Oa(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ca.e()};g.count=function(){return this.ca.count()};g.Hc=function(){return this.ca.Hc()};g.fc=function(){return this.ca.fc()};g.ia=function(a){return this.ca.ia(a)};
	g.Xb=function(a){return new Dc(this.ca,null,this.Oa,!1,a)};g.Yb=function(a,b){return new Dc(this.ca,a,this.Oa,!1,b)};g.$b=function(a,b){return new Dc(this.ca,a,this.Oa,!0,b)};g.$e=function(a){return new Dc(this.ca,null,this.Oa,!0,a)};function Dc(a,b,c,d,e){this.Hd=e||null;this.le=d;this.Sa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.le?a.left:a.right;else if(0===e){this.Sa.push(a);break}else this.Sa.push(a),a=this.le?a.right:a.left}
	function K(a){if(0===a.Sa.length)return null;var b=a.Sa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.le)for(b=b.left;!b.e();)a.Sa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Sa.push(b),b=b.left;return c}function Ec(a){if(0===a.Sa.length)return null;var b;b=a.Sa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function Fc(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Bc;this.right=null!=e?e:Bc}g=Fc.prototype;
	g.Y=function(a,b,c,d,e){return new Fc(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ia=function(a){return this.left.ia(a)||a(this.key,this.value)||this.right.ia(a)};function Gc(a){return a.left.e()?a:Gc(a.left)}g.Hc=function(){return Gc(this).key};g.fc=function(){return this.right.e()?this.key:this.right.fc()};
	g.Ra=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.Y(null,null,null,e.left.Ra(a,b,c),null):0===d?e.Y(null,b,null,null,null):e.Y(null,null,null,null,e.right.Ra(a,b,c));return Hc(e)};function Ic(a){if(a.left.e())return Bc;a.left.fa()||a.left.left.fa()||(a=Jc(a));a=a.Y(null,null,null,Ic(a.left),null);return Hc(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.fa()||c.left.left.fa()||(c=Jc(c)),c=c.Y(null,null,null,c.left.remove(a,b),null);else{c.left.fa()&&(c=Kc(c));c.right.e()||c.right.fa()||c.right.left.fa()||(c=Lc(c),c.left.left.fa()&&(c=Kc(c),c=Lc(c)));if(0===b(a,c.key)){if(c.right.e())return Bc;d=Gc(c.right);c=c.Y(d.key,d.value,null,null,Ic(c.right))}c=c.Y(null,null,null,null,c.right.remove(a,b))}return Hc(c)};g.fa=function(){return this.color};
	function Hc(a){a.right.fa()&&!a.left.fa()&&(a=Mc(a));a.left.fa()&&a.left.left.fa()&&(a=Kc(a));a.left.fa()&&a.right.fa()&&(a=Lc(a));return a}function Jc(a){a=Lc(a);a.right.left.fa()&&(a=a.Y(null,null,null,null,Kc(a.right)),a=Mc(a),a=Lc(a));return a}function Mc(a){return a.right.Y(null,null,a.color,a.Y(null,null,!0,null,a.right.left),null)}function Kc(a){return a.left.Y(null,null,a.color,null,a.Y(null,null,!0,a.left.right,null))}
	function Lc(a){return a.Y(null,null,!a.color,a.left.Y(null,null,!a.left.color,null,null),a.right.Y(null,null,!a.right.color,null,null))}function Nc(){}g=Nc.prototype;g.Y=function(){return this};g.Ra=function(a,b){return new Fc(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ia=function(){return!1};g.Hc=function(){return null};g.fc=function(){return null};g.fa=function(){return!1};var Bc=new Nc;var Oc=function(){var a=1;return function(){return a++}}(),E=Lb,Pc=Mb;
	function Qc(a){try{var b;xb();for(var c=vb,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var m=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==m)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=m&&d.push(k<<6&192|m))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Oa(d,c,c+8192));b=a}return b}catch(l){I("base64Decode failed: ",
	l)}return null}function Rc(a){var b=Nb(a);a=new zb;a.update(b);var b=[],c=8*a.Pd;56>a.ac?a.update(a.zd,56-a.ac):a.update(a.zd,a.Ya-(a.ac-56));for(var d=a.Ya-1;56<=d;d--)a.Wd[d]=c&255,c/=256;Ab(a,a.Wd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.N[d]>>e&255,++c;return wb(b)}function Sc(a){for(var b="",c=0;c<arguments.length;c++)b=ea(arguments[c])?b+Sc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var wc=null,Tc=!0;
	function Uc(a,b){Lb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?wc=r(console.log,console):"object"===typeof console.log&&(wc=function(a){console.log(a)})),b&&Yb.set("logging_enabled",!0)):ga(a)?wc=a:(wc=null,Yb.remove("logging_enabled"))}function I(a){!0===Tc&&(Tc=!1,null===wc&&!0===Yb.get("logging_enabled")&&Uc(!0));if(wc){var b=Sc.apply(null,arguments);wc(b)}}
	function Vc(a){return function(){I(a,arguments)}}function Wc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Sc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Xc(a){var b=Sc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function L(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Sc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Yc(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(q(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var m=h[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(l){}f+="/"+m}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Xc(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||Xc("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&L("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{kc:new cc(b,d,c,"ws"===e||"wss"===e),path:new M(f)}}function Zc(a){return fa(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function $c(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function ad(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=bd(a),d=bd(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function cd(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function dd(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=dd(a[b[d]]);return c+"}"}function ed(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function fd(a,b){if(da(a))for(var c=0;c<a.length;++c)b(c,a[c]);else t(a,b)}
	function gd(a){E(!Zc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var hd=/^-?\d{1,10}$/;function bd(a){return hd.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function Tb(a){try{a()}catch(b){setTimeout(function(){L("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function id(a,b,c){Object.defineProperty(a,b,{get:c})};function jd(a){var b={},c={},d={},e="";try{var f=a.split("."),b=Kb(Qc(f[0])||""),c=Kb(Qc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{Fg:b,Me:c,data:d,xg:e}}function kd(a){a=jd(a);var b=a.Me;return!!a.xg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function ld(a){a=jd(a).Me;return"object"===typeof a&&!0===A(a,"admin")};function md(a,b,c){this.type=nd;this.source=a;this.path=b;this.children=c}md.prototype.Nc=function(a){if(this.path.e())return a=this.children.subtree(new M(a)),a.e()?null:a.value?new ac(this.source,C,a.value):new md(this.source,C,a);E(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new md(this.source,D(this.path),this.children)};md.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function od(a){this.g=a}g=od.prototype;g.F=function(a,b,c,d,e,f){E(a.zc(this.g),"A node must be indexed if only a child is updated");e=a.R(b);if(e.Q(d).$(c.Q(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Fa(b)?pd(f,new H("child_removed",e,b)):E(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?pd(f,new H("child_added",c,b)):pd(f,new H("child_changed",c,b,e)));return a.J()&&c.e()?a:a.U(b,c).ob(this.g)};
	g.za=function(a,b,c){null!=c&&(a.J()||a.P(N,function(a,e){b.Fa(a)||pd(c,new H("child_removed",e,a))}),b.J()||b.P(N,function(b,e){if(a.Fa(b)){var f=a.R(b);f.$(e)||pd(c,new H("child_changed",e,b,f))}else pd(c,new H("child_added",e,b))}));return b.ob(this.g)};g.ga=function(a,b){return a.e()?F:a.ga(b)};g.Qa=function(){return!1};g.Vb=function(){return this};function qd(a){this.he=new od(a.g);this.g=a.g;var b;a.la?(b=rd(a),b=a.g.Fc(sd(a),b)):b=a.g.Ic();this.Uc=b;a.oa?(b=td(a),a=a.g.Fc(ud(a),b)):a=a.g.Gc();this.wc=a}g=qd.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.wc)};g.F=function(a,b,c,d,e,f){this.matches(new O(b,c))||(c=F);return this.he.F(a,b,c,d,e,f)};
	g.za=function(a,b,c){b.J()&&(b=F);var d=b.ob(this.g),d=d.ga(F),e=this;b.P(N,function(a,b){e.matches(new O(a,b))||(d=d.U(a,F))});return this.he.za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.he};function vd(){this.hb={}}
	function pd(a,b){var c=b.type,d=b.Za;E("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");E(".priority"!==d,"Only non-priority child changes can be tracked.");var e=A(a.hb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.hb[d]=new H("child_changed",b.Ma,d,e.Ma);else if("child_removed"==c&&"child_added"==f)delete a.hb[d];else if("child_removed"==c&&"child_changed"==f)a.hb[d]=new H("child_removed",e.qe,d);else if("child_changed"==c&&
	"child_added"==f)a.hb[d]=new H("child_added",b.Ma,d);else if("child_changed"==c&&"child_changed"==f)a.hb[d]=new H("child_changed",b.Ma,d,e.qe);else throw Pc("Illegal combination of changes: "+b+" occurred after "+e);}else a.hb[d]=b};function wd(a,b){this.Sd=a;this.Mf=b}function xd(a){this.V=a}
	xd.prototype.gb=function(a,b,c,d){var e=new vd,f;if(b.type===bc)b.source.ee?c=yd(this,a,b.path,b.Ja,c,d,e):(E(b.source.We,"Unknown source."),f=b.source.Ee||yc(a.w())&&!b.path.e(),c=zd(this,a,b.path,b.Ja,c,d,f,e));else if(b.type===nd)b.source.ee?c=Ad(this,a,b.path,b.children,c,d,e):(E(b.source.We,"Unknown source."),f=b.source.Ee||yc(a.w()),c=Bd(this,a,b.path,b.children,c,d,f,e));else if(b.type===Dd)if(b.Id)if(b=b.path,null!=c.mc(b))c=a;else{f=new mc(c,a,d);d=a.O.j();if(b.e()||".priority"===J(b))xc(a.w())?
	b=c.Ba(pc(a)):(b=a.w().j(),E(b instanceof P,"serverChildren would be complete if leaf node"),b=c.sc(b)),b=this.V.za(d,b,e);else{var h=J(b),k=c.rc(h,a.w());null==k&&nc(a.w(),h)&&(k=d.R(h));b=null!=k?this.V.F(d,h,k,D(b),f,e):a.O.j().Fa(h)?this.V.F(d,h,F,D(b),f,e):d;b.e()&&xc(a.w())&&(d=c.Ba(pc(a)),d.J()&&(b=this.V.za(b,d,e)))}d=xc(a.w())||null!=c.mc(C);c=Ed(a,b,d,this.V.Qa())}else c=Fd(this,a,b.path,b.Pb,c,d,e);else if(b.type===$b)d=b.path,b=a.w(),f=b.j(),h=b.ea||d.e(),c=Gd(this,new Hd(a.O,new oc(f,
	h,b.Tb)),d,c,lc,e);else throw Pc("Unknown operation type: "+b.type);e=pa(e.hb);d=c;b=d.O;b.ea&&(f=b.j().J()||b.j().e(),h=Id(a),(0<e.length||!a.O.ea||f&&!b.j().$(h)||!b.j().C().$(h.C()))&&e.push(gc(Id(d))));return new wd(c,e)};
	function Gd(a,b,c,d,e,f){var h=b.O;if(null!=d.mc(c))return b;var k;if(c.e())E(xc(b.w()),"If change path is empty, we must have complete server data"),yc(b.w())?(e=pc(b),d=d.sc(e instanceof P?e:F)):d=d.Ba(pc(b)),f=a.V.za(b.O.j(),d,f);else{var m=J(c);if(".priority"==m)E(1==Jd(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.$c(c,f,k),f=null!=d?a.V.ga(f,d):h.j();else{var l=D(c);nc(h,m)?(k=b.w().j(),d=d.$c(c,h.j(),k),d=null!=d?h.j().R(m).F(l,d):h.j().R(m)):d=d.rc(m,
	b.w());f=null!=d?a.V.F(h.j(),m,d,l,e,f):h.j()}}return Ed(b,f,h.ea||c.e(),a.V.Qa())}function zd(a,b,c,d,e,f,h,k){var m=b.w();h=h?a.V:a.V.Vb();if(c.e())d=h.za(m.j(),d,null);else if(h.Qa()&&!m.Tb)d=m.j().F(c,d),d=h.za(m.j(),d,null);else{var l=J(c);if(!zc(m,c)&&1<Jd(c))return b;var u=D(c);d=m.j().R(l).F(u,d);d=".priority"==l?h.ga(m.j(),d):h.F(m.j(),l,d,u,lc,null)}m=m.ea||c.e();b=new Hd(b.O,new oc(d,m,h.Qa()));return Gd(a,b,c,e,new mc(e,b,f),k)}
	function yd(a,b,c,d,e,f,h){var k=b.O;e=new mc(e,b,f);if(c.e())h=a.V.za(b.O.j(),d,h),a=Ed(b,h,!0,a.V.Qa());else if(f=J(c),".priority"===f)h=a.V.ga(b.O.j(),d),a=Ed(b,h,k.ea,k.Tb);else{c=D(c);var m=k.j().R(f);if(!c.e()){var l=e.Xe(f);d=null!=l?".priority"===Kd(c)&&l.Q(c.parent()).e()?l:l.F(c,d):F}m.$(d)?a=b:(h=a.V.F(k.j(),f,d,c,e,h),a=Ed(b,h,k.ea,a.V.Qa()))}return a}
	function Ad(a,b,c,d,e,f,h){var k=b;Ld(d,function(d,l){var u=c.m(d);nc(b.O,J(u))&&(k=yd(a,k,u,l,e,f,h))});Ld(d,function(d,l){var u=c.m(d);nc(b.O,J(u))||(k=yd(a,k,u,l,e,f,h))});return k}function Md(a,b){Ld(b,function(b,d){a=a.F(b,d)});return a}
	function Bd(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!xc(b.w()))return b;var m=b;c=c.e()?d:Nd(Q,c,d);var l=b.w().j();c.children.ia(function(c,d){if(l.Fa(c)){var G=b.w().j().R(c),G=Md(G,d);m=zd(a,m,new M(c),G,e,f,h,k)}});c.children.ia(function(c,d){var G=!nc(b.w(),c)&&null==d.value;l.Fa(c)||G||(G=b.w().j().R(c),G=Md(G,d),m=zd(a,m,new M(c),G,e,f,h,k))});return m}
	function Fd(a,b,c,d,e,f,h){if(null!=e.mc(c))return b;var k=yc(b.w()),m=b.w();if(null!=d.value){if(c.e()&&m.ea||zc(m,c))return zd(a,b,c,m.j().Q(c),e,f,k,h);if(c.e()){var l=Q;m.j().P(Od,function(a,b){l=l.set(new M(a),b)});return Bd(a,b,c,l,e,f,k,h)}return b}l=Q;Ld(d,function(a){var b=c.m(a);zc(m,b)&&(l=l.set(a,m.j().Q(b)))});return Bd(a,b,c,l,e,f,k,h)};var Pd=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);E(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);E(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function M(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Z=0}else this.o=a,this.Z=b}function R(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return R(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function Qd(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=ad(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Z>=a.o.length?null:a.o[a.Z]}function Jd(a){return a.o.length-a.Z}function D(a){var b=a.Z;b<a.o.length&&b++;return new M(a.o,b)}function Kd(a){return a.Z<a.o.length?a.o[a.o.length-1]:null}g=M.prototype;
	g.toString=function(){for(var a="",b=this.Z;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Z+(a||0))};g.parent=function(){if(this.Z>=this.o.length)return null;for(var a=[],b=this.Z;b<this.o.length-1;b++)a.push(this.o[b]);return new M(a,0)};
	g.m=function(a){for(var b=[],c=this.Z;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof M)for(c=a.Z;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new M(b,0)};g.e=function(){return this.Z>=this.o.length};g.$=function(a){if(Jd(this)!==Jd(a))return!1;for(var b=this.Z,c=a.Z;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Z,c=a.Z;if(Jd(this)>Jd(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new M("");function Rd(a,b){this.Ta=a.slice();this.Ka=Math.max(1,this.Ta.length);this.Te=b;for(var c=0;c<this.Ta.length;c++)this.Ka+=Ob(this.Ta[c]);Sd(this)}Rd.prototype.push=function(a){0<this.Ta.length&&(this.Ka+=1);this.Ta.push(a);this.Ka+=Ob(a);Sd(this)};Rd.prototype.pop=function(){var a=this.Ta.pop();this.Ka-=Ob(a);0<this.Ta.length&&--this.Ka};
	function Sd(a){if(768<a.Ka)throw Error(a.Te+"has a key path longer than 768 bytes ("+a.Ka+").");if(32<a.Ta.length)throw Error(a.Te+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Td(a));}function Td(a){return 0==a.Ta.length?"":"in property '"+a.Ta.join(".")+"'"};var Ud=/[\[\].#$\/\u0000-\u001F\u007F]/,Vd=/[\[\].#$\u0000-\u001F\u007F]/;function Wd(a){return q(a)&&0!==a.length&&!Ud.test(a)}function Xd(a){return null===a||q(a)||fa(a)&&!Zc(a)||ha(a)&&Hb(a,".sv")}function Yd(a,b,c,d){d&&!p(b)||Zd(Bb(a,1,d),b,c)}
	function Zd(a,b,c){c instanceof M&&(c=new Rd(c,a));if(!p(b))throw Error(a+"contains undefined "+Td(c));if(ga(b))throw Error(a+"contains a function "+Td(c)+" with contents: "+b.toString());if(Zc(b))throw Error(a+"contains "+b.toString()+" "+Td(c));if(q(b)&&b.length>10485760/3&&10485760<Ob(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Td(c)+" ('"+b.substring(0,50)+"...')");if(ha(b)){var d=!1,e=!1;Ib(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!Wd(b)))throw Error(a+" contains an invalid key ("+b+") "+Td(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);Zd(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Td(c)+" in addition to actual children.");}}
	function $d(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!Wd(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Qd);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function ae(a,b,c){var d=Bb(a,1,!1);if(!ha(b)||da(b))throw Error(d+" must be an object containing the children to replace.");var e=[];Ib(b,function(a,b){var k=new M(a);Zd(d,b,c.m(k));if(".priority"===Kd(k)&&!Xd(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});$d(d,e)}
	function be(a,b,c){if(Zc(c))throw Error(Bb(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Xd(c))throw Error(Bb(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function ce(a,b,c){if(!c||p(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(Bb(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function de(a,b){if(p(b)&&!Wd(b))throw Error(Bb(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function ee(a,b){if(!q(b)||0===b.length||Vd.test(b))throw Error(Bb(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function fe(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function ge(a,b){var c=b.path.toString(),d;!(d=!q(b.kc.host)||0===b.kc.host.length||!Wd(b.kc.pe))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(q(c)&&0!==c.length&&!Vd.test(c)));if(d)throw Error(Bb(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function he(){this.children={};this.ad=0;this.value=null}function ie(a,b,c){this.ud=a?a:"";this.Ha=b?b:null;this.A=c?c:new he}function je(a,b){for(var c=b instanceof M?b:new M(b),d=a,e;null!==(e=J(c));)d=new ie(e,d,A(d.A.children,e)||new he),c=D(c);return d}g=ie.prototype;g.Ea=function(){return this.A.value};function ke(a,b){E("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;le(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.ad=0;le(this)};
	g.kd=function(){return 0<this.A.ad};g.e=function(){return null===this.Ea()&&!this.kd()};g.P=function(a){var b=this;t(this.A.children,function(c,d){a(new ie(d,b,c))})};function me(a,b,c,d){c&&!d&&b(a);a.P(function(a){me(a,b,!0,d)});c&&d&&b(a)}function ne(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new M(null===this.Ha?this.ud:this.Ha.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Ha};
	function le(a){if(null!==a.Ha){var b=a.Ha,c=a.ud,d=a.e(),e=Hb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.ad--,le(b)):d||e||(b.A.children[c]=a.A,b.A.ad++,le(b))}};function oe(a){E(da(a)&&0<a.length,"Requires a non-empty array");this.Kf=a;this.Ec={}}oe.prototype.Ge=function(a,b){var c;c=this.Ec[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].Ke.apply(c[d].Pa,Array.prototype.slice.call(arguments,1))};oe.prototype.hc=function(a,b,c){pe(this,a);this.Ec[a]=this.Ec[a]||[];this.Ec[a].push({Ke:b,Pa:c});(a=this.Ye(a))&&b.apply(c,a)};
	oe.prototype.Jc=function(a,b,c){pe(this,a);a=this.Ec[a]||[];for(var d=0;d<a.length;d++)if(a[d].Ke===b&&(!c||c===a[d].Pa)){a.splice(d,1);break}};function pe(a,b){E(La(a.Kf,function(a){return a===b}),"Unknown event: "+b)};function qe(a,b){this.value=a;this.children=b||re}var re=new Ac(function(a,b){return a===b?0:a<b?-1:1});function se(a){var b=Q;t(a,function(a,d){b=b.set(new M(d),a)});return b}g=qe.prototype;g.e=function(){return null===this.value&&this.children.e()};function te(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=te(a,D(b),c),null!=b?{path:(new M(d)).m(b.path),value:b.value}:null):null}
	function ue(a,b){return te(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new qe(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Ra(c,d);return new qe(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new qe(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Ra(b,a),null===this.value&&b.e()?Q:new qe(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
	function Nd(a,b,c){if(b.e())return c;var d=J(b);b=Nd(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Ra(d,b);return new qe(a.value,d)}function ve(a,b){return we(a,C,b)}function we(a,b,c){var d={};a.children.ia(function(a,f){d[a]=we(f,b.m(a),c)});return c(b,a.value,d)}function xe(a,b,c){return ye(a,b,C,c)}function ye(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?ye(a,D(b),c.m(e),d):null}
	function ze(a,b,c){Ae(a,b,C,c)}function Ae(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?Ae(a,D(b),c.m(e),d):Q}function Ld(a,b){Be(a,C,b)}function Be(a,b,c){a.children.ia(function(a,e){Be(e,b.m(a),c)});a.value&&c(b,a.value)}function Ce(a,b){a.children.ia(function(a,d){d.value&&b(a,d.value)})}var Q=new qe(null);qe.prototype.toString=function(){var a={};Ld(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function De(a,b,c){this.type=Dd;this.source=Ee;this.path=a;this.Pb=b;this.Id=c}De.prototype.Nc=function(a){if(this.path.e()){if(null!=this.Pb.value)return E(this.Pb.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Pb.subtree(new M(a));return new De(C,a,this.Id)}E(J(this.path)===a,"operationForChild called for unrelated child.");return new De(D(this.path),this.Pb,this.Id)};
	De.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Pb+")"};var bc=0,nd=1,Dd=2,$b=3;function Fe(a,b,c,d){this.ee=a;this.We=b;this.Ib=c;this.Ee=d;E(!d||b,"Tagged queries must be from server.")}var Ee=new Fe(!0,!1,null,!1),Ge=new Fe(!1,!0,null,!1);Fe.prototype.toString=function(){return this.ee?"user":this.Ee?"server(queryID="+this.Ib+")":"server"};function He(){oe.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Nb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Nb&&(c.Nb=b,c.Ge("visible",b))},!1)}}ka(He,oe);He.prototype.Ye=function(a){E("visible"===a,"Unknown event type: "+a);return[this.Nb]};ba(He);function Ie(){this.set={}}g=Ie.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return Hb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return ua(this.set)};g.count=function(){return na(this.set)};function Je(a,b){t(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];t(this.set,function(b,c){a.push(c)});return a};function Ke(a,b){return a&&"object"===typeof a?(E(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Le(a,b){var c=new Me;Ne(a,new M(""),function(a,e){Oe(c,a,Pe(e,b))});return c}function Pe(a,b){var c=a.C().H(),c=Ke(c,b),d;if(a.J()){var e=Ke(a.Ea(),b);return e!==a.Ea()||c!==a.C().H()?new Qe(e,S(c)):a}d=a;c!==a.C().H()&&(d=d.ga(new Qe(c)));a.P(N,function(a,c){var e=Pe(c,b);e!==c&&(d=d.U(a,e))});return d};function Re(){oe.call(this,["online"]);this.ic=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!Pb()){var a=this;window.addEventListener("online",function(){a.ic||(a.ic=!0,a.Ge("online",!0))},!1);window.addEventListener("offline",function(){a.ic&&(a.ic=!1,a.Ge("online",!1))},!1)}}ka(Re,oe);Re.prototype.Ye=function(a){E("online"===a,"Unknown event type: "+a);return[this.ic]};ba(Re);function Se(){}var Te={};function Ue(a){return r(a.compare,a)}Se.prototype.nd=function(a,b){return 0!==this.compare(new O("[MIN_NAME]",a),new O("[MIN_NAME]",b))};Se.prototype.Ic=function(){return Ve};function We(a){E(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.cc=a}ka(We,Se);g=We.prototype;g.yc=function(a){return!a.Q(this.cc).e()};g.compare=function(a,b){var c=a.S.Q(this.cc),d=b.S.Q(this.cc),c=c.tc(d);return 0===c?ad(a.name,b.name):c};
	g.Fc=function(a,b){var c=S(a),c=F.F(this.cc,c);return new O(b,c)};g.Gc=function(){var a=F.F(this.cc,Xe);return new O("[MAX_NAME]",a)};g.toString=function(){return this.cc.slice().join("/")};function Ye(){}ka(Ye,Se);g=Ye.prototype;g.compare=function(a,b){var c=a.S.C(),d=b.S.C(),c=c.tc(d);return 0===c?ad(a.name,b.name):c};g.yc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().$(b.C())};g.Ic=function(){return Ve};g.Gc=function(){return new O("[MAX_NAME]",new Qe("[PRIORITY-POST]",Xe))};
	g.Fc=function(a,b){var c=S(a);return new O(b,new Qe("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new Ye;function Ze(){}ka(Ze,Se);g=Ze.prototype;g.compare=function(a,b){return ad(a.name,b.name)};g.yc=function(){throw Pc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Ic=function(){return Ve};g.Gc=function(){return new O("[MAX_NAME]",F)};g.Fc=function(a){E(q(a),"KeyIndex indexValue must always be a string.");return new O(a,F)};g.toString=function(){return".key"};
	var Od=new Ze;function $e(){}ka($e,Se);g=$e.prototype;g.compare=function(a,b){var c=a.S.tc(b.S);return 0===c?ad(a.name,b.name):c};g.yc=function(){return!0};g.nd=function(a,b){return!a.$(b)};g.Ic=function(){return Ve};g.Gc=function(){return af};g.Fc=function(a,b){var c=S(a);return new O(b,c)};g.toString=function(){return".value"};var bf=new $e;function cf(a,b){return ad(a.name,b.name)}function df(a,b){return ad(a,b)};function ef(a,b){this.od=a;this.dc=b}ef.prototype.get=function(a){var b=A(this.od,a);if(!b)throw Error("No index defined for "+a);return b===Te?null:b};function ff(a,b,c){var d=la(a.od,function(d,f){var h=A(a.dc,f);E(h,"Missing index implementation for "+f);if(d===Te){if(h.yc(b.S)){for(var k=[],m=c.Xb(gf),l=K(m);l;)l.name!=b.name&&k.push(l),l=K(m);k.push(b);return hf(k,Ue(h))}return Te}h=c.get(b.name);k=d;h&&(k=k.remove(new O(b.name,h)));return k.Ra(b,b.S)});return new ef(d,a.dc)}
	function jf(a,b,c){var d=la(a.od,function(a){if(a===Te)return a;var d=c.get(b.name);return d?a.remove(new O(b.name,d)):a});return new ef(d,a.dc)}var kf=new ef({".priority":Te},{".priority":N});function O(a,b){this.name=a;this.S=b}function gf(a,b){return new O(a,b)};function lf(a){this.ta=new qd(a);this.g=a.g;E(a.ya,"Only valid if limit has been set");this.pa=a.pa;this.Jb=!mf(a)}g=lf.prototype;g.F=function(a,b,c,d,e,f){this.ta.matches(new O(b,c))||(c=F);return a.R(b).$(c)?a:a.Fb()<this.pa?this.ta.Vb().F(a,b,c,d,e,f):nf(this,a,b,c,e,f)};
	g.za=function(a,b,c){var d;if(b.J()||b.e())d=F.ob(this.g);else if(2*this.pa<b.Fb()&&b.zc(this.g)){d=F.ob(this.g);b=this.Jb?b.$b(this.ta.wc,this.g):b.Yb(this.ta.Uc,this.g);for(var e=0;0<b.Sa.length&&e<this.pa;){var f=K(b),h;if(h=this.Jb?0>=this.g.compare(this.ta.Uc,f):0>=this.g.compare(f,this.ta.wc))d=d.U(f.name,f.S),e++;else break}}else{d=b.ob(this.g);d=d.ga(F);var k,m,l;if(this.Jb){b=d.$e(this.g);k=this.ta.wc;m=this.ta.Uc;var u=Ue(this.g);l=function(a,b){return u(b,a)}}else b=d.Xb(this.g),k=this.ta.Uc,
	m=this.ta.wc,l=Ue(this.g);for(var e=0,z=!1;0<b.Sa.length;)f=K(b),!z&&0>=l(k,f)&&(z=!0),(h=z&&e<this.pa&&0>=l(f,m))?e++:d=d.U(f.name,F)}return this.ta.Vb().za(a,d,c)};g.ga=function(a){return a};g.Qa=function(){return!0};g.Vb=function(){return this.ta.Vb()};
	function nf(a,b,c,d,e,f){var h;if(a.Jb){var k=Ue(a.g);h=function(a,b){return k(b,a)}}else h=Ue(a.g);E(b.Fb()==a.pa,"");var m=new O(c,d),l=a.Jb?of(b,a.g):pf(b,a.g),u=a.ta.matches(m);if(b.Fa(c)){for(var z=b.R(c),l=e.fe(a.g,l,a.Jb);null!=l&&(l.name==c||b.Fa(l.name));)l=e.fe(a.g,l,a.Jb);e=null==l?1:h(l,m);if(u&&!d.e()&&0<=e)return null!=f&&pd(f,new H("child_changed",d,c,z)),b.U(c,d);null!=f&&pd(f,new H("child_removed",z,c));b=b.U(c,F);return null!=l&&a.ta.matches(l)?(null!=f&&pd(f,new H("child_added",
	l.S,l.name)),b.U(l.name,l.S)):b}return d.e()?b:u&&0<=h(l,m)?(null!=f&&(pd(f,new H("child_removed",l.S,l.name)),pd(f,new H("child_added",d,c))),b.U(c,d).U(l.name,F)):b};function qf(a){this.W=a;this.g=a.n.g}function rf(a,b,c,d){var e=[],f=[];Ga(b,function(b){"child_changed"===b.type&&a.g.nd(b.qe,b.Ma)&&f.push(new H("child_moved",b.Ma,b.Za))});sf(a,e,"child_removed",b,d,c);sf(a,e,"child_added",b,d,c);sf(a,e,"child_moved",f,d,c);sf(a,e,"child_changed",b,d,c);sf(a,e,hc,b,d,c);return e}function sf(a,b,c,d,e,f){d=Ha(d,function(a){return a.type===c});Pa(d,r(a.Of,a));Ga(d,function(c){var d=tf(a,c,f);Ga(e,function(e){e.tf(c.type)&&b.push(e.createEvent(d,a.W))})})}
	function tf(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ze(b.Za,b.Ma,a.g));return b}qf.prototype.Of=function(a,b){if(null==a.Za||null==b.Za)throw Pc("Should only compare child_ events.");return this.g.compare(new O(a.Za,a.Ma),new O(b.Za,b.Ma))};function uf(){this.Sb=this.oa=this.Lb=this.la=this.ya=!1;this.pa=0;this.oc="";this.ec=null;this.Ab="";this.bc=null;this.yb="";this.g=N}var vf=new uf;function mf(a){return""===a.oc?a.la:"l"===a.oc}function sd(a){E(a.la,"Only valid if start has been set");return a.ec}function rd(a){E(a.la,"Only valid if start has been set");return a.Lb?a.Ab:"[MIN_NAME]"}function ud(a){E(a.oa,"Only valid if end has been set");return a.bc}
	function td(a){E(a.oa,"Only valid if end has been set");return a.Sb?a.yb:"[MAX_NAME]"}function wf(a){var b=new uf;b.ya=a.ya;b.pa=a.pa;b.la=a.la;b.ec=a.ec;b.Lb=a.Lb;b.Ab=a.Ab;b.oa=a.oa;b.bc=a.bc;b.Sb=a.Sb;b.yb=a.yb;b.g=a.g;return b}g=uf.prototype;g.ne=function(a){var b=wf(this);b.ya=!0;b.pa=a;b.oc="l";return b};g.oe=function(a){var b=wf(this);b.ya=!0;b.pa=a;b.oc="r";return b};g.Nd=function(a,b){var c=wf(this);c.la=!0;p(a)||(a=null);c.ec=a;null!=b?(c.Lb=!0,c.Ab=b):(c.Lb=!1,c.Ab="");return c};
	g.fd=function(a,b){var c=wf(this);c.oa=!0;p(a)||(a=null);c.bc=a;p(b)?(c.Sb=!0,c.yb=b):(c.Hg=!1,c.yb="");return c};function xf(a,b){var c=wf(a);c.g=b;return c}function yf(a){var b={};a.la&&(b.sp=a.ec,a.Lb&&(b.sn=a.Ab));a.oa&&(b.ep=a.bc,a.Sb&&(b.en=a.yb));if(a.ya){b.l=a.pa;var c=a.oc;""===c&&(c=mf(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function T(a){return!(a.la||a.oa||a.ya)}function zf(a){return T(a)&&a.g==N}
	function Af(a){var b={};if(zf(a))return b;var c;a.g===N?c="$priority":a.g===bf?c="$value":a.g===Od?c="$key":(E(a.g instanceof We,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.la&&(b.startAt=B(a.ec),a.Lb&&(b.startAt+=","+B(a.Ab)));a.oa&&(b.endAt=B(a.bc),a.Sb&&(b.endAt+=","+B(a.yb)));a.ya&&(mf(a)?b.limitToFirst=a.pa:b.limitToLast=a.pa);return b}g.toString=function(){return B(yf(this))};function Qe(a,b){this.B=a;E(p(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.ba=b||F;Bf(this.ba);this.Eb=null}var Cf=["object","boolean","number","string"];g=Qe.prototype;g.J=function(){return!0};g.C=function(){return this.ba};g.ga=function(a){return new Qe(this.B,a)};g.R=function(a){return".priority"===a?this.ba:F};g.Q=function(a){return a.e()?this:".priority"===J(a)?this.ba:F};g.Fa=function(){return!1};g.Ze=function(){return null};
	g.U=function(a,b){return".priority"===a?this.ga(b):b.e()&&".priority"!==a?this:F.U(a,b).ga(this.ba)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;E(".priority"!==c||1===Jd(a),".priority must be the last token in a path");return this.U(c,F.F(D(a),b))};g.e=function(){return!1};g.Fb=function(){return 0};g.P=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ea(),".priority":this.C().H()}:this.Ea()};
	g.hash=function(){if(null===this.Eb){var a="";this.ba.e()||(a+="priority:"+Df(this.ba.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+gd(this.B):a+this.B;this.Eb=Rc(a)}return this.Eb};g.Ea=function(){return this.B};g.tc=function(a){if(a===F)return 1;if(a instanceof P)return-1;E(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Fa(Cf,b),e=Fa(Cf,c);E(0<=d,"Unknown leaf type: "+b);E(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.ob=function(){return this};g.zc=function(){return!0};g.$=function(a){return a===this?!0:a.J()?this.B===a.B&&this.ba.$(a.ba):!1};g.toString=function(){return B(this.H(!0))};function P(a,b,c){this.k=a;(this.ba=b)&&Bf(this.ba);a.e()&&E(!this.ba||this.ba.e(),"An empty node cannot have a priority");this.zb=c;this.Eb=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.ba||F};g.ga=function(a){return this.k.e()?this:new P(this.k,a,this.zb)};g.R=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?F:a};g.Q=function(a){var b=J(a);return null===b?this:this.R(b).Q(D(a))};g.Fa=function(a){return null!==this.k.get(a)};
	g.U=function(a,b){E(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.ga(b);var c=new O(a,b),d,e;b.e()?(d=this.k.remove(a),c=jf(this.zb,c,this.k)):(d=this.k.Ra(a,b),c=ff(this.zb,c,this.k));e=d.e()?F:this.ba;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;E(".priority"!==J(a)||1===Jd(a),".priority must be the last token in a path");var d=this.R(c).F(D(a),b);return this.U(c,d)};g.e=function(){return this.k.e()};g.Fb=function(){return this.k.count()};
	var Ef=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.P(N,function(f,h){b[f]=h.H(a);c++;e&&Ef.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Eb){var a="";this.C().e()||(a+="priority:"+Df(this.C().H())+":");this.P(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Eb=""===a?"":Rc(a)}return this.Eb};
	g.Ze=function(a,b,c){return(c=Ff(this,c))?(a=Cc(c,new O(a,b)))?a.name:null:Cc(this.k,a)};function of(a,b){var c;c=(c=Ff(a,b))?(c=c.Hc())&&c.name:a.k.Hc();return c?new O(c,a.k.get(c)):null}function pf(a,b){var c;c=(c=Ff(a,b))?(c=c.fc())&&c.name:a.k.fc();return c?new O(c,a.k.get(c)):null}g.P=function(a,b){var c=Ff(this,a);return c?c.ia(function(a){return b(a.name,a.S)}):this.k.ia(b)};g.Xb=function(a){return this.Yb(a.Ic(),a)};
	g.Yb=function(a,b){var c=Ff(this,b);if(c)return c.Yb(a,function(a){return a});for(var c=this.k.Yb(a.name,gf),d=Ec(c);null!=d&&0>b.compare(d,a);)K(c),d=Ec(c);return c};g.$e=function(a){return this.$b(a.Gc(),a)};g.$b=function(a,b){var c=Ff(this,b);if(c)return c.$b(a,function(a){return a});for(var c=this.k.$b(a.name,gf),d=Ec(c);null!=d&&0<b.compare(d,a);)K(c),d=Ec(c);return c};g.tc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===Xe?-1:0};
	g.ob=function(a){if(a===Od||ra(this.zb.dc,a.toString()))return this;var b=this.zb,c=this.k;E(a!==Od,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Xb(gf),f=K(c);f;)e=e||a.yc(f.S),d.push(f),f=K(c);d=e?hf(d,Ue(a)):Te;e=a.toString();c=va(b.dc);c[e]=a;a=va(b.od);a[e]=d;return new P(this.k,this.ba,new ef(a,c))};g.zc=function(a){return a===Od||ra(this.zb.dc,a.toString())};
	g.$=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().$(a.C())&&this.k.count()===a.k.count()){var b=this.Xb(N);a=a.Xb(N);for(var c=K(b),d=K(a);c&&d;){if(c.name!==d.name||!c.S.$(d.S))return!1;c=K(b);d=K(a)}return null===c&&null===d}return!1};function Ff(a,b){return b===Od?null:a.zb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function S(a,b){if(null===a)return F;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);E(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new Qe(a,S(c));if(a instanceof Array){var d=F,e=a;t(e,function(a,b){if(Hb(e,b)&&"."!==b.substring(0,1)){var c=S(a);if(c.J()||!c.e())d=
	d.U(b,c)}});return d.ga(S(c))}var f=[],h=!1,k=a;Ib(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=S(k[a]);b.e()||(h=h||!b.C().e(),f.push(new O(a,b)))}});if(0==f.length)return F;var m=hf(f,cf,function(a){return a.name},df);if(h){var l=hf(f,Ue(N));return new P(m,S(c),new ef({".priority":l},{".priority":N}))}return new P(m,S(c),kf)}var Gf=Math.log(2);
	function Hf(a){this.count=parseInt(Math.log(a+1)/Gf,10);this.Re=this.count-1;this.Lf=a+1&parseInt(Array(this.count+1).join("1"),2)}function If(a){var b=!(a.Lf&1<<a.Re);a.Re--;return b}
	function hf(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var l=a[b],u=c?c(l):l;return new Fc(u,l.S,!1,null,null)}var l=parseInt(f/2,10)+b,f=e(b,l),z=e(l+1,d),l=a[l],u=c?c(l):l;return new Fc(u,l.S,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],G=c?c(k):k,z=new Fc(G,k.S,h,null,z);f?f.left=z:l=z;f=z}for(var f=null,l=null,u=a.length,z=0;z<b.count;++z){var G=If(b),Cd=Math.pow(2,b.count-(z+1));G?d(Cd,!1):(d(Cd,!1),d(Cd,!0))}return l}(new Hf(a.length));
	return null!==f?new Ac(d||b,f):new Ac(d||b)}function Df(a){return"number"===typeof a?"number:"+gd(a):"string:"+a}function Bf(a){if(a.J()){var b=a.H();E("string"===typeof b||"number"===typeof b||"object"===typeof b&&Hb(b,".sv"),"Priority must be a string or number.")}else E(a===Xe||a.e(),"priority of unexpected type.");E(a===Xe||a.C().e(),"Priority nodes can't have a priority of their own.")}var F=new P(new Ac(df),null,kf);function Jf(){P.call(this,new Ac(df),F,kf)}ka(Jf,P);g=Jf.prototype;
	g.tc=function(a){return a===this?0:1};g.$=function(a){return a===this};g.C=function(){return this};g.R=function(){return F};g.e=function(){return!1};var Xe=new Jf,Ve=new O("[MIN_NAME]",F),af=new O("[MAX_NAME]",Xe);function Hd(a,b){this.O=a;this.Ld=b}function Ed(a,b,c,d){return new Hd(new oc(b,c,d),a.Ld)}function Id(a){return a.O.ea?a.O.j():null}Hd.prototype.w=function(){return this.Ld};function pc(a){return a.Ld.ea?a.Ld.j():null};function Kf(a,b){this.W=a;var c=a.n,d=new od(c.g),c=T(c)?new od(c.g):c.ya?new lf(c):new qd(c);this.of=new xd(c);var e=b.w(),f=b.O,h=d.za(F,e.j(),null),k=c.za(F,f.j(),null);this.Na=new Hd(new oc(k,f.ea,c.Qa()),new oc(h,e.ea,d.Qa()));this.ab=[];this.Sf=new qf(a)}function Lf(a){return a.W}g=Kf.prototype;g.w=function(){return this.Na.w().j()};g.jb=function(a){var b=pc(this.Na);return b&&(T(this.W.n)||!a.e()&&!b.R(J(a)).e())?b.Q(a):null};g.e=function(){return 0===this.ab.length};g.Ob=function(a){this.ab.push(a)};
	g.mb=function(a,b){var c=[];if(b){E(null==a,"A cancel should cancel all event registrations.");var d=this.W.path;Ga(this.ab,function(a){(a=a.Pe(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.ab.length;++f){var h=this.ab[f];if(!h.matches(a))e.push(h);else if(a.af()){e=e.concat(this.ab.slice(f+1));break}}this.ab=e}else this.ab=[];return c};
	g.gb=function(a,b,c){a.type===nd&&null!==a.source.Ib&&(E(pc(this.Na),"We should always have a full cache before handling merges"),E(Id(this.Na),"Missing event cache, even though we have a server cache"));var d=this.Na;a=this.of.gb(d,a,b,c);b=this.of;c=a.Sd;E(c.O.j().zc(b.V.g),"Event snap not indexed");E(c.w().j().zc(b.V.g),"Server snap not indexed");E(xc(a.Sd.w())||!xc(d.w()),"Once a server snap is complete, it should never go back");this.Na=a.Sd;return Mf(this,a.Mf,a.Sd.O.j(),null)};
	function Nf(a,b){var c=a.Na.O,d=[];c.j().J()||c.j().P(N,function(a,b){d.push(new H("child_added",b,a))});c.ea&&d.push(gc(c.j()));return Mf(a,d,c.j(),b)}function Mf(a,b,c,d){return rf(a.Sf,b,c,d?[d]:a.ab)};function Of(a,b,c){this.f=Vc("p:rest:");this.M=a;this.Hb=b;this.Vd=c;this.aa={}}function Pf(a,b){if(p(b))return"tag$"+b;E(zf(a.n),"should have a tag if it's not a default query.");return a.path.toString()}g=Of.prototype;
	g.df=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ka());var f=Pf(a,c),h={};this.aa[f]=h;a=Af(a.n);var k=this;Qf(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Hb(e,u,!1,c);A(k.aa,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.Ef=function(a,b){var c=Pf(a,b);delete this.aa[c]};g.qf=function(){};g.re=function(){};g.gf=function(){};g.xd=function(){};g.put=function(){};g.ef=function(){};g.ye=function(){};
	function Qf(a,b,c,d){c=c||{};c.format="export";a.Vd.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.M.Sc?"https://":"http://")+a.M.host+b+"?"+Jb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=Kb(h.responseText)}catch(c){L("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&L("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Rf(a){this.He=a}Rf.prototype.getToken=function(a){return this.He.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(I("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Sf(a,b){a.He.INTERNAL.addAuthTokenListener(b)};function Tf(a){this.Nf=a;this.rd=null}Tf.prototype.get=function(){var a=this.Nf.get(),b=va(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};function Uf(){this.uc={}}function Vf(a,b,c){p(c)||(c=1);Hb(a.uc,b)||(a.uc[b]=0);a.uc[b]+=c}Uf.prototype.get=function(){return va(this.uc)};function Wf(a,b){this.zf={};this.Vc=new Tf(a);this.wa=b;var c=1E4+2E4*Math.random();setTimeout(r(this.rf,this),Math.floor(c))}Wf.prototype.rf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&Hb(this.zf,d)&&(b[d]=a[d],c=!0);c&&this.wa.ye(b);setTimeout(r(this.rf,this),Math.floor(6E5*Math.random()))};var Xf={},Yf={};function Zf(a){a=a.toString();Xf[a]||(Xf[a]=new Uf);return Xf[a]}function $f(a,b){var c=a.toString();Yf[c]||(Yf[c]=b());return Yf[c]};var ag=null;"undefined"!==typeof MozWebSocket?ag=MozWebSocket:"undefined"!==typeof WebSocket&&(ag=WebSocket);function bg(a,b,c,d){this.Zd=a;this.f=Vc(this.Zd);this.frames=this.Ac=null;this.qb=this.rb=this.Fe=0;this.Xa=Zf(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Ne=ec(b,"websocket",a)}var cg;
	bg.prototype.open=function(a,b){this.kb=b;this.hg=a;this.f("Websocket connecting to "+this.Ne);this.xc=!1;Xb.set("previous_websocket_failure",!0);try{this.La=new ag(this.Ne)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.fb();return}var e=this;this.La.onopen=function(){e.f("Websocket connected.");e.xc=!0};this.La.onclose=function(){e.f("Websocket connection was disconnected.");e.La=null;e.fb()};this.La.onmessage=function(a){if(null!==e.La)if(a=a.data,e.qb+=
	a.length,Vf(e.Xa,"bytes_received",a.length),dg(e),null!==e.frames)eg(e,a);else{a:{E(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.Fe=b;e.frames=[];a=null;break a}}e.Fe=1;e.frames=[]}null!==a&&eg(e,a)}};this.La.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.fb()}};bg.prototype.start=function(){};
	bg.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==ag&&!cg};bg.responsesRequiredToBeHealthy=2;bg.healthyTimeout=3E4;g=bg.prototype;g.sd=function(){Xb.remove("previous_websocket_failure")};function eg(a,b){a.frames.push(b);if(a.frames.length==a.Fe){var c=a.frames.join("");a.frames=null;c=Kb(c);a.hg(c)}}
	g.send=function(a){dg(this);a=B(a);this.rb+=a.length;Vf(this.Xa,"bytes_sent",a.length);a=ed(a,16384);1<a.length&&fg(this,String(a.length));for(var b=0;b<a.length;b++)fg(this,a[b])};g.Tc=function(){this.Bb=!0;this.Ac&&(clearInterval(this.Ac),this.Ac=null);this.La&&(this.La.close(),this.La=null)};g.fb=function(){this.Bb||(this.f("WebSocket is closing itself"),this.Tc(),this.kb&&(this.kb(this.xc),this.kb=null))};g.close=function(){this.Bb||(this.f("WebSocket is being closed"),this.Tc())};
	function dg(a){clearInterval(a.Ac);a.Ac=setInterval(function(){a.La&&fg(a,"0");dg(a)},Math.floor(45E3))}function fg(a,b){try{a.La.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(r(a.fb,a),0)}};function gg(a,b,c,d){this.Zd=a;this.f=Vc(a);this.kc=b;this.qb=this.rb=0;this.Xa=Zf(b);this.Bf=c;this.xc=!1;this.Db=d;this.Yc=function(a){return ec(b,"long_polling",a)}}var hg,ig;
	gg.prototype.open=function(a,b){this.Qe=0;this.ja=b;this.ff=new Qb(a);this.Bb=!1;var c=this;this.tb=setTimeout(function(){c.f("Timed out trying to connect.");c.fb();c.tb=null},Math.floor(3E4));$c(function(){if(!c.Bb){c.Wa=new jg(function(a,b,d,k,m){kg(c,arguments);if(c.Wa)if(c.tb&&(clearTimeout(c.tb),c.tb=null),c.xc=!0,"start"==a)c.id=b,c.mf=d;else if("close"===a)b?(c.Wa.Kd=!1,Rb(c.ff,b,function(){c.fb()})):c.fb();else throw Error("Unrecognized command received: "+a);},function(a,b){kg(c,arguments);
	Sb(c.ff,a,b)},function(){c.fb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Wa.Qd&&(a.cb=c.Wa.Qd);a.v="5";c.Bf&&(a.s=c.Bf);c.Db&&(a.ls=c.Db);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);lg(c.Wa,a,function(){})}})};
	gg.prototype.start=function(){var a=this.Wa,b=this.mf;a.fg=this.id;a.gg=b;for(a.Ud=!0;mg(a););a=this.id;b=this.mf;this.gc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.gc.src=this.Yc(c);this.gc.style.display="none";document.body.appendChild(this.gc)};
	gg.isAvailable=function(){return hg||!ig&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.Dg)&&!0};g=gg.prototype;g.sd=function(){};g.Tc=function(){this.Bb=!0;this.Wa&&(this.Wa.close(),this.Wa=null);this.gc&&(document.body.removeChild(this.gc),this.gc=null);this.tb&&(clearTimeout(this.tb),this.tb=null)};
	g.fb=function(){this.Bb||(this.f("Longpoll is closing itself"),this.Tc(),this.ja&&(this.ja(this.xc),this.ja=null))};g.close=function(){this.Bb||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.rb+=a.length;Vf(this.Xa,"bytes_sent",a.length);a=Nb(a);a=wb(a,!0);a=ed(a,1840);for(var b=0;b<a.length;b++){var c=this.Wa;c.Qc.push({ug:this.Qe,Bg:a.length,Se:a[b]});c.Ud&&mg(c);this.Qe++}};function kg(a,b){var c=B(b).length;a.qb+=c;Vf(a.Xa,"bytes_received",c)}
	function jg(a,b,c,d){this.Yc=d;this.kb=c;this.ve=new Ie;this.Qc=[];this.$d=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=Oc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||I("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.ib=a.contentDocument:a.contentWindow?a.ib=a.contentWindow.document:a.document&&(a.ib=a.document);this.Ga=a;a="";this.Ga.src&&"javascript:"===this.Ga.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ga.ib.open(),this.Ga.ib.write(a),this.Ga.ib.close()}catch(f){I("frame writing exception"),f.stack&&I(f.stack),I(f)}}
	jg.prototype.close=function(){this.Ud=!1;if(this.Ga){this.Ga.ib.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ga&&(document.body.removeChild(a.Ga),a.Ga=null)},Math.floor(0))}var b=this.kb;b&&(this.kb=null,b())};
	function mg(a){if(a.Ud&&a.Kd&&a.ve.count()<(0<a.Qc.length?2:1)){a.$d++;var b={};b.id=a.fg;b.pw=a.gg;b.ser=a.$d;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Se.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.ug+"&ts"+d+"="+e.Bg+"&d"+d+"="+e.Se;d++}else break;ng(a,b+c,a.$d);return!0}return!1}function ng(a,b,c){function d(){a.ve.remove(c);mg(a)}a.ve.add(c,1);var e=setTimeout(d,Math.floor(25E3));lg(a,b,function(){clearTimeout(e);d()})}
	function lg(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ga.ib.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){I("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ga.ib.body.appendChild(d)}}catch(e){}},Math.floor(1))};function og(a){pg(this,a)}var qg=[gg,bg];function pg(a,b){var c=bg&&bg.isAvailable(),d=c&&!(Xb.cf||!0===Xb.get("previous_websocket_failure"));b.Cg&&(c||L("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[bg];else{var e=a.Wc=[];fd(qg,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function rg(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function sg(a,b,c,d,e,f,h){this.id=a;this.f=Vc("c:"+this.id+":");this.te=c;this.Mc=d;this.ja=e;this.se=f;this.M=b;this.Ad=[];this.Oe=0;this.Af=new og(b);this.L=0;this.Db=h;this.f("Connection created");tg(this)}
	function tg(a){var b=rg(a.Af);a.I=new b("c:"+a.id+":"+a.Oe++,a.M,void 0,a.Db);a.xe=b.responsesRequiredToBeHealthy||0;var c=ug(a,a.I),d=vg(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Cb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=setTimeout(function(){a.md=null;a.Cb||(a.I&&102400<a.I.qb?(a.f("Connection exceeded healthy timeout but has received "+a.I.qb+" bytes.  Marking connection healthy."),a.Cb=!0,a.I.sd()):a.I&&10240<a.I.rb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.rb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function vg(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.L?1===a.L&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.M.bb.substr(0,2)&&(Xb.remove("host:"+a.M.host),a.M.bb=a.M.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function ug(a,b){return function(c){if(2!=a.L)if(b===a.Rc){var d=cd("t",c);c=cd("d",c);if("c"==d){if(d=cd("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.yf=c.s;dc(a.M,f);0==a.L&&(a.I.start(),wg(a,a.I,d),"5"!==e&&L("Protocol version mismatch detected"),c=a.Af,(c=1<c.Wc.length?c.Wc[1]:null)&&xg(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];yg(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.se&&(a.se(c),a.se=null),a.ja=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),dc(a.M,c),1===a.L?a.close():(zg(a),tg(a))):"e"===d?Wc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Ag(a),Bg(a)):Wc("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=cd("t",c),c=cd("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Cg(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.xf--,Cg(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}sg.prototype.va=function(a){Dg(this,{t:"d",d:a})};function yg(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Zd),a.I=a.D,a.D=null)}
	function Cg(a){0>=a.xf?(a.f("Secondary connection is healthy."),a.Cb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,yg(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}sg.prototype.wd=function(a){Ag(this);this.te(a)};function Ag(a){a.Cb||(a.xe--,0>=a.xe&&(a.f("Primary connection is healthy."),a.Cb=!0,a.I.sd()))}
	function xg(a,b){a.D=new b("c:"+a.id+":"+a.Oe++,a.M,a.yf);a.xf=b.responsesRequiredToBeHealthy||0;a.D.open(ug(a,a.D),vg(a,a.D));setTimeout(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function wg(a,b,c){a.f("Realtime connection established.");a.I=b;a.L=1;a.Mc&&(a.Mc(c,a.yf),a.Mc=null);0===a.xe?(a.f("Primary connection is healthy."),a.Cb=!0):setTimeout(function(){Bg(a)},Math.floor(5E3))}
	function Bg(a){a.Cb||1!==a.L||(a.f("sending ping on primary."),Dg(a,{t:"c",d:{t:"p",d:{}}}))}function Dg(a,b){if(1!==a.L)throw"Connection is not connected";a.Xc.send(b)}sg.prototype.close=function(){2!==this.L&&(this.f("Closing realtime connection."),this.L=2,zg(this),this.ja&&(this.ja(),this.ja=null))};function zg(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function Eg(a,b,c,d,e,f){this.id=Fg++;this.f=Vc("p:"+this.id+":");this.qd={};this.aa={};this.qa=[];this.Pc=0;this.Lc=[];this.na=!1;this.Va=1E3;this.td=3E5;this.Hb=b;this.Kc=c;this.ue=d;this.M=a;this.pb=this.Ia=this.Db=this.ze=null;this.Vd=e;this.de=!1;this.ke=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Je=f||null;this.vb=null;this.Nb=!1;this.Gd={};this.tg=0;this.Ve=!0;this.Bc=this.me=null;Gg(this,0);He.Wb().hc("visible",this.jg,this);-1===
	a.host.indexOf("fblocal")&&Re.Wb().hc("online",this.ig,this)}var Fg=0,Hg=0;g=Eg.prototype;g.va=function(a,b,c){var d=++this.tg;a={r:d,a:a,b:b};this.f(B(a));E(this.na,"sendRequest call when we're not connected not allowed.");this.Ia.va(a);c&&(this.Gd[d]=c)};
	g.df=function(a,b,c,d){var e=a.ka(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.aa[f]=this.aa[f]||{};E(zf(a.n)||!T(a.n),"listen() called for non-default but complete query");E(!this.aa[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,pg:a,tag:c};this.aa[f][e]=a;this.na&&Ig(this,a)};
	function Ig(a,b){var c=b.pg,d=c.path.toString(),e=c.ka();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=yf(c.n),f.t=b.tag);f.h=b.ld();a.va("q",f,function(f){var k=f.d,m=f.s;if(k&&"object"===typeof k&&Hb(k,"w")){var l=A(k,"w");da(l)&&0<=Fa(l,"no_index")&&L("Using an unspecified index. Consider adding "+('".indexOn": "'+c.n.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.aa[d]&&a.aa[d][e])===b&&(a.f("listen response",f),"ok"!==m&&Jg(a,d,e),b.G&&
	b.G(m,k))})}g.qf=function(a){this.pb=a;this.f("Auth token refreshed");this.pb?Kg(this):this.na&&this.va("unauth",{},function(){});if(a&&40===a.length||ld(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Kg(a){if(a.na&&a.pb){var b=a.pb,c=kd(b)?"auth":"gauth",d={cred:b};a.Je&&(d.authvar=a.Je);a.va(c,d,function(c){var d=c.s;c=c.d||"error";a.pb===b&&("ok"===d?this.ke=0:Lg(a,d,c))})}}
	g.Ef=function(a,b){var c=a.path.toString(),d=a.ka();this.f("Unlisten called for "+c+" "+d);E(zf(a.n)||!T(a.n),"unlisten() called for non-default but complete query");if(Jg(this,c,d)&&this.na){var e=yf(a.n);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.va("n",c)}};g.re=function(a,b,c){this.na?Mg(this,"o",a,b,c):this.Lc.push({we:a,action:"o",data:b,G:c})};g.gf=function(a,b,c){this.na?Mg(this,"om",a,b,c):this.Lc.push({we:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.na?Mg(this,"oc",a,null,b):this.Lc.push({we:a,action:"oc",data:null,G:b})};function Mg(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.va(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Ng(this,"p",a,b,c,d)};g.ef=function(a,b,c,d){Ng(this,"m",a,b,c,d)};function Ng(a,b,c,d,e,f){d={p:c,d:d};p(f)&&(d.h=f);a.qa.push({action:b,sf:d,G:e});a.Pc++;b=a.qa.length-1;a.na?Og(a,b):a.f("Buffering put: "+c)}
	function Og(a,b){var c=a.qa[b].action,d=a.qa[b].sf,e=a.qa[b].G;a.qa[b].qg=a.na;a.va(c,d,function(d){a.f(c+" response",d);delete a.qa[b];a.Pc--;0===a.Pc&&(a.qa=[]);e&&e(d.s,d.d)})}g.ye=function(a){this.na&&(a={c:a},this.f("reportStats",a),this.va("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Hb(a.p,a.d,!1,a.t):"m"===b?this.Hb(a.p,a.d,!0,a.t):"c"===b?Pg(this,a.p,a.q):"ac"===b?Lg(this,a.s,a.d):"sd"===b?this.ze?this.ze(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):Wc("Unrecognized action received from server: "+
	B(b)+"\nAre you using the latest client?"))}};g.Mc=function(a,b){this.f("connection ready");this.na=!0;this.Bc=(new Date).getTime();this.ue({serverTimeOffset:a-(new Date).getTime()});this.Db=b;if(this.Ve){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;Pb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.ye(c)}Qg(this);this.Ve=!1;this.Kc(!0)};
	function Gg(a,b){E(!a.Ia,"Scheduling a connect when we're already connected/ing?");a.vb&&clearTimeout(a.vb);a.vb=setTimeout(function(){a.vb=null;Rg(a)},Math.floor(b))}g.jg=function(a){a&&!this.Nb&&this.Va===this.td&&(this.f("Window became visible.  Reducing delay."),this.Va=1E3,this.Ia||Gg(this,0));this.Nb=a};g.ig=function(a){a?(this.f("Browser went online."),this.Va=1E3,this.Ia||Gg(this,0)):(this.f("Browser went offline.  Killing connection."),this.Ia&&this.Ia.close())};
	g.jf=function(){this.f("data client disconnected");this.na=!1;this.Ia=null;for(var a=0;a<this.qa.length;a++){var b=this.qa[a];b&&"h"in b.sf&&b.qg&&(b.G&&b.G("disconnect"),delete this.qa[a],this.Pc--)}0===this.Pc&&(this.qa=[]);this.Gd={};Sg(this)&&(this.Nb?this.Bc&&(3E4<(new Date).getTime()-this.Bc&&(this.Va=1E3),this.Bc=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Va=this.td,this.me=(new Date).getTime()),a=Math.max(0,this.Va-((new Date).getTime()-this.me)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Gg(this,a),this.Va=Math.min(this.td,1.3*this.Va));this.Kc(!1)};
	function Rg(a){if(Sg(a)){a.f("Making a connection attempt");a.me=(new Date).getTime();a.Bc=null;var b=r(a.wd,a),c=r(a.Mc,a),d=r(a.jf,a),e=a.id+":"+Hg++,f=a.Db,h=!1,k=null,m=function(){k?k.close():(h=!0,d())};a.Ia={close:m,va:function(a){E(k,"sendRequest call when we're not connected not allowed.");k.va(a)}};var l=a.de;a.de=!1;a.Vd.getToken(l).then(function(l){h?I("getToken() completed but was canceled"):(I("getToken() completed. Creating connection."),a.pb=l&&l.accessToken,k=new sg(e,a.M,b,c,d,function(b){L(b+
	" ("+a.M.toString()+")");a.eb("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||m()})}}g.eb=function(a){I("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Ia?this.Ia.close():(this.vb&&(clearTimeout(this.vb),this.vb=null),this.na&&this.jf())};g.lc=function(a){I("Resuming connection for reason: "+a);delete this.qd[a];ua(this.qd)&&(this.Va=1E3,this.Ia||Gg(this,0))};
	function Pg(a,b,c){c=c?Ia(c,function(a){return dd(a)}).join("$"):"default";(a=Jg(a,b,c))&&a.G&&a.G("permission_denied")}function Jg(a,b,c){b=(new M(b)).toString();var d;p(a.aa[b])?(d=a.aa[b][c],delete a.aa[b][c],0===na(a.aa[b])&&delete a.aa[b]):d=void 0;return d}
	function Lg(a,b,c){I("Auth token revoked: "+b+"/"+c);a.pb=null;a.de=!0;a.Ia.close();"invalid_token"===b&&(a.ke++,3<=a.ke&&(a.Va=3E4,L("Provided authentication credentials are invalid. This usually indicates your FirebaseApp instance was not initialized correctly. Make sure your apiKey and databaseURL match the values provided for your app at https://console.firebase.google.com/, or if you're using a service account, make sure it's authorized to access the specified databaseURL and is from the correct project.")))}
	function Qg(a){Kg(a);t(a.aa,function(b){t(b,function(b){Ig(a,b)})});for(var b=0;b<a.qa.length;b++)a.qa[b]&&Og(a,b);for(;a.Lc.length;)b=a.Lc.shift(),Mg(a,b.action,b.we,b.data,b.G)}function Sg(a){var b;b=Re.Wb().ic;return ua(a.qd)&&b};function Tg(a){this.X=a}var Ug=new Tg(new qe(null));function Vg(a,b,c){if(b.e())return new Tg(new qe(c));var d=ue(a.X,b);if(null!=d){var e=d.path,d=d.value;b=R(e,b);d=d.F(b,c);return new Tg(a.X.set(e,d))}a=Nd(a.X,b,new qe(c));return new Tg(a)}function Wg(a,b,c){var d=a;Ib(c,function(a,c){d=Vg(d,b.m(a),c)});return d}Tg.prototype.Ed=function(a){if(a.e())return Ug;a=Nd(this.X,a,Q);return new Tg(a)};function Xg(a,b){var c=ue(a.X,b);return null!=c?a.X.get(c.path).Q(R(c.path,b)):null}
	function Yg(a){var b=[],c=a.X.value;null!=c?c.J()||c.P(N,function(a,c){b.push(new O(a,c))}):a.X.children.ia(function(a,c){null!=c.value&&b.push(new O(a,c.value))});return b}function Zg(a,b){if(b.e())return a;var c=Xg(a,b);return null!=c?new Tg(new qe(c)):new Tg(a.X.subtree(b))}Tg.prototype.e=function(){return this.X.e()};Tg.prototype.apply=function(a){return $g(C,this.X,a)};
	function $g(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ia(function(b,f){".priority"===b?(E(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=$g(a.m(b),f,c)});c.Q(a).e()||null===d||(c=c.F(a.m(".priority"),d));return c};function ah(){this.T=Ug;this.ma=[];this.Cc=-1}function bh(a,b){for(var c=0;c<a.ma.length;c++){var d=a.ma[c];if(d.Zc===b)return d}return null}g=ah.prototype;
	g.Ed=function(a){var b=Ma(this.ma,function(b){return b.Zc===a});E(0<=b,"removeWrite called with nonexistent writeId.");var c=this.ma[b];this.ma.splice(b,1);for(var d=c.visible,e=!1,f=this.ma.length-1;d&&0<=f;){var h=this.ma[f];h.visible&&(f>=b&&ch(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.T=dh(this.ma,eh,C),this.Cc=0<this.ma.length?this.ma[this.ma.length-1].Zc:-1;else if(c.Ja)this.T=this.T.Ed(c.path);else{var k=this;t(c.children,function(a,b){k.T=k.T.Ed(c.path.m(b))})}return!0}return!1};
	g.Ba=function(a,b,c,d){if(c||d){var e=Zg(this.T,a);return!d&&e.e()?b:d||null!=b||null!=Xg(e,C)?(e=dh(this.ma,function(b){return(b.visible||d)&&(!c||!(0<=Fa(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||F,e.apply(b)):null}e=Xg(this.T,a);if(null!=e)return e;e=Zg(this.T,a);return e.e()?b:null!=b||null!=Xg(e,C)?(b=b||F,e.apply(b)):null};
	g.sc=function(a,b){var c=F,d=Xg(this.T,a);if(d)d.J()||d.P(N,function(a,b){c=c.U(a,b)});else if(b){var e=Zg(this.T,a);b.P(N,function(a,b){var d=Zg(e,new M(a)).apply(b);c=c.U(a,d)});Ga(Yg(e),function(a){c=c.U(a.name,a.S)})}else e=Zg(this.T,a),Ga(Yg(e),function(a){c=c.U(a.name,a.S)});return c};g.$c=function(a,b,c,d){E(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.m(b);if(null!=Xg(this.T,a))return null;a=Zg(this.T,a);return a.e()?d.Q(b):a.apply(d.Q(b))};
	g.rc=function(a,b,c){a=a.m(b);var d=Xg(this.T,a);return null!=d?d:nc(c,b)?Zg(this.T,a).apply(c.j().R(b)):null};g.mc=function(a){return Xg(this.T,a)};g.Xd=function(a,b,c,d,e,f){var h;a=Zg(this.T,a);h=Xg(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.ob(f);if(h.e()||h.J())return[];b=[];a=Ue(f);e=e?h.$b(c,f):h.Yb(c,f);for(f=K(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=K(e);return b};
	function ch(a,b){return a.Ja?a.path.contains(b):!!sa(a.children,function(c,d){return a.path.m(d).contains(b)})}function eh(a){return a.visible}
	function dh(a,b,c){for(var d=Ug,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ja)c.contains(h)?(h=R(c,h),d=Vg(d,h,f.Ja)):h.contains(c)&&(h=R(h,c),d=Vg(d,C,f.Ja.Q(h)));else if(f.children)if(c.contains(h))h=R(c,h),d=Wg(d,h,f.children);else{if(h.contains(c))if(h=R(h,c),h.e())d=Wg(d,C,f.children);else if(f=A(f.children,J(h)))f=f.Q(D(h)),d=Vg(d,C,f)}else throw Pc("WriteRecord should have .snap or .children");}}return d}function fh(a,b){this.Mb=a;this.X=b}g=fh.prototype;
	g.Ba=function(a,b,c){return this.X.Ba(this.Mb,a,b,c)};g.sc=function(a){return this.X.sc(this.Mb,a)};g.$c=function(a,b,c){return this.X.$c(this.Mb,a,b,c)};g.mc=function(a){return this.X.mc(this.Mb.m(a))};g.Xd=function(a,b,c,d,e){return this.X.Xd(this.Mb,a,b,c,d,e)};g.rc=function(a,b){return this.X.rc(this.Mb,a,b)};g.m=function(a){return new fh(this.Mb.m(a),this.X)};function Me(){this.k=this.B=null}Me.prototype.find=function(a){if(null!=this.B)return this.B.Q(a);if(a.e()||null==this.k)return null;var b=J(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function Oe(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new Ie);var d=J(b);a.k.contains(d)||a.k.add(d,new Me);a=a.k.get(d);b=D(b);Oe(a,b,c)}}
	function gh(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.P(N,function(b,c){Oe(a,new M(b),c)});return gh(a,b)}return null!==a.k?(c=J(b),b=D(b),a.k.contains(c)&&gh(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function Ne(a,b,c){null!==a.B?c(b,a.B):a.P(function(a,e){var f=new M(b.toString()+"/"+a);Ne(e,f,c)})}Me.prototype.P=function(a){null!==this.k&&Je(this.k,function(b,c){a(b,c)})};function U(a,b){this.ua=a;this.ra=b}U.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);y("Firebase.onDisconnect().cancel",1,a,!0);var b=new Eb;this.ua.xd(this.ra,Fb(b,a));return b.sa};U.prototype.cancel=U.prototype.cancel;U.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);fe("Firebase.onDisconnect().remove",this.ra);y("Firebase.onDisconnect().remove",1,a,!0);var b=new Eb;hh(this.ua,this.ra,null,Fb(b,a));return b.sa};
	U.prototype.remove=U.prototype.remove;U.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);fe("Firebase.onDisconnect().set",this.ra);Yd("Firebase.onDisconnect().set",a,this.ra,!1);y("Firebase.onDisconnect().set",2,b,!0);var c=new Eb;hh(this.ua,this.ra,a,Fb(c,b));return c.sa};U.prototype.set=U.prototype.set;
	U.prototype.Kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);fe("Firebase.onDisconnect().setWithPriority",this.ra);Yd("Firebase.onDisconnect().setWithPriority",a,this.ra,!1);be("Firebase.onDisconnect().setWithPriority",2,b);y("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new Eb;ih(this.ua,this.ra,a,b,Fb(d,c));return d.sa};U.prototype.setWithPriority=U.prototype.Kb;
	U.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);fe("Firebase.onDisconnect().update",this.ra);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ae("Firebase.onDisconnect().update",a,this.ra);y("Firebase.onDisconnect().update",2,b,!0);
	c=new Eb;jh(this.ua,this.ra,a,Fb(c,b));return c.sa};U.prototype.update=U.prototype.update;function V(a,b,c){this.A=a;this.W=b;this.g=c}V.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};V.prototype.val=V.prototype.H;V.prototype.Ue=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};V.prototype.exportVal=V.prototype.Ue;V.prototype.Vf=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};V.prototype.exists=V.prototype.Vf;
	V.prototype.m=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);fa(a)&&(a=String(a));ee("Firebase.DataSnapshot.child",a);var b=new M(a),c=this.W.m(b);return new V(this.A.Q(b),c,N)};V.prototype.child=V.prototype.m;V.prototype.Fa=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);ee("Firebase.DataSnapshot.hasChild",a);var b=new M(a);return!this.A.Q(b).e()};V.prototype.hasChild=V.prototype.Fa;
	V.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};V.prototype.getPriority=V.prototype.C;V.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);y("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.P(this.g,function(c,d){return a(new V(d,b.W.m(c),N))})};V.prototype.forEach=V.prototype.forEach;
	V.prototype.kd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};V.prototype.hasChildren=V.prototype.kd;V.prototype.getKey=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.W.getKey()};id(V.prototype,"key",V.prototype.getKey);V.prototype.Fb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Fb()};V.prototype.numChildren=V.prototype.Fb;
	V.prototype.xb=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.W};id(V.prototype,"ref",V.prototype.xb);function kh(a,b,c){this.Qb=a;this.sb=b;this.ub=c||null}g=kh.prototype;g.tf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.n.g;return new ic("value",this,new V(a.Ma,b.xb(),c))};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){E(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.Qb;return function(){d.call(b,a.Md)}};g.Pe=function(a,b){return this.sb?new jc(this,a,b):null};
	g.matches=function(a){return a instanceof kh?a.Qb&&this.Qb?a.Qb===this.Qb&&a.ub===this.ub:!0:!1};g.af=function(){return null!==this.Qb};function lh(a,b,c){this.ha=a;this.sb=b;this.ub=c}g=lh.prototype;g.tf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ha};g.Pe=function(a,b){return this.sb?new jc(this,a,b):null};
	g.createEvent=function(a,b){E(null!=a.Za,"Child events should have a childName.");var c=b.xb().m(a.Za);return new ic(a.type,this,new V(a.Ma,c,b.n.g),a.Dd)};g.Ub=function(a){var b=this.ub;if("cancel"===a.ge()){E(this.sb,"Raising a cancel event on a listener with no cancel callback");var c=this.sb;return function(){c.call(b,a.error)}}var d=this.ha[a.gd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof lh){if(!this.ha||!a.ha)return!0;if(this.ub===a.ub){var b=na(a.ha);if(b===na(this.ha)){if(1===b){var b=oa(a.ha),c=oa(this.ha);return c===b&&(!a.ha[b]||!this.ha[c]||a.ha[b]===this.ha[c])}return ma(this.ha,function(b,c){return a.ha[c]===b})}}}return!1};g.af=function(){return null!==this.ha};function mh(){this.Aa={}}g=mh.prototype;g.e=function(){return ua(this.Aa)};g.gb=function(a,b,c){var d=a.source.Ib;if(null!==d)return d=A(this.Aa,d),E(null!=d,"SyncTree gave us an op for an invalid query."),d.gb(a,b,c);var e=[];t(this.Aa,function(d){e=e.concat(d.gb(a,b,c))});return e};g.Ob=function(a,b,c,d,e){var f=a.ka(),h=A(this.Aa,f);if(!h){var h=c.Ba(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.sc(d):F,k=!1);h=new Kf(a,new Hd(new oc(h,k,!1),new oc(d,e,!1)));this.Aa[f]=h}h.Ob(b);return Nf(h,b)};
	g.mb=function(a,b,c){var d=a.ka(),e=[],f=[],h=null!=nh(this);if("default"===d){var k=this;t(this.Aa,function(a,d){f=f.concat(a.mb(b,c));a.e()&&(delete k.Aa[d],T(a.W.n)||e.push(a.W))})}else{var m=A(this.Aa,d);m&&(f=f.concat(m.mb(b,c)),m.e()&&(delete this.Aa[d],T(m.W.n)||e.push(m.W)))}h&&null==nh(this)&&e.push(new W(a.u,a.path));return{sg:e,Tf:f}};function oh(a){return Ha(pa(a.Aa),function(a){return!T(a.W.n)})}g.jb=function(a){var b=null;t(this.Aa,function(c){b=b||c.jb(a)});return b};
	function ph(a,b){if(T(b.n))return nh(a);var c=b.ka();return A(a.Aa,c)}function nh(a){return ta(a.Aa,function(a){return T(a.W.n)})||null};function qh(a){this.xa=Q;this.lb=new ah;this.De={};this.jc={};this.Dc=a}function rh(a,b,c,d,e){var f=a.lb,h=e;E(d>f.Cc,"Stacking an older write on top of newer ones");p(h)||(h=!0);f.ma.push({path:b,Ja:c,Zc:d,visible:h});h&&(f.T=Vg(f.T,b,c));f.Cc=d;return e?sh(a,new ac(Ee,b,c)):[]}function th(a,b,c,d){var e=a.lb;E(d>e.Cc,"Stacking an older merge on top of newer ones");e.ma.push({path:b,children:c,Zc:d,visible:!0});e.T=Wg(e.T,b,c);e.Cc=d;c=se(c);return sh(a,new md(Ee,b,c))}
	function uh(a,b,c){c=c||!1;var d=bh(a.lb,b);if(a.lb.Ed(b)){var e=Q;null!=d.Ja?e=e.set(C,!0):Ib(d.children,function(a,b){e=e.set(new M(a),b)});return sh(a,new De(d.path,e,c))}return[]}function vh(a,b,c){c=se(c);return sh(a,new md(Ge,b,c))}function wh(a,b,c,d){d=xh(a,d);if(null!=d){var e=yh(d);d=e.path;e=e.Ib;b=R(d,b);c=new ac(new Fe(!1,!0,e,!0),b,c);return zh(a,d,c)}return[]}
	function Ah(a,b,c,d){if(d=xh(a,d)){var e=yh(d);d=e.path;e=e.Ib;b=R(d,b);c=se(c);c=new md(new Fe(!1,!0,e,!0),b,c);return zh(a,d,c)}return[]}
	qh.prototype.Ob=function(a,b){var c=a.path,d=null,e=!1;ze(this.xa,c,function(a,b){var f=R(a,c);d=d||b.jb(f);e=e||null!=nh(b)});var f=this.xa.get(c);f?(e=e||null!=nh(f),d=d||f.jb(C)):(f=new mh,this.xa=this.xa.set(c,f));var h;null!=d?h=!0:(h=!1,d=F,Ce(this.xa.subtree(c),function(a,b){var c=b.jb(C);c&&(d=d.U(a,c))}));var k=null!=ph(f,a);if(!k&&!T(a.n)){var m=Bh(a);E(!(m in this.jc),"View does not exist, but we have a tag");var l=Ch++;this.jc[m]=l;this.De["_"+l]=m}h=f.Ob(a,b,new fh(c,this.lb),d,h);k||
	e||(f=ph(f,a),h=h.concat(Dh(this,a,f)));return h};
	qh.prototype.mb=function(a,b,c){var d=a.path,e=this.xa.get(d),f=[];if(e&&("default"===a.ka()||null!=ph(e,a))){f=e.mb(a,b,c);e.e()&&(this.xa=this.xa.remove(d));e=f.sg;f=f.Tf;b=-1!==Ma(e,function(a){return T(a.n)});var h=xe(this.xa,d,function(a,b){return null!=nh(b)});if(b&&!h&&(d=this.xa.subtree(d),!d.e()))for(var d=Eh(d),k=0;k<d.length;++k){var m=d[k],l=m.W,m=Fh(this,m);this.Dc.Ae(Gh(l),Hh(this,l),m.ld,m.G)}if(!h&&0<e.length&&!c)if(b)this.Dc.Od(Gh(a),null);else{var u=this;Ga(e,function(a){a.ka();
	var b=u.jc[Bh(a)];u.Dc.Od(Gh(a),b)})}Ih(this,e)}return f};qh.prototype.Ba=function(a,b){var c=this.lb,d=xe(this.xa,a,function(b,c){var d=R(b,a);if(d=c.jb(d))return d});return c.Ba(a,d,b,!0)};function Eh(a){return ve(a,function(a,c,d){if(c&&null!=nh(c))return[nh(c)];var e=[];c&&(e=oh(c));t(d,function(a){e=e.concat(a)});return e})}function Ih(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!T(d.n)){var d=Bh(d),e=a.jc[d];delete a.jc[d];delete a.De["_"+e]}}}
	function Gh(a){return T(a.n)&&!zf(a.n)?a.xb():a}function Dh(a,b,c){var d=b.path,e=Hh(a,b);c=Fh(a,c);b=a.Dc.Ae(Gh(b),e,c.ld,c.G);d=a.xa.subtree(d);if(e)E(null==nh(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=ve(d,function(a,b,c){if(!a.e()&&b&&null!=nh(b))return[Lf(nh(b))];var d=[];b&&(d=d.concat(Ia(oh(b),function(a){return a.W})));t(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Dc.Od(Gh(c),Hh(a,c));return b}
	function Fh(a,b){var c=b.W,d=Hh(a,c);return{ld:function(){return(b.w()||F).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=xh(a,d)){var h=yh(b);b=h.path;h=h.Ib;f=R(b,f);f=new Zb(new Fe(!1,!0,h,!0),f);b=zh(a,b,f)}else b=[]}else b=sh(a,new Zb(Ge,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.mb(c,null,f)}}}function Bh(a){return a.path.toString()+"$"+a.ka()}function yh(a){var b=a.indexOf("$");E(-1!==b&&b<a.length-1,"Bad queryKey.");return{Ib:a.substr(b+1),path:new M(a.substr(0,b))}}function xh(a,b){var c=a.De,d="_"+b;return d in c?c[d]:void 0}function Hh(a,b){var c=Bh(b);return A(a.jc,c)}var Ch=1;
	function zh(a,b,c){var d=a.xa.get(b);E(d,"Missing sync point for query tag that we're tracking");return d.gb(c,new fh(b,a.lb),null)}function sh(a,b){return Jh(a,b,a.xa,null,new fh(C,a.lb))}function Jh(a,b,c,d,e){if(b.path.e())return Kh(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[],k=J(b.path),m=b.Nc(k);if((c=c.children.get(k))&&m)var l=d?d.R(k):null,k=e.m(k),h=h.concat(Jh(a,m,c,l,k));f&&(h=h.concat(f.gb(b,e,d)));return h}
	function Kh(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.jb(C));var h=[];c.children.ia(function(c,f){var l=d?d.R(c):null,u=e.m(c),z=b.Nc(c);z&&(h=h.concat(Kh(a,z,f,l,u)))});f&&(h=h.concat(f.gb(b,e,d)));return h};function X(a,b,c,d){this.u=a;this.path=b;this.n=c;this.Oc=d}
	function Lh(a){var b=null,c=null;a.la&&(b=sd(a));a.oa&&(c=ud(a));if(a.g===Od){if(a.la){if("[MIN_NAME]"!=rd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.oa){if("[MAX_NAME]"!=td(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!Xd(b)||null!=c&&!Xd(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(E(a.g instanceof We||a.g===bf,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function Mh(a){if(a.la&&a.oa&&a.ya&&(!a.ya||""===a.oc))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Nh(a,b){if(!0===a.Oc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.xb=function(){x("Query.ref",0,0,arguments.length);return new W(this.u,this.path)};
	g.hc=function(a,b,c,d){x("Query.on",2,4,arguments.length);ce("Query.on",a,!1);y("Query.on",2,b,!1);var e=Oh("Query.on",c,d);if("value"===a)Ph(this.u,this,new kh(b,e.cancel||null,e.Pa||null));else{var f={};f[a]=b;Ph(this.u,this,new lh(f,e.cancel,e.Pa))}return b};
	g.Jc=function(a,b,c){x("Query.off",0,3,arguments.length);ce("Query.off",a,!0);y("Query.off",2,b,!0);Cb("Query.off",3,c);var d=null,e=null;"value"===a?d=new kh(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new lh(e,null,c||null));e=this.u;d=".info"===J(this.path)?e.pd.mb(this,d):e.K.mb(this,d);tc(e.da,this.path,d)};
	g.kg=function(a,b){function c(k){f&&(f=!1,e.Jc(a,c),b&&b.call(d.Pa,k),h.resolve(k))}x("Query.once",1,4,arguments.length);ce("Query.once",a,!1);y("Query.once",2,b,!0);var d=Oh("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new Eb;Gb(h.sa);this.hc(a,c,function(b){e.Jc(a,c);d.cancel&&d.cancel.call(d.Pa,b);h.reject(b)});return h.sa};
	g.ne=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.ne(a),this.Oc)};
	g.oe=function(a){x("Query.limitToLast",1,1,arguments.length);if(!fa(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.n.ya)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.n.oe(a),this.Oc)};
	g.lg=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');ee("Query.orderByChild",a);Nh(this,"Query.orderByChild");var b=new M(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new We(b);b=xf(this.n,b);Lh(b);return new X(this.u,this.path,b,!0)};g.mg=function(){x("Query.orderByKey",0,0,arguments.length);Nh(this,"Query.orderByKey");var a=xf(this.n,Od);Lh(a);return new X(this.u,this.path,a,!0)};g.ng=function(){x("Query.orderByPriority",0,0,arguments.length);Nh(this,"Query.orderByPriority");var a=xf(this.n,N);Lh(a);return new X(this.u,this.path,a,!0)};
	g.og=function(){x("Query.orderByValue",0,0,arguments.length);Nh(this,"Query.orderByValue");var a=xf(this.n,bf);Lh(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){x("Query.startAt",0,2,arguments.length);Yd("Query.startAt",a,this.path,!0);de("Query.startAt",b);var c=this.n.Nd(a,b);Mh(c);Lh(c);if(this.n.la)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");p(a)||(b=a=null);return new X(this.u,this.path,c,this.Oc)};
	g.fd=function(a,b){x("Query.endAt",0,2,arguments.length);Yd("Query.endAt",a,this.path,!0);de("Query.endAt",b);var c=this.n.fd(a,b);Mh(c);Lh(c);if(this.n.oa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Oc)};
	g.Rf=function(a,b){x("Query.equalTo",1,2,arguments.length);Yd("Query.equalTo",a,this.path,!1);de("Query.equalTo",b);if(this.n.la)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.n.oa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).fd(a,b)};
	g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Z;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.ka=function(){var a=dd(yf(this.n));return"{}"===a?"default":a};
	g.isEqual=function(a){x("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.$(a.path),d=this.ka()===a.ka();return b&&c&&d};
	function Oh(a,b,c){var d={cancel:null,Pa:null};if(b&&c)d.cancel=b,y(a,3,d.cancel,!0),d.Pa=c,Cb(a,4,d.Pa);else if(b)if("object"===typeof b&&null!==b)d.Pa=b;else if("function"===typeof b)d.cancel=b;else throw Error(Bb(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.hc;X.prototype.off=X.prototype.Jc;X.prototype.once=X.prototype.kg;X.prototype.limitToFirst=X.prototype.ne;X.prototype.limitToLast=X.prototype.oe;X.prototype.orderByChild=X.prototype.lg;
	X.prototype.orderByKey=X.prototype.mg;X.prototype.orderByPriority=X.prototype.ng;X.prototype.orderByValue=X.prototype.og;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.fd;X.prototype.equalTo=X.prototype.Rf;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;id(X.prototype,"ref",X.prototype.xb);function Qh(a){a instanceof Rh||Xc("Don't call new Database() directly - please use firebase.database().");this.ua=a;this.ca=new W(a,C);this.INTERNAL=new Sh(this)}var Th={TIMESTAMP:{".sv":"timestamp"}};g=Qh.prototype;g.app=null;g.pf=function(a){Uh(this,"ref");x("database.ref",0,1,arguments.length);return p(a)?this.ca.m(a):this.ca};
	g.rg=function(a){Uh(this,"database.refFromURL");x("database.refFromURL",1,1,arguments.length);var b=Yc(a);ge("database.refFromURL",b);var c=b.kc;c.host!==this.ua.M.host&&Xc("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ua.M.host+")");return this.pf(b.path.toString())};function Uh(a,b){null===a.ua&&Xc("Cannot call "+b+" on a deleted database.")}g.$f=function(){x("database.goOffline",0,0,arguments.length);Uh(this,"goOffline");this.ua.eb()};
	g.ag=function(){x("database.goOnline",0,0,arguments.length);Uh(this,"goOnline");this.ua.lc()};Object.defineProperty(Qh.prototype,"app",{get:function(){return this.ua.app}});function Sh(a){this.$a=a}Sh.prototype.delete=function(){Uh(this.$a,"delete");var a=Vh.Wb(),b=this.$a.ua;A(a.nb,b.app.name)!==b&&Xc("Database "+b.app.name+" has already been deleted.");b.eb();delete a.nb[b.app.name];this.$a.ua=null;this.$a.ca=null;this.$a=this.$a.INTERNAL=null;return firebase.Promise.resolve()};
	Qh.prototype.ref=Qh.prototype.pf;Qh.prototype.refFromURL=Qh.prototype.rg;Qh.prototype.goOnline=Qh.prototype.ag;Qh.prototype.goOffline=Qh.prototype.$f;Sh.prototype["delete"]=Sh.prototype.delete;function Rh(a,b,c){this.app=c;var d=new Rf(c);this.M=a;this.Xa=Zf(a);this.Vc=null;this.da=new qc;this.vd=1;this.Ua=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.wa=new Of(this.M,r(this.Hb,this),d),setTimeout(r(this.Kc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==ca(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.wa=this.Ua=new Eg(this.M,r(this.Hb,this),r(this.Kc,this),r(this.ue,this),d,b)}var f=this;Sf(d,function(a){f.wa.qf(a)});this.zg=$f(a,r(function(){return new Wf(this.Xa,this.wa)},this));this.nc=new ie;this.ie=new fc;this.pd=new qh({Ae:function(a,b,c,d){b=[];c=f.ie.j(a.path);c.e()||(b=sh(f.pd,new ac(Ge,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:aa});Wh(this,"connected",!1);this.ja=new Me;this.$a=new Qh(this);this.ed=
	0;this.je=null;this.K=new qh({Ae:function(a,b,c,d){f.wa.df(a,c,b,function(b,c){var e=d(b,c);vc(f.da,a.path,e)});return[]},Od:function(a,b){f.wa.Ef(a,b)}})}g=Rh.prototype;g.toString=function(){return(this.M.Sc?"https://":"http://")+this.M.host};g.name=function(){return this.M.pe};function Xh(a){a=a.ie.j(new M(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Yh(a){a=a={timestamp:Xh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Hb=function(a,b,c,d){this.ed++;var e=new M(a);b=this.je?this.je(a,b):b;a=[];d?c?(b=la(b,function(a){return S(a)}),a=Ah(this.K,e,b,d)):(b=S(b),a=wh(this.K,e,b,d)):c?(d=la(b,function(a){return S(a)}),a=vh(this.K,e,d)):(d=S(b),a=sh(this.K,new ac(Ge,e,d)));d=e;0<a.length&&(d=Zh(this,e));vc(this.da,d,a)};g.Kc=function(a){Wh(this,"connected",a);!1===a&&$h(this)};g.ue=function(a){var b=this;fd(a,function(a,d){Wh(b,d,a)})};
	function Wh(a,b,c){b=new M("/.info/"+b);c=S(c);var d=a.ie;d.Jd=d.Jd.F(b,c);c=sh(a.pd,new ac(Ge,b,c));vc(a.da,b,c)}g.Kb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,Gg:c});var e=Yh(this);b=S(b,c);var e=Pe(b,e),f=this.vd++,e=rh(this.K,a,e,f,!0);rc(this.da,e);var h=this;this.wa.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||L("set at "+a+" failed: "+b);e=uh(h.K,f,!e);vc(h.da,a,e);ai(d,b,c)});e=bi(this,a);Zh(this,e);vc(this.da,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Yh(this),f={};t(b,function(a,b){d=!1;var c=S(a);f[b]=Pe(c,e)});if(d)I("update() called with empty data.  Don't do anything."),ai(c,"ok");else{var h=this.vd++,k=th(this.K,a,f,h);rc(this.da,k);var m=this;this.wa.ef(a.toString(),b,function(b,d){var e="ok"===b;e||L("update at "+a+" failed: "+b);var e=uh(m.K,h,!e),f=a;0<e.length&&(f=Zh(m,a));vc(m.da,f,e);ai(c,b,d)});b=bi(this,a);Zh(this,b);vc(this.da,a,[])}};
	function $h(a){a.f("onDisconnectEvents");var b=Yh(a),c=[];Ne(Le(a.ja,b),C,function(b,e){c=c.concat(sh(a.K,new ac(Ge,b,e)));var f=bi(a,b);Zh(a,f)});a.ja=new Me;vc(a.da,C,c)}g.xd=function(a,b){var c=this;this.wa.xd(a.toString(),function(d,e){"ok"===d&&gh(c.ja,a);ai(b,d,e)})};function hh(a,b,c,d){var e=S(c);a.wa.re(b.toString(),e.H(!0),function(c,h){"ok"===c&&Oe(a.ja,b,e);ai(d,c,h)})}function ih(a,b,c,d,e){var f=S(c,d);a.wa.re(b.toString(),f.H(!0),function(c,d){"ok"===c&&Oe(a.ja,b,f);ai(e,c,d)})}
	function jh(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(I("onDisconnect().update() called with empty data.  Don't do anything."),ai(d,"ok")):a.wa.gf(b.toString(),c,function(e,f){if("ok"===e)for(var m in c){var l=S(c[m]);Oe(a.ja,b.m(m),l)}ai(d,e,f)})}function Ph(a,b,c){c=".info"===J(b.path)?a.pd.Ob(b,c):a.K.Ob(b,c);tc(a.da,b.path,c)}g.eb=function(){this.Ua&&this.Ua.eb("repo_interrupt")};g.lc=function(){this.Ua&&this.Ua.lc("repo_interrupt")};
	g.Be=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Tf(this.Xa)),a=this.Vc.get()):a=this.Xa.get();var b=Ja(qa(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ce=function(a){Vf(this.Xa,a);this.zg.zf[a]=!0};g.f=function(a){var b="";this.Ua&&(b=this.Ua.id+":");I(b,arguments)};
	function ai(a,b,c){a&&Tb(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function ci(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new W(a,b);h.hc("value",f);c={path:b,update:c,G:d,status:null,lf:Oc(),Ie:e,wf:0,Rd:function(){h.Jc("value",f)},Td:null,Da:null,bd:null,cd:null,dd:null};d=a.K.Ba(b,void 0)||F;c.bd=d;d=c.update(d.H());if(p(d)){Zd("transaction failed: Data returned ",d,c.path);c.status=1;e=je(a.nc,b);var k=e.Ea()||[];k.push(c);ke(e,k);"object"===typeof d&&null!==d&&Hb(d,".priority")?(k=A(d,".priority"),E(Xd(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Ba(b)||F).C().H();e=Yh(a);d=S(d,k);e=Pe(d,e);c.cd=d;c.dd=e;c.Da=a.vd++;c=rh(a.K,b,e,c.Da,c.Ie);vc(a.da,b,c);di(a)}else c.Rd(),c.cd=null,c.dd=null,c.G&&(a=new V(c.bd,new W(a,c.path),N),c.G(null,!1,a))}function di(a,b){var c=b||a.nc;b||ei(a,c);if(null!==c.Ea()){var d=fi(a,c);E(0<d.length,"Sending zero length transaction queue");Ka(d,function(a){return 1===a.status})&&gi(a,c.path(),d)}else c.kd()&&c.P(function(b){di(a,b)})}
	function gi(a,b,c){for(var d=Ia(c,function(a){return a.Da}),e=a.K.Ba(b,d)||F,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];E(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.wf++;var k=R(b,h.path),d=d.F(k,h.cd)}d=d.H(!0);a.wa.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(uh(a.K,c[f].Da));if(c[f].G){var h=c[f].dd,k=new W(a,c[f].path);d.push(r(c[f].G,
	null,null,!0,new V(h,k,N)))}c[f].Rd()}ei(a,je(a.nc,b));di(a);vc(a.da,b,e);for(f=0;f<d.length;f++)Tb(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(L("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Zh(a,b)}},e)}function Zh(a,b){var c=hi(a,b),d=c.path(),c=fi(a,c);ii(a,c,d);return d}
	function ii(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Ha(b,function(a){return 1===a.status}),f=Ia(f,function(a){return a.Da}),h=0;h<b.length;h++){var k=b[h],m=R(c,k.path),l=!1,u;E(null!==m,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)l=!0,u=k.Td,e=e.concat(uh(a.K,k.Da,!0));else if(1===k.status)if(25<=k.wf)l=!0,u="maxretry",e=e.concat(uh(a.K,k.Da,!0));else{var z=a.K.Ba(k.path,f)||F;k.bd=z;var G=b[h].update(z.H());p(G)?(Zd("transaction failed: Data returned ",G,
	k.path),m=S(G),"object"===typeof G&&null!=G&&Hb(G,".priority")||(m=m.ga(z.C())),z=k.Da,G=Yh(a),G=Pe(m,G),k.cd=m,k.dd=G,k.Da=a.vd++,Na(f,z),e=e.concat(rh(a.K,k.path,G,k.Da,k.Ie)),e=e.concat(uh(a.K,z,!0))):(l=!0,u="nodata",e=e.concat(uh(a.K,k.Da,!0)))}vc(a.da,c,e);e=[];l&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new W(a,b[h].path),d.push(r(b[h].G,null,null,!1,new V(b[h].bd,k,N)))):d.push(r(b[h].G,null,Error(u),!1,null))))}ei(a,a.nc);for(h=0;h<d.length;h++)Tb(d[h]);di(a)}}
	function hi(a,b){for(var c,d=a.nc;null!==(c=J(b))&&null===d.Ea();)d=je(d,c),b=D(b);return d}function fi(a,b){var c=[];ji(a,b,c);c.sort(function(a,b){return a.lf-b.lf});return c}function ji(a,b,c){var d=b.Ea();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.P(function(b){ji(a,b,c)})}function ei(a,b){var c=b.Ea();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;ke(b,0<c.length?c:null)}b.P(function(b){ei(a,b)})}
	function bi(a,b){var c=hi(a,b).path(),d=je(a.nc,b);ne(d,function(b){ki(a,b)});ki(a,d);me(d,function(b){ki(a,b)});return c}
	function ki(a,b){var c=b.Ea();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(E(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(E(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(uh(a.K,c[h].Da,!0)),c[h].G&&d.push(r(c[h].G,null,Error("set"),!1,null))));-1===f?ke(b,null):c.length=f+1;vc(a.da,b.path(),e);for(h=0;h<d.length;h++)Tb(d[h])}};function Vh(){this.nb={};this.Ff=!1}Vh.prototype.eb=function(){for(var a in this.nb)this.nb[a].eb()};Vh.prototype.lc=function(){for(var a in this.nb)this.nb[a].lc()};Vh.prototype.ce=function(a){this.Ff=a};ba(Vh);Vh.prototype.interrupt=Vh.prototype.eb;Vh.prototype.resume=Vh.prototype.lc;var Y={};Y.pc=Eg;Y.DataConnection=Y.pc;Eg.prototype.yg=function(a,b){this.va("q",{p:a},b)};Y.pc.prototype.simpleListen=Y.pc.prototype.yg;Eg.prototype.Qf=function(a,b){this.va("echo",{d:a},b)};Y.pc.prototype.echo=Y.pc.prototype.Qf;Eg.prototype.interrupt=Eg.prototype.eb;Y.If=sg;Y.RealTimeConnection=Y.If;sg.prototype.sendRequest=sg.prototype.va;sg.prototype.close=sg.prototype.close;
	Y.bg=function(a){var b=Eg.prototype.put;Eg.prototype.put=function(c,d,e,f){p(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Eg.prototype.put=b}};Y.hijackHash=Y.bg;Y.Hf=cc;Y.ConnectionTarget=Y.Hf;Y.ka=function(a){return a.ka()};Y.queryIdentifier=Y.ka;Y.eg=function(a){return a.u.Ua.aa};Y.listens=Y.eg;Y.ce=function(a){Vh.Wb().ce(a)};Y.forceRestClient=Y.ce;Y.Context=Vh;var Z={Xf:function(){hg=cg=!0}};Z.forceLongPolling=Z.Xf;Z.Yf=function(){ig=!0};Z.forceWebSockets=Z.Yf;Z.dg=function(){return bg.isAvailable()};Z.isWebSocketsAvailable=Z.dg;Z.wg=function(a,b){a.u.Ua.ze=b};Z.setSecurityDebugCallback=Z.wg;Z.Be=function(a,b){a.u.Be(b)};Z.stats=Z.Be;Z.Ce=function(a,b){a.u.Ce(b)};Z.statsIncrementCounter=Z.Ce;Z.ed=function(a){return a.u.ed};Z.dataUpdateCount=Z.ed;Z.cg=function(a,b){a.u.je=b};Z.interceptServerData=Z.cg;function li(a,b){this.committed=a;this.snapshot=b};function W(a,b){if(!(a instanceof Rh))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,vf,!1);this.then=void 0;this["catch"]=void 0}ka(W,X);g=W.prototype;g.getKey=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Kd(this.path)};
	g.m=function(a){x("Firebase.child",1,1,arguments.length);if(fa(a))a=String(a);else if(!(a instanceof M))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));ee("Firebase.child",b)}else ee("Firebase.child",a);return new W(this.u,this.path.m(a))};g.getParent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new W(this.u,a)};
	g.Zf=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Pf=function(){return this.u.$a};g.set=function(a,b){x("Firebase.set",1,2,arguments.length);fe("Firebase.set",this.path);Yd("Firebase.set",a,this.path,!1);y("Firebase.set",2,b,!0);var c=new Eb;this.u.Kb(this.path,a,null,Fb(c,b));return c.sa};
	g.update=function(a,b){x("Firebase.update",1,2,arguments.length);fe("Firebase.update",this.path);if(da(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ae("Firebase.update",a,this.path);y("Firebase.update",2,b,!0);c=new Eb;this.u.update(this.path,a,Fb(c,b));return c.sa};
	g.Kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);fe("Firebase.setWithPriority",this.path);Yd("Firebase.setWithPriority",a,this.path,!1);be("Firebase.setWithPriority",2,b);y("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new Eb;this.u.Kb(this.path,a,b,Fb(d,c));return d.sa};
	g.remove=function(a){x("Firebase.remove",0,1,arguments.length);fe("Firebase.remove",this.path);y("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);fe("Firebase.transaction",this.path);y("Firebase.transaction",1,a,!1);y("Firebase.transaction",2,b,!0);if(p(c)&&"boolean"!=typeof c)throw Error(Bb("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new Eb;ga(b)&&Gb(d.sa);ci(this.u,this.path,a,function(a,c,
	h){a?d.reject(a):d.resolve(new li(c,h));ga(b)&&b(a,c,h)},c);return d.sa};g.vg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);fe("Firebase.setPriority",this.path);be("Firebase.setPriority",1,a);y("Firebase.setPriority",2,b,!0);var c=new Eb;this.u.Kb(this.path.m(".priority"),a,null,Fb(c,b));return c.sa};
	g.push=function(a,b){x("Firebase.push",0,2,arguments.length);fe("Firebase.push",this.path);Yd("Firebase.push",a,this.path,!0);y("Firebase.push",2,b,!0);var c=Xh(this.u),d=Pd(c),c=this.m(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.m(d)});c.then=r(f.then,f);c["catch"]=r(f.then,f,void 0);ga(b)&&Gb(f)}return c};g.kb=function(){fe("Firebase.onDisconnect",this.path);return new U(this.u,this.path)};W.prototype.child=W.prototype.m;W.prototype.set=W.prototype.set;W.prototype.update=W.prototype.update;
	W.prototype.setWithPriority=W.prototype.Kb;W.prototype.remove=W.prototype.remove;W.prototype.transaction=W.prototype.transaction;W.prototype.setPriority=W.prototype.vg;W.prototype.push=W.prototype.push;W.prototype.onDisconnect=W.prototype.kb;id(W.prototype,"database",W.prototype.Pf);id(W.prototype,"key",W.prototype.getKey);id(W.prototype,"parent",W.prototype.getParent);id(W.prototype,"root",W.prototype.Zf);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=Vh.Wb(),c=a.options.databaseURL;p(c)||Xc("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Yc(c),c=d.kc;ge("Invalid Firebase Database URL",d);d.path.e()||Xc("Database URL must point to the root of a Firebase Database (not including a child path).");(d=A(b.nb,a.name))&&Xc("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Rh(c,b.Ff,a);b.nb[a.name]=
	d;return d.$a},{Reference:W,Query:X,Database:Qh,enableLogging:Uc,INTERNAL:Z,TEST_ACCESS:Y,ServerValue:Th})}catch(mi){Xc("Failed to register the Firebase Database Service ("+mi+")")};})();
	module.exports = firebase.database;


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  noData: {
	    name: 'no data :(',
	    points: []
	  }
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _config = null;

	function beginDraw(event) {
	  _config.state.drawing = true;
	}

	function stopDraw(event) {
	  _config.state.drawing = false;
	}

	function prepareToDraw() {
	  _config.state.drawMode = true;
	  clear();
	  _config.state.elements.clearButton.style.display = 'inline';
	  _config.state.elements.saveButton.style.display = 'inline';
	  _config.state.elements.signButton.style.display = 'none';
	  _config.state.elements.nextButton.style.display = 'none';
	  _config.state.elements.prevButton.style.display = 'none';
	  _config.state.elements.cancelButton.style.display = 'inline';
	  _config.state.elements.nameInput.removeAttribute('readonly');
	  _config.state.elements.nameInput.value = '';
	  _config.state.currentIndex = 0;
	  _config.state.drawingIndex = 0;
	  var colors = _config.state.elements.colors;
	  for (var i = 0; i < colors.length; i++) {
	    colors[i].style.display = 'inline';
	  }
	}

	function cancelDraw() {
	  _config.state.drawMode = false;
	  clear();
	  _config.state.elements.clearButton.style.display = 'none';
	  _config.state.elements.saveButton.style.display = 'none';
	  _config.state.elements.signButton.style.display = 'inline';
	  _config.state.elements.nextButton.style.display = 'inline';
	  _config.state.elements.prevButton.style.display = 'inline';
	  _config.state.elements.cancelButton.style.display = 'none';
	  _config.state.elements.nameInput.value = 'draw by: ' + _config.state.currentName;
	  _config.state.elements.nameInput.setAttribute('readonly', 'readonly');
	  _config.state.currentIndex = 0;
	  _config.state.drawingIndex = 0;
	  var colors = _config.state.elements.colors;
	  for (var i = 0; i < colors.length; i++) {
	    colors[i].style.display = 'none';
	  }

	  drawPoints(_config.state.currentPoints, _config.state.currentIndex);
	}

	function drawDone() {
	  _config.state.drawMode = false;
	  _config.state.elements.clearButton.style.display = 'none';
	  _config.state.elements.saveButton.style.display = 'none';
	  _config.state.elements.nextButton.style.display = 'inline';
	  _config.state.elements.prevButton.style.display = 'inline';
	  _config.state.elements.cancelButton.style.display = 'none';
	  _config.state.drawingIndex = 0;
	  _config.state.currentIndex = -1;
	  var colors = _config.state.elements.colors;
	  for (var i = 0; i < colors.length; i++) {
	    colors[i].style.display = 'none';
	  }
	}

	function draw(event) {
	  event.preventDefault();
	  if (_config.state.drawing && _config.state.drawMode) {
	    _config.state.hasDrawData = true;
	    event.target.style.backgroundColor = _config.state.currentColor;
	    event.target.setAttribute('data-draw', _config.state.currentColor);
	  }
	}

	function setColor(event) {
	  _config.state.currentColor = event.target.style.backgroundColor;
	}

	function clear() {
	  for (var i = 0; i < _config.state.elements.squares.length; i++) {
	    _config.state.elements.squares[i].style.backgroundColor = _config.squareColor;
	    _config.state.elements.squares[i].removeAttribute('data-draw');
	  }
	  _config.state.hasDrawData = false;
	}

	function drawData(data, currentIndex) {
	  _config.state.elements.nameInput.value = 'draw by: ' + data.name;
	  drawPoints(data.points, currentIndex);
	}

	function drawPoints(points, currentIndex) {
	  if (points.length < 1 || currentIndex != _config.state.drawingIndex || _config.state.drawMode) {
	    _config.state.drawingServerData = false;
	    return;
	  }
	  _config.state.drawingServerData = true;
	  var rand = Math.floor(Math.random() * points.length);
	  _config.state.elements.squares[points[rand].index].style.backgroundColor = points[rand].color;

	  setTimeout(function () {
	    points.splice(rand, 1);
	    drawPoints(points, currentIndex);
	  }, 50);
	}

	exports.default = function (config) {
	  _config = config;
	  return {
	    beginDraw: beginDraw,
	    stopDraw: stopDraw,
	    draw: draw,
	    setColor: setColor,
	    clear: clear,
	    drawData: drawData,
	    prepareToDraw: prepareToDraw,
	    cancelDraw: cancelDraw,
	    drawDone: drawDone
	  };
	};

/***/ }
/******/ ]);