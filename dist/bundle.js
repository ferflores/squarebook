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

	var _drawingActions = __webpack_require__(34);

	var _drawingActions2 = _interopRequireDefault(_drawingActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _config = {
	  state: {
	    currentColor: '#FF0000',
	    currentIndex: -1,
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
	  drawingActions: null
	};

	function render() {
	  (0, _styles2.default)(_config);
	  (0, _ui2.default)(_config).build();
	  (0, _events2.default)(_config);
	}

	function squarebook(config) {
	  if (config) {
	    if (!config.postDataUrl || !config.getDataUrl || !config.container) {
	      throw new Error('squarebook: container, postDataUrl and getDataUrl are required in configuration');
	    } else {
	      _config = Object.assign(_config, config);
	      _config.serverActions = (0, _serverActions2.default)(_config);
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

	var dActions = null;
	var _config = null;

	function postData() {
	  var name = document.getElementById('squarebook_nameInput');

	  if (!_config.state.hasDrawData) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Draw something!');
	  } else if (name.value.length < 3) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Please input your name!');
	  } else {
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
	    });
	  }
	}

	function handlePostResponse() {
	  _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'Your draw has been saved, thanks!');
	  _config.drawingActions.drawDone();
	  getRequest(0, 1);
	}

	function handleGetResponse(data) {
	  _config.state.currentPoints = data.points.slice(0);
	  _config.state.currentName = data.name;
	  _config.drawingActions.drawData(data, _config.state.drawingIndex);
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
	    if (!response.data.lastItem) {
	      _config.state.drawingIndex = _config.state.currentIndex;
	      handleGetResponse(response.data);
	      _config.state.currentIndex += increment;
	      _keyStorage2.default.set('signed', 'true');
	    } else {
	      _config.state.topIndex = index;
	      _errorMessage2.default.displayMessage(_config.state.elements.wrapper, 'There are no more items!');
	    }
	    _config.state.loading = false;
	  }).catch(function (error) {
	    _errorMessage2.default.displayMessage(_config.state.elements.wrapper, error);
	    _config.state.loading = true;
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