(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xsdk"] = factory();
	else
		root["xsdk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _enum = __webpack_require__(1);

	var _xui = __webpack_require__(2);

	var _xui2 = _interopRequireDefault(_xui);

	var _dataStorage = __webpack_require__(3);

	var _dataStorage2 = _interopRequireDefault(_dataStorage);

	var _websocket = __webpack_require__(4);

	var _websocket2 = _interopRequireDefault(_websocket);

	var _mqtt = __webpack_require__(66);

	var _mqtt2 = _interopRequireDefault(_mqtt);

	var _lang = __webpack_require__(60);

	var _events = __webpack_require__(59);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _instance = {}; // 保存sdk实例，每种类型只保留一个实例

	function XSDK(type, option) {
	  if (!(0, _lang.isString)(type)) {
	    throw new TypeError('error params');
	  }
	  if (type === _enum.SDKType.WEBSOCKET) {
	    // 发送数据时，数据项不能为空
	    if (option.type && option.type === 'platform') {
	      if (!(0, _lang.isPlainObject)(option) || !(0, _lang.isString)(option.host)) {
	        throw new TypeError('error params');
	      }
	    } else {
	      if (!(0, _lang.isPlainObject)(option) || !(0, _lang.isString)(option.host) || !(0, _lang.isString)(option.userid) || !(0, _lang.isString)(option.authorize)) {
	        throw new TypeError('error params');
	      }
	    }
	  }
	  // 借用构造函数继承
	  _events2.default.call(this);

	  var alias = option ? type + '_' + option.host : type;
	  if (this instanceof XSDK) {
	    if (_instance[alias] === undefined) {
	      switch (type) {
	        case _enum.SDKType.WIFI:
	          break;
	        case _enum.SDKType.BLUETOOTH:
	          break;
	        case _enum.SDKType.WEBSOCKET:
	          (0, _websocket2.default)(this, option);
	          break;
	        case _enum.SDKType.MQTT:
	          (0, _mqtt2.default)(this, option);
	          break;
	        default:
	          throw new Error(type + ' is not support');
	      }
	      this.type = type;
	      _instance[alias] = this;
	      _distorySdkBind(this, alias);
	    } else {
	      return _instance[alias];
	    }
	  } else {
	    return new XSDK(type, option);
	  }
	}

	function _distorySdkBind(sdk, alias) {
	  // 监听实例的销毁
	  sdk.on(_enum.SDKEvent.DESTORY, function () {
	    delete _instance[alias];
	  });
	}

	// 原型琏继承
	Object.setPrototypeOf(XSDK.prototype, _events2.default.prototype);

	XSDK.getXUI = _xui2.default;
	XSDK.getDataStorage = _dataStorage2.default;

	window.XSDK = XSDK;

	exports.default = XSDK;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SDKEvent = {
	  READY: 'ready', // SDK 就绪，可以扫描设备
	  STATUSCHANGE: 'statuschange', // SDK状态，即蓝牙和WIFI状态改变事件 见SDKStatus
	  STARTSCAN: 'startscan', // 开始扫描设备
	  CANCELSCAN: 'cancelscan', // 取消扫描设备
	  DEVICESREADY: 'devicesready', // 添加或扫描设备完成
	  ADDDEVICES: 'adddevices', // 添加设备
	  DESTORY: 'destory', // 销毁一个连接实例
	  UIBACK: 'uiback', // android系统的后退按钮事件
	  TRACELOGS: 'traceLogs', // 添加设备日志事件请求
	  TRACELOG: 'traceLog', // 设备日志事件
	  DISCONNECT: 'disconnect', // 断开连接
	  TRACESTATUS: 'traceStatus', // 设备日志事件输出状态
	  ERROR: 'error'
	};

	var deviceEvent = {
	  LOG: 'log',
	  CONNECT: 'connect', // 连接设备
	  DISCONNECT: 'disconnect', // 断开设备连接
	  DATA: 'data', // 设备数据更新
	  PROBE: 'probe', // 查询设备状态
	  ALERT: 'alert', // 设备告警
	  SUBSCRIBE: 'subscribe', // 订阅设备
	  UNSUBSCRIBE: 'unsubscribe', // 取消订阅设备
	  SENDDATA: 'senddata', // 发送设备数据
	  STATUSCHANGE: 'statuschange', // 设备状态改变，上线(1)或者下线(0) 见deviceStatus
	  ERROR: 'error'
	};

	var SDKType = {
	  WIFI: 'wifi',
	  BLUETOOTH: 'bluetooth',
	  WEBSOCKET: 'websocket',
	  MQTT: 'mqtt'
	};

	var errorCode = {
	  LOGINFAIL: 0 // 登录失败
	};

	var deviceStatus = {
	  ONLINE: 1,
	  OFFLINE: 0
	};

	var subscribeType = {
	  sync: '$6', // 设备上报数据端点!（订阅）
	  setPoint: '$8', // 应用设置数据端点结果!（订阅）
	  getPoint: '$a', // 应用获取数据端点结果（订阅）
	  notifyEvent: '$d', // 应用通知事件
	  event: '$e', // 系统事件
	  sub: '$g', // 订阅设备结果（订阅）
	  log: '$k', // 设备日志!（订阅）
	  ticket: '$m' // 设备返回Ticket（订阅）
	};
	var sendType = {
	  setPoint: '$7', // 应用设置/发送数据端点（发送）
	  getPoint: '$9', // 应用获取数据端点（发送）
	  offline: '$b', // 应用下线（发送）
	  sub: '$f', // 订阅设备(发送)
	  ticket: '$l' // 获取设备Ticket（发送）
	};

	exports.SDKEvent = SDKEvent;
	exports.SDKType = SDKType;
	exports.deviceEvent = deviceEvent;
	exports.errorCode = errorCode;
	exports.deviceStatus = deviceStatus;
	exports.subscribeType = subscribeType;
	exports.sendType = sendType;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _enum = __webpack_require__(1);

	var _xui = {
	  on: _on,
	  scanQCode: _scanQCode,
	  selectImage: _selectImage,
	  setTitleBar: _setTitleBar,
	  setNotify: _setNotify,
	  getSystemInfo: _getSystemInfo
	};

	function getXUI() {
	  return _xui;
	}

	function _on(event) {
	  switch (event) {
	    case _enum.SDKEvent.UIBACK:
	      break;
	    default:
	      console.warn('event: ' + event + 'is not support');
	      break;
	  }
	}

	function _scanQCode() {}

	function _selectImage() {}

	function _setTitleBar() {}

	function _setNotify() {}

	function _getSystemInfo() {}

	exports.default = getXUI;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var _dataStorage = {
	  get: _get,
	  put: _put,
	  remove: _remove,
	  insert: _insert,
	  find: _find,
	  update: _update,
	  delete: _delete
	};

	function getDataStorage() {
	  return _dataStorage;
	}

	function _get(key, table) {
	  if (table === undefined) {
	    // 在默认表中获取数据
	  } else {
	      // 在table表中获取数据
	    }
	}

	function _put(key, value, table) {
	  if (table === undefined) {
	    // 在默认表中获取数据
	  } else {
	      // 在table表中添加数据
	    }
	}

	function _remove(key, table) {
	  if (table === undefined) {
	    // 在默认表中获取数据
	  } else {
	      // 在table表中添加数据
	    }
	}

	function _insert(data, collection) {
	  // 调用容器方法插入数据
	}

	function _find(collection, condition) {
	  // 调用容器方法查找数据
	}

	function _update(value, collection, query) {
	  // 调用容器方法更新数据
	}

	function _delete(collection, query) {
	  // 调用容器方法删除数据
	}

	exports.default = getDataStorage;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket2 = __webpack_require__(5);

	var _socket3 = _interopRequireDefault(_socket2);

	var _enum = __webpack_require__(1);

	var _device = __webpack_require__(58);

	var _device2 = _interopRequireDefault(_device);

	var _lang = __webpack_require__(60);

	var _debug = __webpack_require__(61);

	var _debug2 = _interopRequireDefault(_debug);

	var _base = __webpack_require__(64);

	var _base2 = _interopRequireDefault(_base);

	var _protocol = __webpack_require__(65);

	var _protocol2 = _interopRequireDefault(_protocol);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var log = (0, _debug2.default)('xsdk-websocket');
	var _socket;
	var _xsdk; // 通过sdk事件暴露出去this
	var _devices = {};
	var _messages = {};
	var _curMessageId = 0;
	var MAX_MESSAGE_SIZE = 256;
	var isPlatform = false;
	var isappLogin = false;

	function initWebsocket(xsdk, option) {
	  xsdk.host = option.host;
	  _xsdk = xsdk;

	  _protocol2.default.setDpVersion(option.dp_version);
	  _createSocketIO(option);
	  _listenSdkEvent();
	}

	function _createSocketIO(option) {
	  log('init socket-io');

	  if (!_socket3.default) {
	    throw new Error('socket.io do not exsit');
	  }

	  if (option.type && option.type === 'platform') {
	    isPlatform = true;
	    // _socket = io.connect(option.host, {'force new connection': true})
	    _socket = (0, _socket3.default)(option.host, { forceNew: true });
	  } else {
	    _socket = (0, _socket3.default)(option.host);
	  }

	  // 注册socket的状态的监听事件
	  _socket.on('connect', function () {
	    if (isPlatform) {
	      _loginRecv();
	    } else {
	      _appLogin(option);
	    }
	  }).on('sync', function (data) {
	    // 接受数据端点上报
	    _syncDeviceInfo(data);
	  }).on('app.login', function (data) {
	    // 登录
	    _loginRecv(data);
	  }).on('set', function (data) {
	    // 登录
	    _setRecv(data);
	  }).on('probe', function (data) {
	    // 请求数据端点数据
	    _probeRecv(data);
	  }).on('pipe', function (data) {
	    // 接受透传数据上报
	    _pipeRecv(data);
	  }).on('pipe_sync', function (data) {
	    // 接受透传广播数据上报
	    _pipeRecv(data);
	  }).on('event.notify', function (data) {
	    // 接受设备上下线状态
	    _eventNotify(data);
	  }).on('trace.log', function (data) {
	    // 输入日志
	    _outputLogs(data);
	  }).on('trace.status', function (data) {
	    // 输出状态
	    _outputLogs(data);
	  }).on('error', function (error) {
	    _xsdk && _xsdk.emit(_enum.SDKEvent.ERROR, error);
	  });
	}

	// 监听sdk的事件
	function _listenSdkEvent() {
	  _xsdk.on(_enum.SDKEvent.ADDDEVICES, function (deviceLists) {
	    // 1. 添加设备事件
	    _createDevices(deviceLists);
	  }).on(_enum.SDKEvent.DESTORY, function () {
	    // 销毁socket事件
	    _distorySdk();
	  });
	}

	// 销毁sdk
	function _distorySdk() {
	  if (!_socket) return;
	  if (isPlatform) {
	    clearVariables();
	  } else {
	    if (isappLogin) {
	      _socket.emit(_protocol2.default.logout.events, (0, _lang.clone)(_protocol2.default.logout.params), function (data) {
	        clearVariables();
	      });
	    } else {
	      clearVariables();
	    }
	  }
	}

	// 清除变量
	function clearVariables() {
	  if (!_socket) return;
	  _socket.close();
	  _socket = null;
	  _xsdk = null;
	  _devices = {};
	}

	// 创造一个设备监听的类
	function _createDevices(deviceLists) {
	  if (deviceLists && deviceLists.length) {
	    var added = [];
	    deviceLists.forEach(function (item) {
	      var device = new _device2.default();
	      device.id = item.device_id;
	      // device.mac = item.device_mac
	      // device.pid = item.device_pid
	      device.on(_enum.deviceEvent.SENDDATA, function (data, cb) {
	        _sendData(this.id, data, cb);
	      });
	      device.on(_enum.deviceEvent.PROBE, function (cb) {
	        _probeDevice(this.id, cb);
	      });

	      device.on(_enum.deviceEvent.LOG, function (token, cb) {
	        _log(this.id, token, cb);
	      });
	      added.push(device);
	      _devices[device.id] = device;
	    });
	    _xsdk.emit(_enum.SDKEvent.DEVICESREADY, added);
	  }
	}

	function _probeDevice(deviceId, cb) {
	  if (!_socket) {
	    throw new Error('xsdk not init');
	  }
	  var params = (0, _lang.clone)(_protocol2.default.probe.params);
	  params.device_id = deviceId;
	  params.message_id = _genMessageId();
	  _messages[params.message_id] = cb;
	  _socket.emit(_protocol2.default.probe.events, params);
	}

	function _sendData(deviceId, data, cb) {
	  if (!_socket) {
	    throw new Error('xsdk not init');
	  }
	  if (!(0, _lang.isPlainObject)(data) && (0, _lang.isArray)(data.data)) {
	    throw new Error('params error');
	  }
	  var params;
	  if (data.type === 'datapoint' && (0, _lang.isArray)(data.data)) {
	    // 设置数据端点
	    params = (0, _lang.clone)(_protocol2.default.set.params);
	    params.device_id = deviceId;
	    params.message_id = _genMessageId();
	    _messages[params.message_id] = cb;
	    params.datapoint = [];

	    data.data.forEach(function (item) {
	      var temp = {};
	      temp[item.index] = item.value;
	      params.datapoint.push(temp);
	    });
	    // 设置数据端点
	    _socket.emit(_protocol2.default.set.events, params);
	  } else if (data.type === 'pipe') {
	    // 发送透传字符串
	    params = (0, _lang.clone)(_protocol2.default.pipe.params);

	    params.pipe = {
	      encode: 'base64',
	      data: _base2.default.encode(data.data)
	    };

	    params.to_id = deviceId;
	    params.message_id = _genMessageId();
	    _messages[params.message_id] = cb;

	    // 发送透传数据
	    _socket.emit(_protocol2.default.pipe.events, params);
	  }
	}

	// 返回设备日志
	function _log(id, token, cb) {
	  if (_socket) {
	    if (!id || !token) {
	      throw new Error('deviceId or token do not exsit');
	    }
	    _socket.emit('trace.logs', {
	      id: id,
	      token: token
	    });
	    _messages['log' + id] = cb;
	    _messages.status = cb;
	  }
	}

	// 输出设备日志
	function _outputLogs(data) {
	  var cb = null;
	  if (data && data.id) {
	    cb = _messages['log' + data.id];
	    data.type = 'log';
	  } else if (data && data.status) {
	    cb = _messages.status;
	    data.type = 'status';
	  }
	  if (!cb || !(0, _lang.isFunction)(cb)) {
	    return;
	  }
	  cb(data);
	}

	function _setRecv(data) {
	  if (!data.is_resp) {
	    return;
	  }
	  var cb = _messages[data.message_id];
	  if (!cb || !(0, _lang.isFunction)(cb)) {
	    return;
	  }
	  cb({
	    status: data.errcode,
	    msg: data.errmsg
	  });
	}

	function _probeRecv(data) {
	  if (!data.is_resp) {
	    return;
	  }
	  var cb = _messages[data.message_id];
	  if (!cb || !(0, _lang.isFunction)(cb)) {
	    return;
	  }
	  if (data.errcode) {
	    // 0表示成功 10 表示设备离线
	    cb({
	      status: data.errcode,
	      msg: data.errmsg,
	      deviceId: data.device_id
	    });
	    return;
	  }

	  if (cb && data.data && data.data.datapoint && (0, _lang.isArray)(data.data.datapoint)) {
	    var dps = [];
	    data.data.datapoint.forEach(function (item) {
	      var temp = {
	        index: item.index,
	        value: item.value
	      };
	      dps.push(temp);
	    });
	    cb({
	      status: 0,
	      data: dps,
	      deviceId: data.device_id
	    });
	  }
	}

	function _loginRecv() {
	  isappLogin = true;
	  if (!_xsdk) {
	    return;
	  }
	  _xsdk.emit(_enum.SDKEvent.READY); // 1设备准备就绪
	}

	function _eventNotify(data) {
	  if (!(data && data.from && _devices[data.notify.data.device_id])) {
	    return;
	  }
	  var device = _devices[data.notify.data.device_id];
	  if (data.notify.type === 2) {
	    // 设备告警
	    device.emit(_enum.deviceEvent.ALERT, data.notify.data);
	  } else if (data.notify.type === 5 && (data.notify.data.type === 'offline' || data.notify.data.type === 'online')) {
	    // 设备在线状态变化
	    if (data.notify.data.type === 'offline') {
	      device.emit(_enum.deviceEvent.STATUSCHANGE, _enum.deviceStatus.OFFLINE);
	    } else {
	      device.emit(_enum.deviceEvent.STATUSCHANGE, _enum.deviceStatus.ONLINE);
	    }
	  }
	}

	function _pipeRecv(data) {
	  if (data.is_resp) {
	    // 返回信息
	    var cb = _messages[data.message_id];
	    if (cb && (0, _lang.isFunction)(cb)) {
	      cb({ // 0表示成功，其他失败
	        status: data.errcode,
	        msg: data.errmsg
	      });
	    }
	    return;
	  }

	  if (!data.from_id || !_devices[data.from_id]) {
	    return;
	  }
	  var device = _devices[data.from_id];
	  if (data.pipe && data.pipe.encode === 'base64') {
	    var decodedArr = _base2.default.decode(data.pipe.data);
	    device.emit(_enum.deviceEvent.DATA, {
	      type: 'pipe',
	      data: decodedArr,
	      deviceId: device.id
	    });
	  }
	  if (data.pipe_sync && data.pipe_sync.encode === 'base64') {
	    var _decodedArr = _base2.default.decode(data.pipe_sync.data);
	    device.emit(_enum.deviceEvent.DATA, {
	      type: 'pipe_sync',
	      data: _decodedArr,
	      deviceId: device.id
	    });
	  }
	}

	// 所有的获取数据端点
	function _syncDeviceInfo(data) {
	  if (!data.device_id || !_devices[data.device_id]) {
	    return;
	  }
	  var device = _devices[data.device_id];
	  device.emit(_enum.deviceEvent.DATA, {
	    type: 'datapoint',
	    data: data.datapoint,
	    deviceId: device.id
	  });
	}

	function _appLogin(option) {
	  var params = (0, _lang.clone)(_protocol2.default.appLogin.params);
	  params.app_id = option.userid;
	  params.authorize_code = option.authorize;
	  _socket.emit(_protocol2.default.appLogin.events, params);
	}

	function _genMessageId() {
	  _curMessageId++;
	  if (_curMessageId >= MAX_MESSAGE_SIZE) {
	    _curMessageId = 0;
	  }
	  return _curMessageId;
	}

	exports.default = initWebsocket;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var url = __webpack_require__(6);
	var parser = __webpack_require__(12);
	var Manager = __webpack_require__(23);
	var debug = __webpack_require__(8)('socket.io-client');

	/**
	 * Module exports.
	 */

	module.exports = exports = lookup;

	/**
	 * Managers cache.
	 */

	var cache = exports.managers = {};

	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */

	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }

	  opts = opts || {};

	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;

	  var io;

	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = parser.protocol;

	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */

	exports.connect = lookup;

	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */

	exports.Manager = __webpack_require__(23);
	exports.Socket = __webpack_require__(53);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */

	var parseuri = __webpack_require__(7);
	var debug = __webpack_require__(8)('socket.io-client:url');

	/**
	 * Module exports.
	 */

	module.exports = url;

	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */

	function url (uri, loc) {
	  var obj = uri;

	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;

	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }

	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }

	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }

	  obj.path = obj.path || '/';

	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

	  return obj;
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];

	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(10);
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
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
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
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
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
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

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
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(11);

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

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

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

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

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
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
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


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(13)('socket.io-parser');
	var json = __webpack_require__(16);
	var Emitter = __webpack_require__(19);
	var binary = __webpack_require__(20);
	var isBuf = __webpack_require__(22);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = 4;

	/**
	 * Packet types.
	 *
	 * @api public
	 */

	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];

	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */

	exports.CONNECT = 0;

	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */

	exports.DISCONNECT = 1;

	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */

	exports.EVENT = 2;

	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */

	exports.ACK = 3;

	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */

	exports.ERROR = 4;

	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */

	exports.BINARY_EVENT = 5;

	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */

	exports.BINARY_ACK = 6;

	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */

	exports.Encoder = Encoder;

	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */

	exports.Decoder = Decoder;

	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */

	function Encoder() {}

	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */

	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);

	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};

	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */

	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;

	  // first is type
	  str += obj.type;

	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }

	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }

	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }

	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }

	  debug('encoded %j as %s', obj, str);
	  return str;
	}

	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */

	function encodeAsBinary(obj, callback) {

	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;

	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }

	  binary.removeBlobs(obj, writeEncoding);
	}

	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */

	function Decoder() {
	  this.reconstructor = null;
	}

	/**
	 * Mix in `Emitter` with Decoder.
	 */

	Emitter(Decoder.prototype);

	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */

	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);

	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};

	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */

	function decodeString(str) {
	  var p = {};
	  var i = 0;

	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();

	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }

	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }

	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }

	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }

	  debug('decoded %s as %j', str, p);
	  return p;
	}

	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};

	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */

	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};

	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */

	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}

	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */

	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};

	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */

	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};

	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(14);
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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	
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
	exports.humanize = __webpack_require__(15);

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


/***/ }),
/* 15 */
/***/ (function(module, exports) {

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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(18);

	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };

	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }

	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());

	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];

	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }

	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;

	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}

	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }

	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";

	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");

	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }

	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }

	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;

	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;

	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;

	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };

	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };

	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };

	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };

	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };

	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }

	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;

	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };

	        // Internal: Stores the parser state.
	        var Index, Source;

	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };

	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };

	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };

	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };

	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };

	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }

	    exports["runInContext"] = runInContext;
	    return exports;
	  }

	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;

	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));

	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }

	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module), (function() { return this; }())))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

	/**
	 * Module requirements
	 */

	var isArray = __webpack_require__(21);
	var isBuf = __webpack_require__(22);

	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */

	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;

	  function _deconstructPacket(data) {
	    if (!data) return data;

	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }

	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};

	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */

	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;

	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }

	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};

	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */

	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;

	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;

	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }

	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };

	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }

	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;

	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */

	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var eio = __webpack_require__(24);
	var Socket = __webpack_require__(53);
	var Emitter = __webpack_require__(41);
	var parser = __webpack_require__(12);
	var on = __webpack_require__(55);
	var bind = __webpack_require__(56);
	var debug = __webpack_require__(8)('socket.io-client:manager');
	var indexOf = __webpack_require__(51);
	var Backoff = __webpack_require__(57);

	/**
	 * IE6+ hasOwnProperty
	 */

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Module exports
	 */

	module.exports = Manager;

	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */

	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};

	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}

	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */

	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};

	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */

	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Manager.prototype);

	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};

	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};

	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};

	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};

	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};

	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};

	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */

	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};

	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */

	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;

	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;

	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });

	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });

	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);

	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }

	  this.subs.push(openSub);
	  this.subs.push(errorSub);

	  return this;
	};

	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */

	Manager.prototype.onopen = function () {
	  debug('open');

	  // clear old subs
	  this.cleanup();

	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');

	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};

	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */

	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};

	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */

	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};

	/**
	 * Called with data.
	 *
	 * @api private
	 */

	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};

	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */

	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */

	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};

	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */

	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });

	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }

	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }

	  return socket;
	};

	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */

	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;

	  this.close();
	};

	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};

	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */

	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};

	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */

	Manager.prototype.cleanup = function () {
	  debug('cleanup');

	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }

	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;

	  this.decoder.destroy();
	};

	/**
	 * Close the current socket.
	 *
	 * @api private
	 */

	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};

	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */

	Manager.prototype.onclose = function (reason) {
	  debug('onclose');

	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);

	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};

	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */

	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;

	  var self = this;

	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);

	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;

	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);

	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;

	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};

	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */

	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(25);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(26);

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(33);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var transports = __webpack_require__(27);
	var Emitter = __webpack_require__(41);
	var debug = __webpack_require__(45)('engine.io-client:socket');
	var index = __webpack_require__(51);
	var parser = __webpack_require__(33);
	var parseuri = __webpack_require__(7);
	var parsejson = __webpack_require__(52);
	var parseqs = __webpack_require__(42);

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;

	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }

	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }

	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;

	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = parser.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(32);
	Socket.transports = __webpack_require__(27);
	Socket.parser = __webpack_require__(33);

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;

	  // transport name
	  query.transport = name;

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });

	  return transport;
	};

	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport () {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose () {
	    onerror('transport closed');
	  }

	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }

	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();
	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */

	var XMLHttpRequest = __webpack_require__(28);
	var XHR = __webpack_require__(30);
	var JSONP = __webpack_require__(48);
	var websocket = __webpack_require__(49);

	/**
	 * Export transports.
	 */

	exports.polling = polling;
	exports.websocket = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

	var hasCORS = __webpack_require__(29);

	module.exports = function (opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }

	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */

	var XMLHttpRequest = __webpack_require__(28);
	var Polling = __webpack_require__(31);
	var Emitter = __webpack_require__(41);
	var inherit = __webpack_require__(43);
	var debug = __webpack_require__(45)('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	module.exports = XHR;
	module.exports.Request = Request;

	/**
	 * Empty function
	 */

	function empty () {}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(XHR, Polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;

	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }

	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }

	  if (global.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }

	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function () {
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	Request.requestsCount = 0;
	Request.requests = {};

	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(32);
	var parseqs = __webpack_require__(42);
	var parser = __webpack_require__(33);
	var inherit = __webpack_require__(43);
	var yeast = __webpack_require__(44);
	var debug = __webpack_require__(45)('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	module.exports = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(28);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(Polling, Transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function () {
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function (onPause) {
	  var self = this;

	  this.readyState = 'pausing';

	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function () {
	  var self = this;

	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };

	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(33);
	var Emitter = __webpack_require__(41);

	/**
	 * Module exports.
	 */

	module.exports = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var keys = __webpack_require__(34);
	var hasBinary = __webpack_require__(35);
	var sliceBuffer = __webpack_require__(36);
	var after = __webpack_require__(37);
	var utf8 = __webpack_require__(38);

	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(39);
	}

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};

	var packetslist = keys(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */

	var Blob = __webpack_require__(40);

	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;

	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }

	  return callback('' + encoded);

	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);

	  return callback(blob);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary(packets);

	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);

	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = ''
	    , n, msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      msg = data.substr(i + 1, n);

	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }

	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);

	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }

	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }

	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }

	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;

	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }

	      msgLength += tailArray[i];
	    }

	    if(numberTooLong) return callback(err, 0, 1);

	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(21);

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(data) {

	  function _hasBinary(obj) {
	    if (!obj) return false;

	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }

	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }

	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  return _hasBinary(data);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = after

	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count

	    return (count === 0) ? callback() : proxy

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}

	function noop() {}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {

		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;

		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid WTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)(module), (function() { return this; }())))

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";

	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }

	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";

	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];

	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }

	    return arraybuffer;
	  };
	})();


/***/ }),
/* 40 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};

	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};

	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	exports.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	'use strict';

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;

	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(46);
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
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style) ||
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
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
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
	    return exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (typeof process !== 'undefined' && 'env' in process) {
	    return process.env.DEBUG;
	  }
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug.debug = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(47);

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

	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

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

	    // apply env-specific formatting
	    args = exports.formatArgs.apply(self, args);

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
	    namespaces = split[i].replace(/[\\^$+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*?');
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


/***/ }),
/* 47 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000
	var m = s * 60
	var h = m * 60
	var d = h * 24
	var y = d * 365.25

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {}
	  var type = typeof val
	  if (type === 'string' && val.length > 0) {
	    return parse(val)
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ?
				fmtLong(val) :
				fmtShort(val)
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
	}

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str)
	  if (str.length > 10000) {
	    return
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
	  if (!match) {
	    return
	  }
	  var n = parseFloat(match[1])
	  var type = (match[2] || 'ms').toLowerCase()
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n
	    default:
	      return undefined
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd'
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h'
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm'
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's'
	  }
	  return ms + 'ms'
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms'
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's'
	}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */

	var Polling = __webpack_require__(31);
	var inherit = __webpack_require__(43);

	/**
	 * Module exports.
	 */

	module.exports = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Noop.
	 */

	function empty () { }

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling (opts) {
	  Polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(JSONPPolling, Polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  Polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete () {
	    initIframe();
	    fn();
	  }

	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch (e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(32);
	var parser = __webpack_require__(33);
	var parseqs = __webpack_require__(42);
	var inherit = __webpack_require__(43);
	var yeast = __webpack_require__(44);
	var debug = __webpack_require__(45)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(50);
	  } catch (e) { }
	}

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}

	/**
	 * Module exports.
	 */

	module.exports = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(WS, Transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }

	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function () {
	  var self = this;

	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done () {
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	
	var indexOf = [].indexOf;

	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */

	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;

	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }

	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }

	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(12);
	var Emitter = __webpack_require__(41);
	var toArray = __webpack_require__(54);
	var on = __webpack_require__(55);
	var bind = __webpack_require__(56);
	var debug = __webpack_require__(8)('socket.io-client:socket');
	var hasBin = __webpack_require__(35);

	/**
	 * Module exports.
	 */

	module.exports = exports = Socket;

	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */

	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};

	/**
	 * Shortcut to `Emitter#emit`.
	 */

	var emit = Emitter.prototype.emit;

	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */

	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */

	Socket.prototype.subEvents = function () {
	  if (this.subs) return;

	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};

	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */

	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;

	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};

	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};

	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }

	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };

	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;

	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }

	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }

	  delete this.flags;

	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};

	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */

	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');

	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};

	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */

	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};

	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;

	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;

	    case parser.EVENT:
	      this.onevent(packet);
	      break;

	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;

	    case parser.ACK:
	      this.onack(packet);
	      break;

	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;

	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;

	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};

	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);

	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }

	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};

	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */

	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);

	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};

	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};

	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */

	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};

	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */

	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];

	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};

	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */

	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};

	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */

	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }

	  this.io.destroy(this);
	};

	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }

	  // remove socket from pool
	  this.destroy();

	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};

	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

	module.exports = toArray

	function toArray(list, index) {
	    var array = []

	    index = index || 0

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }

	    return array
	}


/***/ }),
/* 55 */
/***/ (function(module, exports) {

	
	/**
	 * Module exports.
	 */

	module.exports = on;

	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */

	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */

	module.exports = Backoff;

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}

	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */

	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};

	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */

	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};

	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};

	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};

	/**
	 * Set the jitter
	 *
	 * @api public
	 */

	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};



/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _events = __webpack_require__(59);

	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Device() {
	  _events2.default.call(this);
	}

	// 原型琏继承
	Object.setPrototypeOf(Device.prototype, _events2.default.prototype);

	exports.default = Device;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isPlainObject = isPlainObject;
	exports.isFunction = isFunction;
	exports.isString = isString;
	exports.isArray = isArray;
	exports.clone = clone;
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}

	function isFunction(fn) {
	  return typeof fn === 'function';
	}

	function isString(str) {
	  return typeof str === 'string';
	}

	function isArray(arr) {
	  return Array.isArray(arr);
	}

	function clone(obj) {
	  var res = {};
	  for (var i in obj) {
	    res[i] = obj[i];
	  }
	  return res;
	}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(62);
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
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit')

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
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

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

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

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(63);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
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

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
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

	  exports.names = [];
	  exports.skips = [];

	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
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


/***/ }),
/* 63 */
/***/ (function(module, exports) {

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
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
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
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ }),
/* 64 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// 去除换行
	function ClearBr(key) {
	  key = key.replace(/<\/?.+?>/g, '');
	  key = key.replace(/[\r\n]/g, '');
	  key = key.replace(/[\n]/g, '');
	  return key;
	}

	function decodeBase64(strIn) {
	  strIn = ClearBr(strIn);
	  if (!strIn.length || strIn.length % 4) {
	    return null;
	  }
	  if (!strIn.length) {
	    return null;
	  }
	  var str64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  var index64 = [];
	  for (var j = 0; j < str64.length; j++) {
	    index64[str64.charAt(j)] = j;
	  }
	  var c0, c1, c2, c3, b0, b1, b2;
	  var len = strIn.length;
	  var len1 = len;
	  if (strIn.charAt(len - 1) === '=') {
	    len1 -= 4;
	  }
	  var result = [];
	  for (var i = 0; i < len1; i += 4) {
	    c0 = index64[strIn.charAt(i)];
	    c1 = index64[strIn.charAt(i + 1)];
	    c2 = index64[strIn.charAt(i + 2)];
	    c3 = index64[strIn.charAt(i + 3)];
	    b0 = c0 << 2 | c1 >> 4;
	    b1 = c1 << 4 | c2 >> 2;
	    b2 = c2 << 6 | c3;
	    result.push(b0 & 0xff);
	    result.push(b1 & 0xff);
	    result.push(b2 & 0xff);
	  }
	  if (len1 !== len) {
	    c0 = index64[strIn.charAt(i)];
	    c1 = index64[strIn.charAt(i + 1)];
	    c2 = strIn.charAt(i + 2);
	    b0 = c0 << 2 | c1 >> 4;
	    result.push(b0 & 0xff);
	    if (c2 !== '=') {
	      c2 = index64[c2];
	      b1 = c1 << 4 | c2 >> 2;
	      result.push(b1 & 0xff);
	    }
	  }
	  return result;
	}

	function encode(data) {
	  var str = String.fromCharCode.apply(null, data); // 先转换为二进制
	  return window.btoa(str).replace(/.{76}(?=.)/g, '$&\n');
	}

	var base64 = {
	  encode: encode,
	  decode: decodeBase64
	};

	exports.default = base64;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var VERSION = 1;
	var dpVersion = 1;
	var protocol = {
	  setDpVersion: function setDpVersion(version) {
	    if (version && typeof version === 'number') {
	      dpVersion = version;
	    }
	  },
	  getDpVersion: function getDpVersion() {
	    return dpVersion;
	  },
	  appLogin: {
	    events: 'app.login',
	    params: {
	      is_resp: false,
	      protocol_version: VERSION, // "协议版本",
	      app_id: '', // 用户ID
	      authorize_code: ''
	    }
	  },
	  set: {
	    events: 'set',
	    params: {
	      is_resp: false,
	      device_id: '',
	      dp_version: dpVersion,
	      message_id: 0,
	      datapoint: null
	    }
	  },
	  pipe: {
	    events: 'pipe',
	    params: {
	      is_resp: false,
	      to_id: '',
	      message_id: 0,
	      pipe: null
	    }
	  },
	  probe: {
	    events: 'probe',
	    params: {
	      is_resp: false,
	      device_id: '',
	      message_id: 0,
	      dp_version: dpVersion
	    }
	  },
	  logout: {
	    events: 'logout',
	    params: {
	      is_resp: false,
	      reason: ''
	    }
	  }
	};

	for (var i in protocol) {
	  if (i === 'set' || i === 'probe') {
	    Object.defineProperty(protocol[i].params, 'dp_version', {
	      get: protocol.getDpVersion,
	      set: protocol.setDpVersion
	    });
	  }
	}

	exports.default = protocol;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _mqttws = __webpack_require__(67);

	var _mqttws2 = _interopRequireDefault(_mqttws);

	var _md = __webpack_require__(68);

	var _md2 = _interopRequireDefault(_md);

	var _device = __webpack_require__(58);

	var _device2 = _interopRequireDefault(_device);

	var _enum = __webpack_require__(1);

	var _lang = __webpack_require__(60);

	var _arrayBuffer = __webpack_require__(72);

	var buffer = _interopRequireWildcard(_arrayBuffer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _client = null; // MQTT服务器
	var _xsdk = null; // 通过sdk事件暴露出去this
	var _devices = {}; // 保存每个设备的实例
	var _msgId = 0;

	var userName = '';
	var password = '';
	var clientId = '';

	/**
	 * 初始化mqtt实例
	 * @param {any} _xsdk
	 * @param {Object} option
	 */
	function initMqttClient(xsdk, option) {
	  if (!_mqttws2.default || !_mqttws2.default.MQTT) {
	    throw new Error('MQTT do not exsit');
	  }
	  if (!option.type) {
	    throw new Error('type do not exsit');
	  }
	  if (option.type === 'platform' && !option.token) {
	    throw new Error('token do not exsit');
	  }
	  if (option.type === 'app' && (!option.userid || !option.authorize)) {
	    throw new Error('userId or authorize do not exsit');
	  }

	  if (option.type === 'app') {
	    userName = option.userid;
	    password = (0, _md2.default)('' + option.userid + option.authorize);
	    clientId = 'X:APP;A:4;V:1;';
	  } else if (option.type === 'platform') {
	    userName = option.token;
	    clientId = 'X:APP;A:5;V:1;';
	  }

	  // 接收外面的实例
	  _xsdk = xsdk;

	  // 开机事件
	  _connectClient(option);

	  // 监听外部的sdk事件
	  _listenSdkEvent();
	}

	// 开机事件
	function _connectClient(option) {
	  if (!option.host || !clientId) {
	    throw new Error('host or clientId do not exsit');
	  }
	  if (!_client) {
	    // //建立客户端实例
	    _client = new _mqttws2.default.MQTT.Client(option.host, clientId);
	    // 连接丢失
	    _client.onConnectionLost = onConnectionLost;
	    // 接收到消息
	    _client.onMessageArrived = onMessageArrived;
	  }

	  var connectOption = {
	    userName: userName,
	    password: password,
	    mqttVersion: 4,
	    onSuccess: function onSuccess() {
	      _loginRecv();
	    },
	    onFailure: function onFailure(err) {
	      if (_xsdk) {
	        _xsdk.emit(_enum.SDKEvent.ERROR, new Error(err.errorMessage || '连接失败'));
	        // 销毁实例
	        _xsdk.emit(_enum.SDKEvent.DESTORY, false);
	      }
	    }
	  };
	  if (option && option.keepAliveInterval && typeof option.keepAliveInterval === 'number') {
	    connectOption.keepAliveInterval = option.keepAliveInterval;
	  } else {
	    connectOption.keepAliveInterval = 40;
	  }
	  _client.connect(connectOption);
	}

	// 通知用户连接成功
	function _loginRecv() {
	  if (!_xsdk) {
	    return;
	  }
	  _xsdk.emit(_enum.SDKEvent.READY); // 1设备准备就绪
	}

	// 监听sdk事件
	function _listenSdkEvent() {
	  _xsdk.on(_enum.SDKEvent.ADDDEVICES, function (deviceLists) {
	    // 1. 添加设备事件
	    _createDevices(deviceLists);
	  }).on(_enum.SDKEvent.DESTORY, function (boolean) {
	    // 销毁mqtt事件,关机事件
	    _distorySdk(boolean);
	  });
	}

	/**
	 * 订阅事件在订阅的时候写好事件的处理和回调
	 * @param {Object} topic
	 * @param {function} successEvent
	 * @param {function} errorEvent
	 * @returns
	 */
	function _subscribe(topic, successEvent, errorEvent) {
	  _client.subscribe(topic, {
	    onSuccess: function onSuccess(res) {
	      if (successEvent && (0, _lang.isFunction)(successEvent)) {
	        successEvent();
	      }
	    },
	    onFailure: function onFailure(err) {
	      if (errorEvent && (0, _lang.isFunction)(errorEvent)) {
	        errorEvent({
	          status: 0,
	          err: err,
	          msg: '\u8BA2\u9605' + topic + '\u5931\u8D25'
	        });
	      }
	    }
	  });
	}

	// 销毁实例并且关闭mqtt, boolean为true开机成功
	function _distorySdk() {
	  var boolean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	  if (_client && boolean) {
	    _client.disconnect();
	  }
	  _devices = {};
	  _client = null;
	  _xsdk = null;
	}

	/**
	 * MQTT处理连接丢失
	 * @param  {Object} res 响应体
	 */
	function onConnectionLost(res) {
	  // 0为正常关机的丢失,销毁实例的时候就是正常关机
	  if (res.errorCode !== 0 && _xsdk) {
	    _xsdk.emit(_enum.SDKEvent.ERROR, new Error(res.errorMessage || '连接丢失'));
	    // 销毁实例
	    _xsdk.emit(_enum.SDKEvent.DESTORY, false);
	  }
	}

	/**
	 * MQTT处理信息接收
	 * @param  {Object} res 响应体
	 */
	function onMessageArrived(res) {
	  if (res && res.destinationName) {
	    var arr = res.destinationName.split('/');
	    if (arr.length > 1) {
	      var _arr = _slicedToArray(arr, 2),
	          topic = _arr[0],
	          deviceId = _arr[1];

	      if (_devices[deviceId] && _devices[deviceId][topic]) {
	        _devices[deviceId][topic](res);
	      }
	    }
	  }
	}

	// 写进事件
	function _writeEvent(topic, deviceId, callback) {
	  if (_devices[deviceId] && !_devices[deviceId][topic] && callback && (0, _lang.isFunction)(callback)) {
	    _devices[deviceId][topic] = function (message) {
	      var result = null;
	      if (/\$6\/\d+/.test(message.destinationName)) {
	        // 设备上报数据端点的回调1x
	        result = buffer.syncDatapoints(message.payloadBytes);
	      } else if (/\$8\/\d+/.test(message.destinationName)) {
	        // 设置数据端点的结果1x
	        result = buffer.setDataPointResult(message.payloadBytes);
	      } else if (/\$a\/\d+/.test(message.destinationName)) {
	        // 获取数据端点的订阅1x
	        result = buffer.getDataPointResult(message.payloadBytes);
	      } else if (/\$k\/\d+/.test(message.destinationName)) {
	        // 设备日志1x
	        result = buffer.log(message.payloadBytes);
	      } else {
	        result = message;
	      }
	      // 执行对应的回调函数并且把结果传出去
	      callback(result);
	    };
	  }
	}

	// 发送数据端点
	function _sendMessage(params, callback) {
	  var event = _enum.sendType[params.topic] + '/' + params.deviceId;
	  var memory = null;

	  if (/\$7\/\d+/.test(event)) {
	    if (!params.data || !params.data.length) return;

	    var _buffer$setDataPointA = buffer.setDataPointArray(params.data, _msgId),
	        b = _buffer$setDataPointA.b,
	        msgId = _buffer$setDataPointA.msgId;

	    _msgId = msgId;
	    memory = b;
	  } else if (/\$9\/\d+/.test(event)) {
	    var _buffer$getDataPoint = buffer.getDataPoint(_msgId),
	        _b = _buffer$getDataPoint.b,
	        _msgId2 = _buffer$getDataPoint.msgId;

	    _msgId = _msgId2;
	    memory = _b;
	  }
	  if (!memory) return;
	  var message = new _mqttws2.default.MQTT.Message(memory);
	  message.destinationName = event;
	  message.qos = 1;
	  _client.send(message);

	  if (callback && (0, _lang.isFunction)(callback)) {
	    callback();
	  }
	}

	// 创造一个设备监听的类
	function _createDevices(deviceLists) {
	  if (deviceLists && deviceLists.length) {
	    var added = [];
	    deviceLists.forEach(function (item) {
	      if (_devices[item.device_id] && _devices[item.device_id] instanceof _device2.default) {
	        added.push(_devices[item.device_id]);
	      } else {
	        var device = new _device2.default();
	        device.id = item.device_id;
	        device.mac = item.device_mac;
	        device.pid = item.device_pid;
	        _devices[device.id] = device;

	        // 1.发送数据端点需要sendMessage
	        device.on(_enum.deviceEvent.SENDDATA, function (data, cb) {
	          _sendData(this.id, data, cb);
	        });
	        // 2.请求获取所有数据端点需要sendMessage
	        device.on(_enum.deviceEvent.PROBE, function (cb) {
	          _probeDevice(this.id, cb);
	        });

	        // 3.设备日志
	        device.on(_enum.deviceEvent.LOG, function (cb) {
	          _log(this.id, cb);
	        });

	        // 4.订阅设备上报
	        deviceSubscribe(item.device_id);

	        added.push(device);
	      }
	    });
	    _xsdk.emit(_enum.SDKEvent.DEVICESREADY, added);
	  }
	}

	// 获取数据端点
	function _probeDevice(deviceId, callback) {
	  if (!_client || !_xsdk) {
	    throw new Error('xsdk not init');
	  }
	  var topic = _enum.subscribeType['getPoint'];
	  if (_devices[deviceId] && !_devices[deviceId][topic]) {
	    _subscribe(topic + '/' + deviceId, function () {
	      // 1.写进事件
	      _writeEvent(topic, deviceId, function (res) {
	        if (callback && (0, _lang.isFunction)(callback)) {
	          callback({ data: res, deviceId: deviceId });
	        }
	      });

	      // 2.订阅成功发送自动获取数据端点
	      _sendMessage({ topic: 'getPoint', deviceId: deviceId });
	    }, function (err) {
	      // 订阅失败
	      if (_devices && _devices[deviceId]) {
	        _devices[deviceId].emit(_enum.deviceEvent.ERROR, err);
	      }
	    });
	  } else {
	    // 订阅成功发送自动获取数据端点
	    _sendMessage({ topic: 'getPoint', deviceId: deviceId });
	  }
	}

	// 设备上报数据端点
	function _pipeRecv(data, deviceId) {
	  if (!deviceId || !_devices[deviceId]) {
	    return;
	  }
	  var device = _devices[deviceId];
	  device.emit(_enum.deviceEvent.DATA, {
	    type: 'datapoint',
	    data: data,
	    deviceId: deviceId
	  });
	}

	// 返回设备日志
	function _log(deviceId, callback) {
	  if (!deviceId || !_devices[deviceId]) {
	    return;
	  }
	  var topic = _enum.subscribeType['log'];
	  if (_devices[deviceId] && !_devices[deviceId][topic]) {
	    _subscribe(topic + '/' + deviceId, function () {
	      // 1.写进事件,方便全局调用获取
	      _writeEvent(topic, deviceId, function (data) {
	        if (callback && (0, _lang.isFunction)(callback)) {
	          callback({
	            data: data,
	            deviceId: deviceId
	          });
	        }
	      });
	    }, function (err) {
	      // 订阅失败
	      if (_devices && _devices[deviceId]) {
	        _devices[deviceId].emit(_enum.deviceEvent.ERROR, err);
	      }
	    });
	  }
	}

	// 发送数据端点
	function _sendData(deviceId, data, callback) {
	  if (!_client || !_xsdk) {
	    throw new Error('xsdk not init');
	  }
	  if (!(0, _lang.isPlainObject)(data) && (0, _lang.isArray)(data.data)) {
	    throw new Error('params error');
	  }

	  if (data.type === 'datapoint' && (0, _lang.isArray)(data.data)) {
	    // 设置数据端点
	    // 订阅发送数据端点
	    var topic = _enum.subscribeType['setPoint'];
	    if (_devices[deviceId] && !_devices[deviceId][topic]) {
	      _subscribe(topic + '/' + deviceId, function () {
	        // 写进事件,方便全局调用获取
	        _writeEvent(topic, deviceId, function (res) {
	          if (callback && (0, _lang.isFunction)(callback)) {
	            callback(res);
	          }
	        });
	      }, function (err) {
	        // 订阅失败
	        if (_devices && _devices[deviceId]) {
	          _devices[deviceId].emit(_enum.deviceEvent.ERROR, err);
	        }
	      });
	    }

	    // 发送数据端点
	    _sendMessage({
	      topic: 'setPoint',
	      deviceId: deviceId,
	      data: data.data
	    });
	  }
	}

	/**
	 * 订阅主题，并且做处理
	 * 设备上报数据端点
	 */
	function deviceSubscribe(deviceId) {
	  if (!_xsdk || !deviceId) return;
	  var topic = _enum.subscribeType['sync'];
	  if (_devices[deviceId] && !_devices[deviceId][topic]) {
	    _subscribe(topic + '/' + deviceId, function () {
	      // 1.写进事件,方便全局调用获取
	      _writeEvent(topic, deviceId, function (data) {
	        // data是返回的数据
	        _pipeRecv(data, deviceId);
	      });
	    }, function (err) {
	      // 订阅失败
	      if (_devices && _devices[deviceId]) {
	        _devices[deviceId].emit(_enum.deviceEvent.ERROR, err);
	      }
	    });
	  }
	}

	exports.default = initMqttClient;

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable */

	/*******************************************************************************
	 * Copyright (c) 2013 IBM Corp.
	 * @namespace Paho.MQTT
	 */

	// if (typeof Paho === 'undefined') {
	// 	Paho = {}
	// }

	var Paho = {};

	Paho.MQTT = function (global) {

		// Private variables below, these are only visible inside the function closure
		// which is used to define the module. 

		var version = '@VERSION@';
		var buildLevel = '@BUILDLEVEL@';

		/** 
	  * Unique message type identifiers, with associated
	  * associated integer values.
	  * @private 
	  */
		var MESSAGE_TYPE = {
			CONNECT: 1,
			CONNACK: 2,
			PUBLISH: 3,
			PUBACK: 4,
			PUBREC: 5,
			PUBREL: 6,
			PUBCOMP: 7,
			SUBSCRIBE: 8,
			SUBACK: 9,
			UNSUBSCRIBE: 10,
			UNSUBACK: 11,
			PINGREQ: 12,
			PINGRESP: 13,
			DISCONNECT: 14
		};

		// Collection of utility methods used to simplify module code 
		// and promote the DRY pattern.  

		/**
	  * Validate an object's parameter names to ensure they 
	  * match a list of expected variables name for this option
	  * type. Used to ensure option object passed into the API don't
	  * contain erroneous parameters.
	  * @param {Object} obj - User options object
	  * @param {Object} keys - valid keys and types that may exist in obj. 
	  * @throws {Error} Invalid option parameter found. 
	  * @private 
	  */
		var validate = function validate(obj, keys) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					if (keys.hasOwnProperty(key)) {
						if (_typeof(obj[key]) !== keys[key]) throw new Error(format(ERROR.INVALID_TYPE, [_typeof(obj[key]), key]));
					} else {
						var errorStr = 'Unknown property, ' + key + '. Valid properties are:';
						for (var key in keys) {
							if (keys.hasOwnProperty(key)) errorStr = errorStr + ' ' + key;
						}throw new Error(errorStr);
					}
				}
			}
		};

		/**
	  * Return a new function which runs the user function bound
	  * to a fixed scope. 
	  * @param {function} User function
	  * @param {object} Function scope  
	  * @return {function} User function bound to another scope
	  * @private 
	  */
		var scope = function scope(f, _scope) {
			return function () {
				return f.apply(_scope, arguments);
			};
		};

		/** 
	  * Unique message type identifiers, with associated
	  * associated integer values.
	  * @private 
	  */
		var ERROR = {
			OK: { code: 0, text: 'AMQJSC0000I OK.' },
			CONNECT_TIMEOUT: { code: 1, text: 'AMQJSC0001E Connect timed out.' },
			SUBSCRIBE_TIMEOUT: { code: 2, text: 'AMQJS0002E Subscribe timed out.' },
			UNSUBSCRIBE_TIMEOUT: { code: 3, text: 'AMQJS0003E Unsubscribe timed out.' },
			PING_TIMEOUT: { code: 4, text: 'AMQJS0004E Ping timed out.' },
			INTERNAL_ERROR: { code: 5, text: 'AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}' },
			CONNACK_RETURNCODE: { code: 6, text: 'AMQJS0006E Bad Connack return code:{0} {1}.' },
			SOCKET_ERROR: { code: 7, text: 'AMQJS0007E Socket error:{0}.' },
			SOCKET_CLOSE: { code: 8, text: 'AMQJS0008I Socket closed.' },
			MALFORMED_UTF: { code: 9, text: 'AMQJS0009E Malformed UTF data:{0} {1} {2}.' },
			UNSUPPORTED: { code: 10, text: 'AMQJS0010E {0} is not supported by this browser.' },
			INVALID_STATE: { code: 11, text: 'AMQJS0011E Invalid state {0}.' },
			INVALID_TYPE: { code: 12, text: 'AMQJS0012E Invalid type {0} for {1}.' },
			INVALID_ARGUMENT: { code: 13, text: 'AMQJS0013E Invalid argument {0} for {1}.' },
			UNSUPPORTED_OPERATION: { code: 14, text: 'AMQJS0014E Unsupported operation.' },
			INVALID_STORED_DATA: { code: 15, text: 'AMQJS0015E Invalid data in local storage key={0} value={1}.' },
			INVALID_MQTT_MESSAGE_TYPE: { code: 16, text: 'AMQJS0016E Invalid MQTT message type {0}.' },
			MALFORMED_UNICODE: { code: 17, text: 'AMQJS0017E Malformed Unicode string:{0} {1}.' }
		};

		/** CONNACK RC Meaning. */
		var CONNACK_RC = {
			0: 'Connection Accepted',
			1: 'Connection Refused: unacceptable protocol version',
			2: 'Connection Refused: identifier rejected',
			3: 'Connection Refused: server unavailable',
			4: 'Connection Refused: bad user name or password',
			5: 'Connection Refused: not authorized'
		};

		/**
	  * Format an error message text.
	  * @private
	  * @param {error} ERROR.KEY value above.
	  * @param {substitutions} [array] substituted into the text.
	  * @return the text with the substitutions made.
	  */
		var format = function format(error, substitutions) {
			var text = error.text;
			if (substitutions) {
				var field, start;
				for (var i = 0; i < substitutions.length; i++) {
					field = '{' + i + '}';
					start = text.indexOf(field);
					if (start > 0) {
						var part1 = text.substring(0, start);
						var part2 = text.substring(start + field.length);
						text = part1 + substitutions[i] + part2;
					}
				}
			}
			return text;
		};

		//MQTT protocol and version          6    M    Q    I    s    d    p    3
		var MqttProtoIdentifierv3 = [0x00, 0x06, 0x4d, 0x51, 0x49, 0x73, 0x64, 0x70, 0x03];
		//MQTT proto/version for 311         4    M    Q    T    T    4
		var MqttProtoIdentifierv4 = [0x00, 0x04, 0x4d, 0x51, 0x54, 0x54, 0x04];

		/**
	  * Construct an MQTT wire protocol message.
	  * @param type MQTT packet type.
	  * @param options optional wire message attributes.
	  * 
	  * Optional properties
	  * 
	  * messageIdentifier: message ID in the range [0..65535]
	  * payloadMessage:	Application Message - PUBLISH only
	  * connectStrings:	array of 0 or more Strings to be put into the CONNECT payload
	  * topics:			array of strings (SUBSCRIBE, UNSUBSCRIBE)
	  * requestQoS:		array of QoS values [0..2]
	  *  
	  * 'Flag' properties 
	  * cleanSession:	true if present / false if absent (CONNECT)
	  * willMessage:  	true if present / false if absent (CONNECT)
	  * isRetained:		true if present / false if absent (CONNECT)
	  * userName:		true if present / false if absent (CONNECT)
	  * password:		true if present / false if absent (CONNECT)
	  * keepAliveInterval:	integer [0..65535]  (CONNECT)
	  *
	  * @private
	  * @ignore
	  */
		var WireMessage = function WireMessage(type, options) {
			this.type = type;
			for (var name in options) {
				if (options.hasOwnProperty(name)) {
					this[name] = options[name];
				}
			}
		};

		WireMessage.prototype.encode = function () {
			// Compute the first byte of the fixed header
			var first = (this.type & 0x0f) << 4;

			/*
	   * Now calculate the length of the variable header + payload by adding up the lengths
	   * of all the component parts
	   */

			var remLength = 0;
			var topicStrLength = new Array();
			var destinationNameLength = 0;

			// if the message contains a messageIdentifier then we need two bytes for that
			if (this.messageIdentifier != undefined) remLength += 2;

			switch (this.type) {
				// If this a Connect then we need to include 12 bytes for its header
				case MESSAGE_TYPE.CONNECT:
					switch (this.mqttVersion) {
						case 3:
							remLength += MqttProtoIdentifierv3.length + 3;
							break;
						case 4:
							remLength += MqttProtoIdentifierv4.length + 3;
							break;
					}

					remLength += UTF8Length(this.clientId) + 2;
					if (this.willMessage != undefined) {
						remLength += UTF8Length(this.willMessage.destinationName) + 2;
						// Will message is always a string, sent as UTF-8 characters with a preceding length.
						var willMessagePayloadBytes = this.willMessage.payloadBytes;
						if (!(willMessagePayloadBytes instanceof Uint8Array)) willMessagePayloadBytes = new Uint8Array(payloadBytes);
						remLength += willMessagePayloadBytes.byteLength + 2;
					}
					if (this.userName != undefined) remLength += UTF8Length(this.userName) + 2;
					if (this.password != undefined) remLength += UTF8Length(this.password) + 2;
					break;

				// Subscribe, Unsubscribe can both contain topic strings
				case MESSAGE_TYPE.SUBSCRIBE:
					first |= 0x02; // Qos = 1;
					for (var i = 0; i < this.topics.length; i++) {
						topicStrLength[i] = UTF8Length(this.topics[i]);
						remLength += topicStrLength[i] + 2;
					}
					remLength += this.requestedQos.length; // 1 byte for each topic's Qos
					// QoS on Subscribe only
					break;

				case MESSAGE_TYPE.UNSUBSCRIBE:
					first |= 0x02; // Qos = 1;
					for (var i = 0; i < this.topics.length; i++) {
						topicStrLength[i] = UTF8Length(this.topics[i]);
						remLength += topicStrLength[i] + 2;
					}
					break;

				case MESSAGE_TYPE.PUBREL:
					first |= 0x02; // Qos = 1;
					break;

				case MESSAGE_TYPE.PUBLISH:
					if (this.payloadMessage.duplicate) first |= 0x08;
					first = first |= this.payloadMessage.qos << 1;
					if (this.payloadMessage.retained) first |= 0x01;
					destinationNameLength = UTF8Length(this.payloadMessage.destinationName);
					remLength += destinationNameLength + 2;
					var payloadBytes = this.payloadMessage.payloadBytes;
					remLength += payloadBytes.byteLength;
					if (payloadBytes instanceof ArrayBuffer) payloadBytes = new Uint8Array(payloadBytes);else if (!(payloadBytes instanceof Uint8Array)) payloadBytes = new Uint8Array(payloadBytes.buffer);
					break;

				case MESSAGE_TYPE.DISCONNECT:
					break;

				default:
					;
			}

			// Now we can allocate a buffer for the message

			var mbi = encodeMBI(remLength); // Convert the length to MQTT MBI format
			var pos = mbi.length + 1; // Offset of start of variable header
			var buffer = new ArrayBuffer(remLength + pos);
			var byteStream = new Uint8Array(buffer); // view it as a sequence of bytes

			//Write the fixed header into the buffer
			byteStream[0] = first;
			byteStream.set(mbi, 1);

			// If this is a PUBLISH then the variable header starts with a topic
			if (this.type == MESSAGE_TYPE.PUBLISH) pos = writeString(this.payloadMessage.destinationName, destinationNameLength, byteStream, pos);
			// If this is a CONNECT then the variable header contains the protocol name/version, flags and keepalive time

			else if (this.type == MESSAGE_TYPE.CONNECT) {
					switch (this.mqttVersion) {
						case 3:
							byteStream.set(MqttProtoIdentifierv3, pos);
							pos += MqttProtoIdentifierv3.length;
							break;
						case 4:
							byteStream.set(MqttProtoIdentifierv4, pos);
							pos += MqttProtoIdentifierv4.length;
							break;
					}
					var connectFlags = 0;
					if (this.cleanSession) connectFlags = 0x02;
					if (this.willMessage != undefined) {
						connectFlags |= 0x04;
						connectFlags |= this.willMessage.qos << 3;
						if (this.willMessage.retained) {
							connectFlags |= 0x20;
						}
					}
					if (this.userName != undefined) connectFlags |= 0x80;
					if (this.password != undefined) connectFlags |= 0x40;
					byteStream[pos++] = connectFlags;
					pos = writeUint16(this.keepAliveInterval, byteStream, pos);
				}

			// Output the messageIdentifier - if there is one
			if (this.messageIdentifier != undefined) pos = writeUint16(this.messageIdentifier, byteStream, pos);

			switch (this.type) {
				case MESSAGE_TYPE.CONNECT:
					pos = writeString(this.clientId, UTF8Length(this.clientId), byteStream, pos);
					if (this.willMessage != undefined) {
						pos = writeString(this.willMessage.destinationName, UTF8Length(this.willMessage.destinationName), byteStream, pos);
						pos = writeUint16(willMessagePayloadBytes.byteLength, byteStream, pos);
						byteStream.set(willMessagePayloadBytes, pos);
						pos += willMessagePayloadBytes.byteLength;
					}
					if (this.userName != undefined) pos = writeString(this.userName, UTF8Length(this.userName), byteStream, pos);
					if (this.password != undefined) pos = writeString(this.password, UTF8Length(this.password), byteStream, pos);
					break;

				case MESSAGE_TYPE.PUBLISH:
					// PUBLISH has a text or binary payload, if text do not add a 2 byte length field, just the UTF characters.	
					byteStream.set(payloadBytes, pos);

					break;

				//    	    case MESSAGE_TYPE.PUBREC:	
				//    	    case MESSAGE_TYPE.PUBREL:	
				//    	    case MESSAGE_TYPE.PUBCOMP:	
				//    	    	break;

				case MESSAGE_TYPE.SUBSCRIBE:
					// SUBSCRIBE has a list of topic strings and request QoS
					for (var i = 0; i < this.topics.length; i++) {
						pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
						byteStream[pos++] = this.requestedQos[i];
					}
					break;

				case MESSAGE_TYPE.UNSUBSCRIBE:
					// UNSUBSCRIBE has a list of topic strings
					for (var i = 0; i < this.topics.length; i++) {
						pos = writeString(this.topics[i], topicStrLength[i], byteStream, pos);
					}break;

				default:
				// Do nothing.
			}

			return buffer;
		};

		function decodeMessage(input, pos) {
			var startingPos = pos;
			var first = input[pos];
			var type = first >> 4;
			var messageInfo = first &= 0x0f;
			pos += 1;

			// Decode the remaining length (MBI format)

			var digit;
			var remLength = 0;
			var multiplier = 1;
			do {
				if (pos == input.length) {
					return [null, startingPos];
				}
				digit = input[pos++];
				remLength += (digit & 0x7F) * multiplier;
				multiplier *= 128;
			} while ((digit & 0x80) != 0);

			var endPos = pos + remLength;
			if (endPos > input.length) {
				return [null, startingPos];
			}

			var wireMessage = new WireMessage(type);
			switch (type) {
				case MESSAGE_TYPE.CONNACK:
					var connectAcknowledgeFlags = input[pos++];
					if (connectAcknowledgeFlags & 0x01) wireMessage.sessionPresent = true;
					wireMessage.returnCode = input[pos++];
					break;

				case MESSAGE_TYPE.PUBLISH:
					var qos = messageInfo >> 1 & 0x03;

					var len = readUint16(input, pos);
					pos += 2;
					var topicName = parseUTF8(input, pos, len);
					pos += len;
					// If QoS 1 or 2 there will be a messageIdentifier
					if (qos > 0) {
						wireMessage.messageIdentifier = readUint16(input, pos);
						pos += 2;
					}

					var message = new Paho.MQTT.Message(input.subarray(pos, endPos));
					if ((messageInfo & 0x01) == 0x01) message.retained = true;
					if ((messageInfo & 0x08) == 0x08) message.duplicate = true;
					message.qos = qos;
					message.destinationName = topicName;
					wireMessage.payloadMessage = message;
					break;

				case MESSAGE_TYPE.PUBACK:
				case MESSAGE_TYPE.PUBREC:
				case MESSAGE_TYPE.PUBREL:
				case MESSAGE_TYPE.PUBCOMP:
				case MESSAGE_TYPE.UNSUBACK:
					wireMessage.messageIdentifier = readUint16(input, pos);
					break;

				case MESSAGE_TYPE.SUBACK:
					wireMessage.messageIdentifier = readUint16(input, pos);
					pos += 2;
					wireMessage.returnCode = input.subarray(pos, endPos);
					break;

				default:
					;
			}

			return [wireMessage, endPos];
		}

		function writeUint16(input, buffer, offset) {
			buffer[offset++] = input >> 8; //MSB
			buffer[offset++] = input % 256; //LSB 
			return offset;
		}

		function writeString(input, utf8Length, buffer, offset) {
			offset = writeUint16(utf8Length, buffer, offset);
			stringToUTF8(input, buffer, offset);
			return offset + utf8Length;
		}

		function readUint16(buffer, offset) {
			return 256 * buffer[offset] + buffer[offset + 1];
		}

		/**
	  * Encodes an MQTT Multi-Byte Integer
	  * @private 
	  */
		function encodeMBI(number) {
			var output = new Array(1);
			var numBytes = 0;

			do {
				var digit = number % 128;
				number = number >> 7;
				if (number > 0) {
					digit |= 0x80;
				}
				output[numBytes++] = digit;
			} while (number > 0 && numBytes < 4);

			return output;
		}

		/**
	  * Takes a String and calculates its length in bytes when encoded in UTF8.
	  * @private
	  */
		function UTF8Length(input) {
			var output = 0;
			for (var i = 0; i < input.length; i++) {
				var charCode = input.charCodeAt(i);
				if (charCode > 0x7FF) {
					// Surrogate pair means its a 4 byte character
					if (0xD800 <= charCode && charCode <= 0xDBFF) {
						i++;
						output++;
					}
					output += 3;
				} else if (charCode > 0x7F) output += 2;else output++;
			}
			return output;
		}

		/**
	  * Takes a String and writes it into an array as UTF8 encoded bytes.
	  * @private
	  */
		function stringToUTF8(input, output, start) {
			var pos = start;
			for (var i = 0; i < input.length; i++) {
				var charCode = input.charCodeAt(i);

				// Check for a surrogate pair.
				if (0xD800 <= charCode && charCode <= 0xDBFF) {
					var lowCharCode = input.charCodeAt(++i);
					if (isNaN(lowCharCode)) {
						throw new Error(format(ERROR.MALFORMED_UNICODE, [charCode, lowCharCode]));
					}
					charCode = (charCode - 0xD800 << 10) + (lowCharCode - 0xDC00) + 0x10000;
				}

				if (charCode <= 0x7F) {
					output[pos++] = charCode;
				} else if (charCode <= 0x7FF) {
					output[pos++] = charCode >> 6 & 0x1F | 0xC0;
					output[pos++] = charCode & 0x3F | 0x80;
				} else if (charCode <= 0xFFFF) {
					output[pos++] = charCode >> 12 & 0x0F | 0xE0;
					output[pos++] = charCode >> 6 & 0x3F | 0x80;
					output[pos++] = charCode & 0x3F | 0x80;
				} else {
					output[pos++] = charCode >> 18 & 0x07 | 0xF0;
					output[pos++] = charCode >> 12 & 0x3F | 0x80;
					output[pos++] = charCode >> 6 & 0x3F | 0x80;
					output[pos++] = charCode & 0x3F | 0x80;
				};
			}
			return output;
		}

		function parseUTF8(input, offset, length) {
			var output = '';
			var utf16;
			var pos = offset;

			while (pos < offset + length) {
				var byte1 = input[pos++];
				if (byte1 < 128) utf16 = byte1;else {
					var byte2 = input[pos++] - 128;
					if (byte2 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), '']));
					if (byte1 < 0xE0) // 2 byte character
						utf16 = 64 * (byte1 - 0xC0) + byte2;else {
						var byte3 = input[pos++] - 128;
						if (byte3 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16)]));
						if (byte1 < 0xF0) // 3 byte character
							utf16 = 4096 * (byte1 - 0xE0) + 64 * byte2 + byte3;else {
							var byte4 = input[pos++] - 128;
							if (byte4 < 0) throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
							if (byte1 < 0xF8) // 4 byte character 
								utf16 = 262144 * (byte1 - 0xF0) + 4096 * byte2 + 64 * byte3 + byte4;else // longer encodings are not supported  
								throw new Error(format(ERROR.MALFORMED_UTF, [byte1.toString(16), byte2.toString(16), byte3.toString(16), byte4.toString(16)]));
						}
					}
				}

				if (utf16 > 0xFFFF) // 4 byte character - express as a surrogate pair
					{
						utf16 -= 0x10000;
						output += String.fromCharCode(0xD800 + (utf16 >> 10)); // lead character
						utf16 = 0xDC00 + (utf16 & 0x3FF); // trail character
					}
				output += String.fromCharCode(utf16);
			}
			return output;
		}

		/** 
	  * Repeat keepalive requests, monitor responses.
	  * @ignore
	  */
		var Pinger = function Pinger(client, window, keepAliveInterval) {
			this._client = client;
			this._window = window;
			this._keepAliveInterval = keepAliveInterval * 1000;
			this.isReset = false;

			var pingReq = new WireMessage(MESSAGE_TYPE.PINGREQ).encode();

			var doTimeout = function doTimeout(pinger) {
				return function () {
					return doPing.apply(pinger);
				};
			};

			/** @ignore */
			var doPing = function doPing() {
				if (!this.isReset) {
					this._client._trace('Pinger.doPing', 'Timed out');
					this._client._disconnected(ERROR.PING_TIMEOUT.code, format(ERROR.PING_TIMEOUT));
				} else {
					this.isReset = false;
					this._client._trace('Pinger.doPing', 'send PINGREQ');
					this._client.socket.send(pingReq);
					this.timeout = this._window.setTimeout(doTimeout(this), this._keepAliveInterval);
				}
			};

			this.reset = function () {
				this.isReset = true;
				this._window.clearTimeout(this.timeout);
				if (this._keepAliveInterval > 0) this.timeout = setTimeout(doTimeout(this), this._keepAliveInterval);
			};

			this.cancel = function () {
				this._window.clearTimeout(this.timeout);
			};
		};

		/**
	  * Monitor request completion.
	  * @ignore
	  */
		var Timeout = function Timeout(client, window, timeoutSeconds, action, args) {
			this._window = window;
			if (!timeoutSeconds) timeoutSeconds = 30;

			var doTimeout = function doTimeout(action, client, args) {
				return function () {
					return action.apply(client, args);
				};
			};
			this.timeout = setTimeout(doTimeout(action, client, args), timeoutSeconds * 1000);

			this.cancel = function () {
				this._window.clearTimeout(this.timeout);
			};
		};

		/*
	  * Internal implementation of the Websockets MQTT V3.1 client.
	  * 
	  * @name Paho.MQTT.ClientImpl @constructor 
	  * @param {String} host the DNS nameof the webSocket host. 
	  * @param {Number} port the port number for that host.
	  * @param {String} clientId the MQ client identifier.
	  */
		var ClientImpl = function ClientImpl(uri, host, port, path, clientId) {
			// Check dependencies are satisfied in this browser.
			if (!('WebSocket' in global && global['WebSocket'] !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ['WebSocket']));
			}
			if (!('localStorage' in global && global['localStorage'] !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ['localStorage']));
			}
			if (!('ArrayBuffer' in global && global['ArrayBuffer'] !== null)) {
				throw new Error(format(ERROR.UNSUPPORTED, ['ArrayBuffer']));
			}
			this._trace('Paho.MQTT.Client', uri, host, port, path, clientId);

			this.host = host;
			this.port = port;
			this.path = path;
			this.uri = uri;
			this.clientId = clientId;

			// Local storagekeys are qualified with the following string.
			// The conditional inclusion of path in the key is for backward
			// compatibility to when the path was not configurable and assumed to
			// be /mqtt
			this._localKey = host + ':' + port + (path != '/mqtt' ? ':' + path : '') + ':' + clientId + ':';

			// Create private instance-only message queue
			// Internal queue of messages to be sent, in sending order. 
			this._msg_queue = [];

			// Messages we have sent and are expecting a response for, indexed by their respective message ids. 
			this._sentMessages = {};

			// Messages we have received and acknowleged and are expecting a confirm message for
			// indexed by their respective message ids. 
			this._receivedMessages = {};

			// Internal list of callbacks to be executed when messages
			// have been successfully sent over web socket, e.g. disconnect
			// when it doesn't have to wait for ACK, just message is dispatched.
			this._notify_msg_sent = {};

			// Unique identifier for SEND messages, incrementing
			// counter as messages are sent.
			this._message_identifier = 1;

			// Used to determine the transmission sequence of stored sent messages.
			this._sequence = 0;

			// Load the local state, if any, from the saved version, only restore state relevant to this client.   	
			for (var key in localStorage) {
				if (key.indexOf('Sent:' + this._localKey) == 0 || key.indexOf('Received:' + this._localKey) == 0) this.restore(key);
			}
		};

		// Messaging Client public instance members. 
		ClientImpl.prototype.host;
		ClientImpl.prototype.port;
		ClientImpl.prototype.path;
		ClientImpl.prototype.uri;
		ClientImpl.prototype.clientId;

		// Messaging Client private instance members.
		ClientImpl.prototype.socket;
		/* true once we have received an acknowledgement to a CONNECT packet. */
		ClientImpl.prototype.connected = false;
		/* The largest message identifier allowed, may not be larger than 2**16 but 
	  * if set smaller reduces the maximum number of outbound messages allowed.
	  */
		ClientImpl.prototype.maxMessageIdentifier = 65536;
		ClientImpl.prototype.connectOptions;
		ClientImpl.prototype.hostIndex;
		ClientImpl.prototype.onConnectionLost;
		ClientImpl.prototype.onMessageDelivered;
		ClientImpl.prototype.onMessageArrived;
		ClientImpl.prototype.traceFunction;
		ClientImpl.prototype._msg_queue = null;
		ClientImpl.prototype._connectTimeout;
		/* The sendPinger monitors how long we allow before we send data to prove to the server that we are alive. */
		ClientImpl.prototype.sendPinger = null;
		/* The receivePinger monitors how long we allow before we require evidence that the server is alive. */
		ClientImpl.prototype.receivePinger = null;

		ClientImpl.prototype.receiveBuffer = null;

		ClientImpl.prototype._traceBuffer = null;
		ClientImpl.prototype._MAX_TRACE_ENTRIES = 100;

		ClientImpl.prototype.connect = function (connectOptions) {
			var connectOptionsMasked = this._traceMask(connectOptions, 'password');
			this._trace('Client.connect', connectOptionsMasked, this.socket, this.connected);

			if (this.connected) throw new Error(format(ERROR.INVALID_STATE, ['already connected']));
			if (this.socket) throw new Error(format(ERROR.INVALID_STATE, ['already connected']));

			this.connectOptions = connectOptions;

			if (connectOptions.uris) {
				this.hostIndex = 0;
				this._doConnect(connectOptions.uris[0]);
			} else {
				this._doConnect(this.uri);
			}
		};

		ClientImpl.prototype.subscribe = function (filter, subscribeOptions) {
			this._trace('Client.subscribe', filter, subscribeOptions);

			if (!this.connected) throw new Error(format(ERROR.INVALID_STATE, ['not connected']));

			var wireMessage = new WireMessage(MESSAGE_TYPE.SUBSCRIBE);
			wireMessage.topics = [filter];
			if (subscribeOptions.qos != undefined) wireMessage.requestedQos = [subscribeOptions.qos];else wireMessage.requestedQos = [0];

			if (subscribeOptions.onSuccess) {
				wireMessage.onSuccess = function (grantedQos) {
					subscribeOptions.onSuccess({ invocationContext: subscribeOptions.invocationContext, grantedQos: grantedQos });
				};
			}

			if (subscribeOptions.onFailure) {
				wireMessage.onFailure = function (errorCode) {
					subscribeOptions.onFailure({ invocationContext: subscribeOptions.invocationContext, errorCode: errorCode });
				};
			}

			if (subscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, window, subscribeOptions.timeout, subscribeOptions.onFailure, [{ invocationContext: subscribeOptions.invocationContext,
					errorCode: ERROR.SUBSCRIBE_TIMEOUT.code,
					errorMessage: format(ERROR.SUBSCRIBE_TIMEOUT) }]);
			}

			// All subscriptions return a SUBACK. 
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		/** @ignore */
		ClientImpl.prototype.unsubscribe = function (filter, unsubscribeOptions) {
			this._trace('Client.unsubscribe', filter, unsubscribeOptions);

			if (!this.connected) throw new Error(format(ERROR.INVALID_STATE, ['not connected']));

			var wireMessage = new WireMessage(MESSAGE_TYPE.UNSUBSCRIBE);
			wireMessage.topics = [filter];

			if (unsubscribeOptions.onSuccess) {
				wireMessage.callback = function () {
					unsubscribeOptions.onSuccess({ invocationContext: unsubscribeOptions.invocationContext });
				};
			}
			if (unsubscribeOptions.timeout) {
				wireMessage.timeOut = new Timeout(this, window, unsubscribeOptions.timeout, unsubscribeOptions.onFailure, [{ invocationContext: unsubscribeOptions.invocationContext,
					errorCode: ERROR.UNSUBSCRIBE_TIMEOUT.code,
					errorMessage: format(ERROR.UNSUBSCRIBE_TIMEOUT) }]);
			}

			// All unsubscribes return a SUBACK.         
			this._requires_ack(wireMessage);
			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.send = function (message) {
			this._trace('Client.send', message);

			if (!this.connected) throw new Error(format(ERROR.INVALID_STATE, ['not connected']));

			var wireMessage = new WireMessage(MESSAGE_TYPE.PUBLISH);
			wireMessage.payloadMessage = message;

			if (message.qos > 0) this._requires_ack(wireMessage);else if (this.onMessageDelivered) this._notify_msg_sent[wireMessage] = this.onMessageDelivered(wireMessage.payloadMessage);
			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.disconnect = function () {
			this._trace('Client.disconnect');

			if (!this.socket) throw new Error(format(ERROR.INVALID_STATE, ['not connecting or connected']));

			var wireMessage = new WireMessage(MESSAGE_TYPE.DISCONNECT);

			// Run the disconnected call back as soon as the message has been sent,
			// in case of a failure later on in the disconnect processing.
			// as a consequence, the _disconected call back may be run several times.
			this._notify_msg_sent[wireMessage] = scope(this._disconnected, this);

			this._schedule_message(wireMessage);
		};

		ClientImpl.prototype.getTraceLog = function () {
			if (this._traceBuffer !== null) {
				this._trace('Client.getTraceLog', new Date());
				this._trace('Client.getTraceLog in flight messages', this._sentMessages.length);
				for (var key in this._sentMessages) {
					this._trace('_sentMessages ', key, this._sentMessages[key]);
				}for (var key in this._receivedMessages) {
					this._trace('_receivedMessages ', key, this._receivedMessages[key]);
				}return this._traceBuffer;
			}
		};

		ClientImpl.prototype.startTrace = function () {
			if (this._traceBuffer === null) {
				this._traceBuffer = [];
			}
			this._trace('Client.startTrace', new Date(), version);
		};

		ClientImpl.prototype.stopTrace = function () {
			delete this._traceBuffer;
		};

		ClientImpl.prototype._doConnect = function (wsurl) {
			// When the socket is open, this client will send the CONNECT WireMessage using the saved parameters. 
			if (this.connectOptions.useSSL) {
				var uriParts = wsurl.split(':');
				uriParts[0] = 'wss';
				wsurl = uriParts.join(':');
			}
			this.connected = false;
			if (this.connectOptions.mqttVersion < 4) {
				this.socket = new WebSocket(wsurl, ['mqttv3.1']);
			} else {
				this.socket = new WebSocket(wsurl, ['mqtt']);
			}
			this.socket.binaryType = 'arraybuffer';

			this.socket.onopen = scope(this._on_socket_open, this);
			this.socket.onmessage = scope(this._on_socket_message, this);
			this.socket.onerror = scope(this._on_socket_error, this);
			this.socket.onclose = scope(this._on_socket_close, this);

			this.sendPinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);
			this.receivePinger = new Pinger(this, window, this.connectOptions.keepAliveInterval);

			this._connectTimeout = new Timeout(this, window, this.connectOptions.timeout, this._disconnected, [ERROR.CONNECT_TIMEOUT.code, format(ERROR.CONNECT_TIMEOUT)]);
		};

		// Schedule a new message to be sent over the WebSockets
		// connection. CONNECT messages cause WebSocket connection
		// to be started. All other messages are queued internally
		// until this has happened. When WS connection starts, process
		// all outstanding messages. 
		ClientImpl.prototype._schedule_message = function (message) {
			this._msg_queue.push(message);
			// Process outstanding messages in the queue if we have an  open socket, and have received CONNACK. 
			if (this.connected) {
				this._process_queue();
			}
		};

		ClientImpl.prototype.store = function (prefix, wireMessage) {
			var storedMessage = { type: wireMessage.type, messageIdentifier: wireMessage.messageIdentifier, version: 1 };

			switch (wireMessage.type) {
				case MESSAGE_TYPE.PUBLISH:
					if (wireMessage.pubRecReceived) storedMessage.pubRecReceived = true;

					// Convert the payload to a hex string.
					storedMessage.payloadMessage = {};
					var hex = '';
					var messageBytes = wireMessage.payloadMessage.payloadBytes;
					for (var i = 0; i < messageBytes.length; i++) {
						if (messageBytes[i] <= 0xF) hex = hex + '0' + messageBytes[i].toString(16);else hex = hex + messageBytes[i].toString(16);
					}
					storedMessage.payloadMessage.payloadHex = hex;

					storedMessage.payloadMessage.qos = wireMessage.payloadMessage.qos;
					storedMessage.payloadMessage.destinationName = wireMessage.payloadMessage.destinationName;
					if (wireMessage.payloadMessage.duplicate) storedMessage.payloadMessage.duplicate = true;
					if (wireMessage.payloadMessage.retained) storedMessage.payloadMessage.retained = true;

					// Add a sequence number to sent messages.
					if (prefix.indexOf('Sent:') == 0) {
						if (wireMessage.sequence === undefined) wireMessage.sequence = ++this._sequence;
						storedMessage.sequence = wireMessage.sequence;
					}
					break;

				default:
					throw Error(format(ERROR.INVALID_STORED_DATA, [key, storedMessage]));
			}
			localStorage.setItem(prefix + this._localKey + wireMessage.messageIdentifier, JSON.stringify(storedMessage));
		};

		ClientImpl.prototype.restore = function (key) {
			var value = localStorage.getItem(key);
			var storedMessage = JSON.parse(value);

			var wireMessage = new WireMessage(storedMessage.type, storedMessage);

			switch (storedMessage.type) {
				case MESSAGE_TYPE.PUBLISH:
					// Replace the payload message with a Message object.
					var hex = storedMessage.payloadMessage.payloadHex;
					var buffer = new ArrayBuffer(hex.length / 2);
					var byteStream = new Uint8Array(buffer);
					var i = 0;
					while (hex.length >= 2) {
						var x = parseInt(hex.substring(0, 2), 16);
						hex = hex.substring(2, hex.length);
						byteStream[i++] = x;
					}
					var payloadMessage = new Paho.MQTT.Message(byteStream);

					payloadMessage.qos = storedMessage.payloadMessage.qos;
					payloadMessage.destinationName = storedMessage.payloadMessage.destinationName;
					if (storedMessage.payloadMessage.duplicate) payloadMessage.duplicate = true;
					if (storedMessage.payloadMessage.retained) payloadMessage.retained = true;
					wireMessage.payloadMessage = payloadMessage;

					break;

				default:
					throw Error(format(ERROR.INVALID_STORED_DATA, [key, value]));
			}

			if (key.indexOf('Sent:' + this._localKey) == 0) {
				wireMessage.payloadMessage.duplicate = true;
				this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			} else if (key.indexOf('Received:' + this._localKey) == 0) {
				this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
			}
		};

		ClientImpl.prototype._process_queue = function () {
			var message = null;
			// Process messages in order they were added
			var fifo = this._msg_queue.reverse();

			// Send all queued messages down socket connection
			while (message = fifo.pop()) {
				this._socket_send(message);
				// Notify listeners that message was successfully sent
				if (this._notify_msg_sent[message]) {
					this._notify_msg_sent[message]();
					delete this._notify_msg_sent[message];
				}
			}
		};

		/**
	  * Expect an ACK response for this message. Add message to the set of in progress
	  * messages and set an unused identifier in this message.
	  * @ignore
	  */
		ClientImpl.prototype._requires_ack = function (wireMessage) {
			var messageCount = Object.keys(this._sentMessages).length;
			if (messageCount > this.maxMessageIdentifier) throw Error('Too many messages:' + messageCount);

			while (this._sentMessages[this._message_identifier] !== undefined) {
				this._message_identifier++;
			}
			wireMessage.messageIdentifier = this._message_identifier;
			this._sentMessages[wireMessage.messageIdentifier] = wireMessage;
			if (wireMessage.type === MESSAGE_TYPE.PUBLISH) {
				this.store('Sent:', wireMessage);
			}
			if (this._message_identifier === this.maxMessageIdentifier) {
				this._message_identifier = 1;
			}
		};

		/** 
	  * Called when the underlying websocket has been opened.
	  * @ignore
	  */
		ClientImpl.prototype._on_socket_open = function () {
			// Create the CONNECT message object.
			var wireMessage = new WireMessage(MESSAGE_TYPE.CONNECT, this.connectOptions);
			wireMessage.clientId = this.clientId;
			this._socket_send(wireMessage);
		};

		/** 
	  * Called when the underlying websocket has received a complete packet.
	  * @ignore
	  */
		ClientImpl.prototype._on_socket_message = function (event) {
			this._trace('Client._on_socket_message', event.data);
			// Reset the receive ping timer, we now have evidence the server is alive.
			this.receivePinger.reset();
			var messages = this._deframeMessages(event.data);
			for (var i = 0; i < messages.length; i += 1) {
				this._handleMessage(messages[i]);
			}
		};

		ClientImpl.prototype._deframeMessages = function (data) {
			var byteArray = new Uint8Array(data);
			if (this.receiveBuffer) {
				var newData = new Uint8Array(this.receiveBuffer.length + byteArray.length);
				newData.set(this.receiveBuffer);
				newData.set(byteArray, this.receiveBuffer.length);
				byteArray = newData;
				delete this.receiveBuffer;
			}
			try {
				var offset = 0;
				var messages = [];
				while (offset < byteArray.length) {
					var result = decodeMessage(byteArray, offset);
					var wireMessage = result[0];
					offset = result[1];
					if (wireMessage !== null) {
						messages.push(wireMessage);
					} else {
						break;
					}
				}
				if (offset < byteArray.length) {
					this.receiveBuffer = byteArray.subarray(offset);
				}
			} catch (error) {
				this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, error.stack.toString()]));
				return;
			}
			return messages;
		};

		ClientImpl.prototype._handleMessage = function (wireMessage) {

			this._trace('Client._handleMessage', wireMessage);

			try {
				switch (wireMessage.type) {
					case MESSAGE_TYPE.CONNACK:
						this._connectTimeout.cancel();

						// If we have started using clean session then clear up the local state.
						if (this.connectOptions.cleanSession) {
							for (var key in this._sentMessages) {
								var sentMessage = this._sentMessages[key];
								localStorage.removeItem('Sent:' + this._localKey + sentMessage.messageIdentifier);
							}
							this._sentMessages = {};

							for (var key in this._receivedMessages) {
								var receivedMessage = this._receivedMessages[key];
								localStorage.removeItem('Received:' + this._localKey + receivedMessage.messageIdentifier);
							}
							this._receivedMessages = {};
						}
						// Client connected and ready for business.
						if (wireMessage.returnCode === 0) {
							this.connected = true;
							// Jump to the end of the list of uris and stop looking for a good host.
							if (this.connectOptions.uris) this.hostIndex = this.connectOptions.uris.length;
						} else {
							this._disconnected(ERROR.CONNACK_RETURNCODE.code, format(ERROR.CONNACK_RETURNCODE, [wireMessage.returnCode, CONNACK_RC[wireMessage.returnCode]]));
							break;
						}

						// Resend messages.
						var sequencedMessages = new Array();
						for (var msgId in this._sentMessages) {
							if (this._sentMessages.hasOwnProperty(msgId)) sequencedMessages.push(this._sentMessages[msgId]);
						}

						// Sort sentMessages into the original sent order.
						var sequencedMessages = sequencedMessages.sort(function (a, b) {
							return a.sequence - b.sequence;
						});
						for (var i = 0, len = sequencedMessages.length; i < len; i++) {
							var sentMessage = sequencedMessages[i];
							if (sentMessage.type == MESSAGE_TYPE.PUBLISH && sentMessage.pubRecReceived) {
								var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, { messageIdentifier: sentMessage.messageIdentifier });
								this._schedule_message(pubRelMessage);
							} else {
								this._schedule_message(sentMessage);
							};
						}

						// Execute the connectOptions.onSuccess callback if there is one.
						if (this.connectOptions.onSuccess) {
							this.connectOptions.onSuccess({ invocationContext: this.connectOptions.invocationContext });
						}

						// Process all queued messages now that the connection is established. 
						this._process_queue();
						break;

					case MESSAGE_TYPE.PUBLISH:
						this._receivePublish(wireMessage);
						break;

					case MESSAGE_TYPE.PUBACK:
						var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
						// If this is a re flow of a PUBACK after we have restarted receivedMessage will not exist.
						if (sentMessage) {
							delete this._sentMessages[wireMessage.messageIdentifier];
							localStorage.removeItem('Sent:' + this._localKey + wireMessage.messageIdentifier);
							if (this.onMessageDelivered) this.onMessageDelivered(sentMessage.payloadMessage);
						}
						break;

					case MESSAGE_TYPE.PUBREC:
						var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
						// If this is a re flow of a PUBREC after we have restarted receivedMessage will not exist.
						if (sentMessage) {
							sentMessage.pubRecReceived = true;
							var pubRelMessage = new WireMessage(MESSAGE_TYPE.PUBREL, { messageIdentifier: wireMessage.messageIdentifier });
							this.store('Sent:', sentMessage);
							this._schedule_message(pubRelMessage);
						}
						break;

					case MESSAGE_TYPE.PUBREL:
						var receivedMessage = this._receivedMessages[wireMessage.messageIdentifier];
						localStorage.removeItem('Received:' + this._localKey + wireMessage.messageIdentifier);
						// If this is a re flow of a PUBREL after we have restarted receivedMessage will not exist.
						if (receivedMessage) {
							this._receiveMessage(receivedMessage);
							delete this._receivedMessages[wireMessage.messageIdentifier];
						}
						// Always flow PubComp, we may have previously flowed PubComp but the server lost it and restarted.
						var pubCompMessage = new WireMessage(MESSAGE_TYPE.PUBCOMP, { messageIdentifier: wireMessage.messageIdentifier });
						this._schedule_message(pubCompMessage);
						break;

					case MESSAGE_TYPE.PUBCOMP:
						var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
						delete this._sentMessages[wireMessage.messageIdentifier];
						localStorage.removeItem('Sent:' + this._localKey + wireMessage.messageIdentifier);
						if (this.onMessageDelivered) this.onMessageDelivered(sentMessage.payloadMessage);
						break;

					case MESSAGE_TYPE.SUBACK:
						var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
						if (sentMessage) {
							if (sentMessage.timeOut) sentMessage.timeOut.cancel();
							// This will need to be fixed when we add multiple topic support
							if (wireMessage.returnCode[0] === 0x80) {
								if (sentMessage.onFailure) {
									sentMessage.onFailure(wireMessage.returnCode);
								}
							} else if (sentMessage.onSuccess) {
								sentMessage.onSuccess(wireMessage.returnCode);
							}
							delete this._sentMessages[wireMessage.messageIdentifier];
						}
						break;

					case MESSAGE_TYPE.UNSUBACK:
						var sentMessage = this._sentMessages[wireMessage.messageIdentifier];
						if (sentMessage) {
							if (sentMessage.timeOut) sentMessage.timeOut.cancel();
							if (sentMessage.callback) {
								sentMessage.callback();
							}
							delete this._sentMessages[wireMessage.messageIdentifier];
						}

						break;

					case MESSAGE_TYPE.PINGRESP:
						/* The sendPinger or receivePinger may have sent a ping, the receivePinger has already been reset. */
						this.sendPinger.reset();
						break;

					case MESSAGE_TYPE.DISCONNECT:
						// Clients do not expect to receive disconnect packets.
						this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
						break;

					default:
						this._disconnected(ERROR.INVALID_MQTT_MESSAGE_TYPE.code, format(ERROR.INVALID_MQTT_MESSAGE_TYPE, [wireMessage.type]));
				};
			} catch (error) {
				this._disconnected(ERROR.INTERNAL_ERROR.code, format(ERROR.INTERNAL_ERROR, [error.message, error.stack.toString()]));
				return;
			}
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_error = function (error) {
			this._disconnected(ERROR.SOCKET_ERROR.code, format(ERROR.SOCKET_ERROR, [error.data]));
		};

		/** @ignore */
		ClientImpl.prototype._on_socket_close = function () {
			this._disconnected(ERROR.SOCKET_CLOSE.code, format(ERROR.SOCKET_CLOSE));
		};

		/** @ignore */
		ClientImpl.prototype._socket_send = function (wireMessage) {

			if (wireMessage.type == 1) {
				var wireMessageMasked = this._traceMask(wireMessage, 'password');
				this._trace('Client._socket_send', wireMessageMasked);
			} else this._trace('Client._socket_send', wireMessage);

			this.socket.send(wireMessage.encode());
			/* We have proved to the server we are alive. */
			this.sendPinger.reset();
		};

		/** @ignore */
		ClientImpl.prototype._receivePublish = function (wireMessage) {
			switch (wireMessage.payloadMessage.qos) {
				case 'undefined':
				case 0:
					this._receiveMessage(wireMessage);
					break;

				case 1:
					var pubAckMessage = new WireMessage(MESSAGE_TYPE.PUBACK, { messageIdentifier: wireMessage.messageIdentifier });
					this._schedule_message(pubAckMessage);
					this._receiveMessage(wireMessage);
					break;

				case 2:
					this._receivedMessages[wireMessage.messageIdentifier] = wireMessage;
					this.store('Received:', wireMessage);
					var pubRecMessage = new WireMessage(MESSAGE_TYPE.PUBREC, { messageIdentifier: wireMessage.messageIdentifier });
					this._schedule_message(pubRecMessage);

					break;

				default:
					throw Error('Invaild qos=' + wireMmessage.payloadMessage.qos);
			};
		};

		/** @ignore */
		ClientImpl.prototype._receiveMessage = function (wireMessage) {
			if (this.onMessageArrived) {
				this.onMessageArrived(wireMessage.payloadMessage);
			}
		};

		/**
	  * Client has disconnected either at its own request or because the server
	  * or network disconnected it. Remove all non-durable state.
	  * @param {errorCode} [number] the error number.
	  * @param {errorText} [string] the error text.
	  * @ignore
	  */
		ClientImpl.prototype._disconnected = function (errorCode, errorText) {
			this._trace('Client._disconnected', errorCode, errorText);

			this.sendPinger.cancel();
			this.receivePinger.cancel();
			if (this._connectTimeout) this._connectTimeout.cancel();
			// Clear message buffers.
			this._msg_queue = [];
			this._notify_msg_sent = {};

			if (this.socket) {
				// Cancel all socket callbacks so that they cannot be driven again by this socket.
				this.socket.onopen = null;
				this.socket.onmessage = null;
				this.socket.onerror = null;
				this.socket.onclose = null;
				if (this.socket.readyState === 0 || this.socket.readyState === 1) this.socket.close();
				delete this.socket;
			}

			if (this.connectOptions.uris && this.hostIndex < this.connectOptions.uris.length - 1) {
				// Try the next host.
				this.hostIndex++;
				this._doConnect(this.connectOptions.uris[this.hostIndex]);
			} else {

				if (errorCode === undefined) {
					errorCode = ERROR.OK.code;
					errorText = format(ERROR.OK);
				}

				// Run any application callbacks last as they may attempt to reconnect and hence create a new socket.
				if (this.connected) {
					this.connected = false;
					// Execute the connectionLostCallback if there is one, and we were connected.       
					if (this.onConnectionLost) this.onConnectionLost({ errorCode: errorCode, errorMessage: errorText });
				} else {
					// Otherwise we never had a connection, so indicate that the connect has failed.
					if (this.connectOptions.mqttVersion === 4 && this.connectOptions.mqttVersionExplicit === false) {
						this._trace('Failed to connect V4, dropping back to V3');
						this.connectOptions.mqttVersion = 3;
						if (this.connectOptions.uris) {
							this.hostIndex = 0;
							this._doConnect(this.connectOptions.uris[0]);
						} else {
							this._doConnect(this.uri);
						}
					} else if (this.connectOptions.onFailure) {
						this.connectOptions.onFailure({ invocationContext: this.connectOptions.invocationContext, errorCode: errorCode, errorMessage: errorText });
					}
				}
			}
		};

		/** @ignore */
		ClientImpl.prototype._trace = function () {
			// Pass trace message back to client's callback function
			if (this.traceFunction) {
				for (var i in arguments) {
					if (typeof arguments[i] !== 'undefined') arguments[i] = JSON.stringify(arguments[i]);
				}
				var record = Array.prototype.slice.call(arguments).join('');
				this.traceFunction({ severity: 'Debug', message: record });
			}

			//buffer style trace
			if (this._traceBuffer !== null) {
				for (var i = 0, max = arguments.length; i < max; i++) {
					if (this._traceBuffer.length == this._MAX_TRACE_ENTRIES) {
						this._traceBuffer.shift();
					}
					if (i === 0) this._traceBuffer.push(arguments[i]);else if (typeof arguments[i] === 'undefined') this._traceBuffer.push(arguments[i]);else this._traceBuffer.push('  ' + JSON.stringify(arguments[i]));
				};
			};
		};

		/** @ignore */
		ClientImpl.prototype._traceMask = function (traceObject, masked) {
			var traceObjectMasked = {};
			for (var attr in traceObject) {
				if (traceObject.hasOwnProperty(attr)) {
					if (attr == masked) traceObjectMasked[attr] = '******';else traceObjectMasked[attr] = traceObject[attr];
				}
			}
			return traceObjectMasked;
		};

		// ------------------------------------------------------------------------
		// Public Programming interface.
		// ------------------------------------------------------------------------

		/** 
	  * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object. 
	  * <p>
	  * Most applications will create just one Client object and then call its connect() method,
	  * however applications can create more than one Client object if they wish. 
	  * In this case the combination of host, port and clientId attributes must be different for each Client object.
	  * <p>
	  * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods 
	  * (even though the underlying protocol exchange might be synchronous in nature). 
	  * This means they signal their completion by calling back to the application, 
	  * via Success or Failure callback functions provided by the application on the method in question. 
	  * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime 
	  * of the script that made the invocation.
	  * <p>
	  * In contrast there are some callback functions, most notably <i>onMessageArrived</i>, 
	  * that are defined on the {@link Paho.MQTT.Client} object.  
	  * These may get called multiple times, and aren't directly related to specific method invocations made by the client. 
	  *
	  * @name Paho.MQTT.Client    
	  * 
	  * @constructor
	  *  
	  * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
	  * @param {number} port - the port number to connect to - only required if host is not a URI
	  * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
	  * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
	  * 
	  * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
	  * @property {number} port - <i>read only</i> the server's port.
	  * @property {string} path - <i>read only</i> the server's path.
	  * @property {string} clientId - <i>read only</i> used when connecting to the server.
	  * @property {function} onConnectionLost - called when a connection has been lost. 
	  *                            after a connect() method has succeeded.
	  *                            Establish the call back used when a connection has been lost. The connection may be
	  *                            lost because the client initiates a disconnect or because the server or network 
	  *                            cause the client to be disconnected. The disconnect call back may be called without 
	  *                            the connectionComplete call back being invoked if, for example the client fails to 
	  *                            connect.
	  *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
	  *                            <ol>   
	  *                            <li>errorCode
	  *                            <li>errorMessage       
	  *                            </ol>
	  * @property {function} onMessageDelivered called when a message has been delivered. 
	  *                            All processing that this Client will ever do has been completed. So, for example,
	  *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
	  *                            and the message has been removed from persistent storage before this callback is invoked. 
	  *                            Parameters passed to the onMessageDelivered callback are:
	  *                            <ol>   
	  *                            <li>{@link Paho.MQTT.Message} that was delivered.
	  *                            </ol>    
	  * @property {function} onMessageArrived called when a message has arrived in this Paho.MQTT.client. 
	  *                            Parameters passed to the onMessageArrived callback are:
	  *                            <ol>   
	  *                            <li>{@link Paho.MQTT.Message} that has arrived.
	  *                            </ol>    
	  */
		var Client = function Client(host, port, path, clientId) {

			var uri;

			if (typeof host !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [typeof host === 'undefined' ? 'undefined' : _typeof(host), 'host']));

			if (arguments.length == 2) {
				// host: must be full ws:// uri
				// port: clientId
				clientId = port;
				uri = host;
				var match = uri.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);
				if (match) {
					host = match[4] || match[2];
					port = parseInt(match[7]);
					path = match[8];
				} else {
					throw new Error(format(ERROR.INVALID_ARGUMENT, [host, 'host']));
				}
			} else {
				if (arguments.length == 3) {
					clientId = path;
					path = '/mqtt';
				}
				if (typeof port !== 'number' || port < 0) throw new Error(format(ERROR.INVALID_TYPE, [typeof port === 'undefined' ? 'undefined' : _typeof(port), 'port']));
				if (typeof path !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [typeof path === 'undefined' ? 'undefined' : _typeof(path), 'path']));

				var ipv6AddSBracket = host.indexOf(':') != -1 && host.slice(0, 1) != '[' && host.slice(-1) != ']';
				uri = 'ws://' + (ipv6AddSBracket ? '[' + host + ']' : host) + ':' + port + path;
			}

			var clientIdLength = 0;
			for (var i = 0; i < clientId.length; i++) {
				var charCode = clientId.charCodeAt(i);
				if (0xD800 <= charCode && charCode <= 0xDBFF) {
					i++; // Surrogate pair.
				}
				clientIdLength++;
			}
			if (typeof clientId !== 'string' || clientIdLength > 65535) throw new Error(format(ERROR.INVALID_ARGUMENT, [clientId, 'clientId']));

			var client = new ClientImpl(uri, host, port, path, clientId);
			this._getHost = function () {
				return host;
			};
			this._setHost = function () {
				throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
			};

			this._getPort = function () {
				return port;
			};
			this._setPort = function () {
				throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
			};

			this._getPath = function () {
				return path;
			};
			this._setPath = function () {
				throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
			};

			this._getURI = function () {
				return uri;
			};
			this._setURI = function () {
				throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
			};

			this._getClientId = function () {
				return client.clientId;
			};
			this._setClientId = function () {
				throw new Error(format(ERROR.UNSUPPORTED_OPERATION));
			};

			this._getOnConnectionLost = function () {
				return client.onConnectionLost;
			};
			this._setOnConnectionLost = function (newOnConnectionLost) {
				if (typeof newOnConnectionLost === 'function') client.onConnectionLost = newOnConnectionLost;else throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnConnectionLost === 'undefined' ? 'undefined' : _typeof(newOnConnectionLost), 'onConnectionLost']));
			};

			this._getOnMessageDelivered = function () {
				return client.onMessageDelivered;
			};
			this._setOnMessageDelivered = function (newOnMessageDelivered) {
				if (typeof newOnMessageDelivered === 'function') client.onMessageDelivered = newOnMessageDelivered;else throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageDelivered === 'undefined' ? 'undefined' : _typeof(newOnMessageDelivered), 'onMessageDelivered']));
			};

			this._getOnMessageArrived = function () {
				return client.onMessageArrived;
			};
			this._setOnMessageArrived = function (newOnMessageArrived) {
				if (typeof newOnMessageArrived === 'function') client.onMessageArrived = newOnMessageArrived;else throw new Error(format(ERROR.INVALID_TYPE, [typeof newOnMessageArrived === 'undefined' ? 'undefined' : _typeof(newOnMessageArrived), 'onMessageArrived']));
			};

			this._getTrace = function () {
				return client.traceFunction;
			};
			this._setTrace = function (trace) {
				if (typeof trace === 'function') {
					client.traceFunction = trace;
				} else {
					throw new Error(format(ERROR.INVALID_TYPE, [typeof trace === 'undefined' ? 'undefined' : _typeof(trace), 'onTrace']));
				}
			};

			/** 
	   * Connect this Messaging client to its server. 
	   * 
	   * @name Paho.MQTT.Client#connect
	   * @function
	   * @param {Object} connectOptions - attributes used with the connection. 
	   * @param {number} connectOptions.timeout - If the connect has not succeeded within this 
	   *                    number of seconds, it is deemed to have failed.
	   *                    The default is 30 seconds.
	   * @param {string} connectOptions.userName - Authentication username for this connection.
	   * @param {string} connectOptions.password - Authentication password for this connection.
	   * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
	   *                    disconnects abnormally.
	   * @param {Number} connectOptions.keepAliveInterval - the server disconnects this client if
	   *                    there is no activity for this number of seconds.
	   *                    The default value of 60 seconds is assumed if not set.
	   * @param {boolean} connectOptions.cleanSession - if true(default) the client and server 
	   *                    persistent state is deleted on successful connect.
	   * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
	   * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
	   * @param {function} connectOptions.onSuccess - called when the connect acknowledgement 
	   *                    has been received from the server.
	   * A single response object parameter is passed to the onSuccess callback containing the following fields:
	   * <ol>
	   * <li>invocationContext as passed in to the onSuccess method in the connectOptions.       
	   * </ol>
	   * @config {function} [onFailure] called when the connect request has failed or timed out.
	   * A single response object parameter is passed to the onFailure callback containing the following fields:
	   * <ol>
	   * <li>invocationContext as passed in to the onFailure method in the connectOptions.       
	   * <li>errorCode a number indicating the nature of the error.
	   * <li>errorMessage text describing the error.      
	   * </ol>
	   * @config {Array} [hosts] If present this contains either a set of hostnames or fully qualified
	   * WebSocket URIs (ws://example.com:1883/mqtt), that are tried in order in place 
	   * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
	   * one of then succeeds.
	   * @config {Array} [ports] If present the set of ports matching the hosts. If hosts contains URIs, this property
	   * is not used.
	   * @throws {InvalidState} if the client is not in disconnected state. The client must have received connectionLost
	   * or disconnected before calling connect for a second or subsequent time.
	   */
			this.connect = function (connectOptions) {
				connectOptions = connectOptions || {};
				validate(connectOptions, { timeout: 'number',
					userName: 'string',
					password: 'string',
					willMessage: 'object',
					keepAliveInterval: 'number',
					cleanSession: 'boolean',
					useSSL: 'boolean',
					invocationContext: 'object',
					onSuccess: 'function',
					onFailure: 'function',
					hosts: 'object',
					ports: 'object',
					mqttVersion: 'number' });

				// If no keep alive interval is set, assume 60 seconds.
				if (connectOptions.keepAliveInterval === undefined) connectOptions.keepAliveInterval = 60;

				if (connectOptions.mqttVersion > 4 || connectOptions.mqttVersion < 3) {
					throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.mqttVersion, 'connectOptions.mqttVersion']));
				}

				if (connectOptions.mqttVersion === undefined) {
					connectOptions.mqttVersionExplicit = false;
					connectOptions.mqttVersion = 4;
				} else {
					connectOptions.mqttVersionExplicit = true;
				}

				//Check that if password is set, so is username
				if (connectOptions.password === undefined && connectOptions.userName !== undefined) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.password, 'connectOptions.password']));

				if (connectOptions.willMessage) {
					if (!(connectOptions.willMessage instanceof Message)) throw new Error(format(ERROR.INVALID_TYPE, [connectOptions.willMessage, 'connectOptions.willMessage']));
					// The will message must have a payload that can be represented as a string.
					// Cause the willMessage to throw an exception if this is not the case.
					connectOptions.willMessage.stringPayload;

					if (typeof connectOptions.willMessage.destinationName === 'undefined') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.willMessage.destinationName), 'connectOptions.willMessage.destinationName']));
				}
				if (typeof connectOptions.cleanSession === 'undefined') connectOptions.cleanSession = true;
				if (connectOptions.hosts) {

					if (!(connectOptions.hosts instanceof Array)) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, 'connectOptions.hosts']));
					if (connectOptions.hosts.length < 1) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts, 'connectOptions.hosts']));

					var usingURIs = false;
					for (var i = 0; i < connectOptions.hosts.length; i++) {
						if (typeof connectOptions.hosts[i] !== 'string') throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.hosts[i]), 'connectOptions.hosts[' + i + ']']));
						if (/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(connectOptions.hosts[i])) {
							if (i == 0) {
								usingURIs = true;
							} else if (!usingURIs) {
								throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], 'connectOptions.hosts[' + i + ']']));
							}
						} else if (usingURIs) {
							throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.hosts[i], 'connectOptions.hosts[' + i + ']']));
						}
					}

					if (!usingURIs) {
						if (!connectOptions.ports) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));
						if (!(connectOptions.ports instanceof Array)) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));
						if (connectOptions.hosts.length != connectOptions.ports.length) throw new Error(format(ERROR.INVALID_ARGUMENT, [connectOptions.ports, 'connectOptions.ports']));

						connectOptions.uris = [];

						for (var i = 0; i < connectOptions.hosts.length; i++) {
							if (typeof connectOptions.ports[i] !== 'number' || connectOptions.ports[i] < 0) throw new Error(format(ERROR.INVALID_TYPE, [_typeof(connectOptions.ports[i]), 'connectOptions.ports[' + i + ']']));
							var host = connectOptions.hosts[i];
							var port = connectOptions.ports[i];

							var ipv6 = host.indexOf(':') != -1;
							uri = 'ws://' + (ipv6 ? '[' + host + ']' : host) + ':' + port + path;
							connectOptions.uris.push(uri);
						}
					} else {
						connectOptions.uris = connectOptions.hosts;
					}
				}

				client.connect(connectOptions);
			};

			/** 
	   * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
	   * 
	   * @name Paho.MQTT.Client#subscribe
	   * @function
	   * @param {string} filter describing the destinations to receive messages from.
	   * <br>
	   * @param {object} subscribeOptions - used to control the subscription
	   *
	   * @param {number} subscribeOptions.qos - the maiximum qos of any publications sent 
	   *                                  as a result of making this subscription.
	   * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback 
	   *                                  or onFailure callback.
	   * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
	   *                                  has been received from the server.
	   *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
	   *                                  <ol>
	   *                                  <li>invocationContext if set in the subscribeOptions.       
	   *                                  </ol>
	   * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
	   *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
	   *                                  <ol>
	   *                                  <li>invocationContext - if set in the subscribeOptions.       
	   *                                  <li>errorCode - a number indicating the nature of the error.
	   *                                  <li>errorMessage - text describing the error.      
	   *                                  </ol>
	   * @param {number} subscribeOptions.timeout - which, if present, determines the number of
	   *                                  seconds after which the onFailure calback is called.
	   *                                  The presence of a timeout does not prevent the onSuccess
	   *                                  callback from being called when the subscribe completes.         
	   * @throws {InvalidState} if the client is not in connected state.
	   */
			this.subscribe = function (filter, subscribeOptions) {
				if (typeof filter !== 'string') throw new Error('Invalid argument:' + filter);
				subscribeOptions = subscribeOptions || {};
				validate(subscribeOptions, { qos: 'number',
					invocationContext: 'object',
					onSuccess: 'function',
					onFailure: 'function',
					timeout: 'number'
				});
				if (subscribeOptions.timeout && !subscribeOptions.onFailure) throw new Error('subscribeOptions.timeout specified with no onFailure callback.');
				if (typeof subscribeOptions.qos !== 'undefined' && !(subscribeOptions.qos === 0 || subscribeOptions.qos === 1 || subscribeOptions.qos === 2)) throw new Error(format(ERROR.INVALID_ARGUMENT, [subscribeOptions.qos, 'subscribeOptions.qos']));
				client.subscribe(filter, subscribeOptions);
			};

			/**
	   * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
	   * 
	   * @name Paho.MQTT.Client#unsubscribe
	   * @function
	   * @param {string} filter - describing the destinations to receive messages from.
	   * @param {object} unsubscribeOptions - used to control the subscription
	   * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback 
	                                        or onFailure callback.
	   * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
	   *                                    A single response object parameter is passed to the 
	   *                                    onSuccess callback containing the following fields:
	   *                                    <ol>
	   *                                    <li>invocationContext - if set in the unsubscribeOptions.     
	   *                                    </ol>
	   * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
	   *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
	   *                                    <ol>
	   *                                    <li>invocationContext - if set in the unsubscribeOptions.       
	   *                                    <li>errorCode - a number indicating the nature of the error.
	   *                                    <li>errorMessage - text describing the error.      
	   *                                    </ol>
	   * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
	   *                                    after which the onFailure callback is called. The presence of
	   *                                    a timeout does not prevent the onSuccess callback from being
	   *                                    called when the unsubscribe completes
	   * @throws {InvalidState} if the client is not in connected state.
	   */
			this.unsubscribe = function (filter, unsubscribeOptions) {
				if (typeof filter !== 'string') throw new Error('Invalid argument:' + filter);
				unsubscribeOptions = unsubscribeOptions || {};
				validate(unsubscribeOptions, { invocationContext: 'object',
					onSuccess: 'function',
					onFailure: 'function',
					timeout: 'number'
				});
				if (unsubscribeOptions.timeout && !unsubscribeOptions.onFailure) throw new Error('unsubscribeOptions.timeout specified with no onFailure callback.');
				client.unsubscribe(filter, unsubscribeOptions);
			};

			/**
	   * Send a message to the consumers of the destination in the Message.
	   * 
	   * @name Paho.MQTT.Client#send
	   * @function 
	   * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent. 
	   * 					   - If it is the only parameter, used as Paho.MQTT.Message object.
	   * @param {String|ArrayBuffer} payload - The message data to be sent. 
	   * @param {number} qos The Quality of Service used to deliver the message.
	   * 		<dl>
	   * 			<dt>0 Best effort (default).
	   *     			<dt>1 At least once.
	   *     			<dt>2 Exactly once.     
	   * 		</dl>
	   * @param {Boolean} retained If true, the message is to be retained by the server and delivered 
	   *                     to both current and future subscriptions.
	   *                     If false the server only delivers the message to current subscribers, this is the default for new Messages. 
	   *                     A received message has the retained boolean set to true if the message was published 
	   *                     with the retained boolean set to true
	   *                     and the subscrption was made after the message has been published. 
	   * @throws {InvalidState} if the client is not connected.
	   */
			this.send = function (topic, payload, qos, retained) {
				var message;

				if (arguments.length == 0) {
					throw new Error('Invalid argument.' + 'length');
				} else if (arguments.length == 1) {

					if (!(topic instanceof Message) && typeof topic !== 'string') throw new Error('Invalid argument:' + (typeof topic === 'undefined' ? 'undefined' : _typeof(topic)));

					message = topic;
					if (typeof message.destinationName === 'undefined') throw new Error(format(ERROR.INVALID_ARGUMENT, [message.destinationName, 'Message.destinationName']));
					client.send(message);
				} else {
					//parameter checking in Message object 
					message = new Message(payload);
					message.destinationName = topic;
					if (arguments.length >= 3) message.qos = qos;
					if (arguments.length >= 4) message.retained = retained;
					client.send(message);
				}
			};

			/** 
	   * Normal disconnect of this Messaging client from its server.
	   * 
	   * @name Paho.MQTT.Client#disconnect
	   * @function
	   * @throws {InvalidState} if the client is already disconnected.     
	   */
			this.disconnect = function () {
				client.disconnect();
			};

			/** 
	   * Get the contents of the trace log.
	   * 
	   * @name Paho.MQTT.Client#getTraceLog
	   * @function
	   * @return {Object[]} tracebuffer containing the time ordered trace records.
	   */
			this.getTraceLog = function () {
				return client.getTraceLog();
			};

			/** 
	   * Start tracing.
	   * 
	   * @name Paho.MQTT.Client#startTrace
	   * @function
	   */
			this.startTrace = function () {
				client.startTrace();
			};

			/** 
	   * Stop tracing.
	   * 
	   * @name Paho.MQTT.Client#stopTrace
	   * @function
	   */
			this.stopTrace = function () {
				client.stopTrace();
			};

			this.isConnected = function () {
				return client.connected;
			};
		};

		Client.prototype = {
			get host() {
				return this._getHost();
			},
			set host(newHost) {
				this._setHost(newHost);
			},

			get port() {
				return this._getPort();
			},
			set port(newPort) {
				this._setPort(newPort);
			},

			get path() {
				return this._getPath();
			},
			set path(newPath) {
				this._setPath(newPath);
			},

			get clientId() {
				return this._getClientId();
			},
			set clientId(newClientId) {
				this._setClientId(newClientId);
			},

			get onConnectionLost() {
				return this._getOnConnectionLost();
			},
			set onConnectionLost(newOnConnectionLost) {
				this._setOnConnectionLost(newOnConnectionLost);
			},

			get onMessageDelivered() {
				return this._getOnMessageDelivered();
			},
			set onMessageDelivered(newOnMessageDelivered) {
				this._setOnMessageDelivered(newOnMessageDelivered);
			},

			get onMessageArrived() {
				return this._getOnMessageArrived();
			},
			set onMessageArrived(newOnMessageArrived) {
				this._setOnMessageArrived(newOnMessageArrived);
			},

			get trace() {
				return this._getTrace();
			},
			set trace(newTraceFunction) {
				this._setTrace(newTraceFunction);
			}

		};

		/** 
	  * An application message, sent or received.
	  * <p>
	  * All attributes may be null, which implies the default values.
	  * 
	  * @name Paho.MQTT.Message
	  * @constructor
	  * @param {String|ArrayBuffer} payload The message data to be sent.
	  * <p>
	  * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
	  * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
	  * <p>
	  * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
	  *                    (for messages about to be sent) or the name of the destination from which the message has been received.
	  *                    (for messages received by the onMessage function).
	  * <p>
	  * @property {number} qos The Quality of Service used to deliver the message.
	  * <dl>
	  *     <dt>0 Best effort (default).
	  *     <dt>1 At least once.
	  *     <dt>2 Exactly once.     
	  * </dl>
	  * <p>
	  * @property {Boolean} retained If true, the message is to be retained by the server and delivered 
	  *                     to both current and future subscriptions.
	  *                     If false the server only delivers the message to current subscribers, this is the default for new Messages. 
	  *                     A received message has the retained boolean set to true if the message was published 
	  *                     with the retained boolean set to true
	  *                     and the subscrption was made after the message has been published. 
	  * <p>
	  * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received. 
	  *                     This is only set on messages received from the server.
	  *                     
	  */
		var Message = function Message(newPayload) {
			var payload;
			if (typeof newPayload === 'string' || newPayload instanceof ArrayBuffer || newPayload instanceof Int8Array || newPayload instanceof Uint8Array || newPayload instanceof Int16Array || newPayload instanceof Uint16Array || newPayload instanceof Int32Array || newPayload instanceof Uint32Array || newPayload instanceof Float32Array || newPayload instanceof Float64Array) {
				payload = newPayload;
			} else {
				throw format(ERROR.INVALID_ARGUMENT, [newPayload, 'newPayload']);
			}

			this._getPayloadString = function () {
				if (typeof payload === 'string') return payload;else return parseUTF8(payload, 0, payload.length);
			};

			this._getPayloadBytes = function () {
				if (typeof payload === 'string') {
					var buffer = new ArrayBuffer(UTF8Length(payload));
					var byteStream = new Uint8Array(buffer);
					stringToUTF8(payload, byteStream, 0);

					return byteStream;
				} else {
					return payload;
				};
			};

			var destinationName = undefined;
			this._getDestinationName = function () {
				return destinationName;
			};
			this._setDestinationName = function (newDestinationName) {
				if (typeof newDestinationName === 'string') destinationName = newDestinationName;else throw new Error(format(ERROR.INVALID_ARGUMENT, [newDestinationName, 'newDestinationName']));
			};

			var qos = 0;
			this._getQos = function () {
				return qos;
			};
			this._setQos = function (newQos) {
				if (newQos === 0 || newQos === 1 || newQos === 2) qos = newQos;else throw new Error('Invalid argument:' + newQos);
			};

			var retained = false;
			this._getRetained = function () {
				return retained;
			};
			this._setRetained = function (newRetained) {
				if (typeof newRetained === 'boolean') retained = newRetained;else throw new Error(format(ERROR.INVALID_ARGUMENT, [newRetained, 'newRetained']));
			};

			var duplicate = false;
			this._getDuplicate = function () {
				return duplicate;
			};
			this._setDuplicate = function (newDuplicate) {
				duplicate = newDuplicate;
			};
		};

		Message.prototype = {
			get payloadString() {
				return this._getPayloadString();
			},
			get payloadBytes() {
				return this._getPayloadBytes();
			},

			get destinationName() {
				return this._getDestinationName();
			},
			set destinationName(newDestinationName) {
				this._setDestinationName(newDestinationName);
			},

			get qos() {
				return this._getQos();
			},
			set qos(newQos) {
				this._setQos(newQos);
			},

			get retained() {
				return this._getRetained();
			},
			set retained(newRetained) {
				this._setRetained(newRetained);
			},

			get duplicate() {
				return this._getDuplicate();
			},
			set duplicate(newDuplicate) {
				this._setDuplicate(newDuplicate);
			}
		};

		// Module contents.
		return {
			Client: Client,
			Message: Message
		};
	}(window);

	exports.default = Paho;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(69),
	      utf8 = __webpack_require__(70).utf8,
	      isBuffer = __webpack_require__(71),
	      bin = __webpack_require__(70).bin,

	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;

	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }

	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;

	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;

	    for (var i = 0; i < m.length; i += 16) {

	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;

	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }

	    return crypt.endian([a, b, c, d]);
	  };

	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };

	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;

	  module.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);

	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };

	})();


/***/ }),
/* 69 */
/***/ (function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },

	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();


/***/ }),
/* 70 */
/***/ (function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}

	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.syncDatapoints = syncDatapoints;
	exports.getDataPointResult = getDataPointResult;
	exports.setDataPointResult = setDataPointResult;
	exports.notifyEvent = notifyEvent;
	exports.systemEvent = systemEvent;
	exports.log = log;
	exports.getDataPoint = getDataPoint;
	exports.setDataPointArray = setDataPointArray;
	exports.setDeviceOffline = setDeviceOffline;

	var _pad = __webpack_require__(73);

	var _lang = __webpack_require__(60);

	/**
	 * 同步数据端点,设备上报数据端点
	 * @param  {Array} bytes 字节数组
	 */
	function syncDatapoints(bytes) {
	  // 第5位为数据端点上报标识位，占一个字节
	  var flag = (0, _pad.pad)(bytes[4].toString(2), 8);
	  var index = 5;

	  // 数据端点上报标识位最高位为设备名称标识
	  if (flag[0] === '1') {
	    console.log('设备端点标识');
	    // 其他字节的前两位表示设备名称长度(两个字节)
	    // let nameLen = _bytesToInt(bytes.splice(4, 6))
	    var nameLen = (0, _pad._bytesToInt)(bytes.slice(5, 7));

	    index += nameLen + 2;
	  }

	  if (flag[4] === '1') {
	    // 时间戳占8位
	    // let timestamp = this._bytesToTimestamp(bytes.slice(index, index + 8))
	    index += 8;
	  }

	  var datapointBytes = bytes.slice(index);
	  var i = 0;
	  var datapointArr = [];

	  var _loop = function _loop() {
	    // 1.获取数据端点的索引
	    var datapointIndex = datapointBytes[i];
	    var arr = [];
	    // 2.获取两个字节，得到数据端点的类型和数据端点的长度
	    datapointBytes.slice(i + 1, i + 3).forEach(function (item) {
	      arr.push((0, _pad.pad)(item.toString(2), 8));
	    });
	    var str = arr.join('');
	    var type = parseInt(str.slice(0, 4), 2);
	    var len = parseInt(str.slice(4), 2);
	    // 3.拿到数据端点内容
	    var value = datapointBytes.slice(i + 3, i + 3 + len);
	    switch (type) {
	      case 9:
	        // 字符串
	        value = (0, _pad._bytesToString)(value);
	        break;
	      case 10:
	        // 字节数组转16进制
	        value = (0, _pad._bytesToHex)(value);
	        break;
	      case 7:
	        // 浮点数
	        value = (0, _pad._bytesToFloat)(value);
	        break;
	      default:
	        // 整型
	        value = (0, _pad._bytesToNum)(value, type);
	    }

	    datapointArr.push({
	      index: datapointIndex,
	      value: value,
	      type: _pad.dataPointType[type] || type
	    });
	    i = i + len + 3;
	  };

	  while (i < datapointBytes.length) {
	    _loop();
	  }
	  return datapointArr;
	}

	/**
	 * 应用获取数据端点结果
	 * @param  {Array} bytes 字节数组
	 */
	function getDataPointResult(bytes) {
	  // 服务不可用，获取失败，返回不附带Datapoint Flag、Datapoint Value
	  if (bytes[6] === 1) {
	    return;
	  }
	  // 第7位为数据端点上报标识位，占一个字节
	  var flag = (0, _pad.pad)(bytes[7].toString(2), 8);
	  var index = 8;

	  // 数据端点上报标识位最高位为设备名称标识
	  if (flag[0] === '1') {
	    // 其他字节的前两位表示设备名称长度(两个字节)
	    var nameLen = (0, _pad._bytesToInt)(bytes.slice(8, 10));
	    index += nameLen + 2;
	  }

	  // 判断是否有数据端点
	  if (flag[1] === 0) {
	    return [];
	  }

	  var datapointBytes = bytes.slice(index);
	  var i = 0;
	  var datapointArr = [];

	  var _loop2 = function _loop2() {
	    var datapointIndex = datapointBytes[i];
	    var arr = [];
	    datapointBytes.slice(i + 1, i + 3).forEach(function (item) {
	      arr.push((0, _pad.pad)(item.toString(2), 8));
	    });
	    var str = arr.join('');
	    var type = parseInt(str.slice(0, 4), 2);
	    var len = parseInt(str.slice(4), 2);
	    var value = datapointBytes.slice(i + 3, i + 3 + len);
	    switch (type) {
	      case 9:
	        // 字符串
	        value = (0, _pad._bytesToString)(value);
	        break;
	      case 10:
	        // 字节数组
	        value = (0, _pad._bytesToHex)(value);
	        break;
	      case 7:
	        // 浮点数
	        value = (0, _pad._bytesToFloat)(value);
	        break;
	      default:
	        value = (0, _pad._bytesToNum)(value, type);
	    }

	    datapointArr.push({
	      index: datapointIndex,
	      value: value,
	      type: _pad.dataPointType[type] || type
	    });
	    i = i + len + 3;
	  };

	  while (i < datapointBytes.length) {
	    _loop2();
	  }
	  return datapointArr;
	}

	/**
	 * 处理数据端点设置，应用设置数据端点
	 * @param  {Array} bytes 字节数组
	 */
	function setDataPointResult(bytes) {
	  var result = {
	    '0': {
	      status: 0,
	      msg: 'datapoint set successfully'
	    },
	    '1': {
	      status: 1,
	      msg: 'datapoint Setup failed'
	    },
	    '2': {
	      status: 2,
	      msg: 'no set permissions are granted'
	    }
	  };
	  return result[bytes[6]] || bytes[6];
	}

	/**
	 * 应用通知事件
	 * @param  {Array} bytes 字节数组
	 */
	function notifyEvent(bytes) {
	  var source = {
	    '1': 'event from server',
	    '2': 'event from device',
	    '3': 'event form app'
	  };
	  var eventSource = source[bytes[4]] || bytes[4] || '';
	  var result = {
	    '1': {
	      status: 1,
	      msg: '设备通知,数据端点变化通知'
	    },
	    '2': {
	      status: 2,
	      msg: '设备告警，数据端点变化引起的告警'
	    },
	    '3': {
	      status: 3,
	      msg: '设备分享，设备管理员发出的分享'
	    },
	    '4': {
	      status: 4,
	      msg: '消息广播推送'
	    },
	    '5': {
	      status: 5,
	      msg: '设备属性变化通知'
	    },
	    '6': {
	      status: 6,
	      msg: '设备与用户订阅关系变化通知'
	    },
	    '7': {
	      status: 7,
	      msg: '设备在线状态变化通知'
	    },
	    '8': {
	      status: 8,
	      msg: '设备在线状态告警'
	    },
	    '9': {
	      status: 9,
	      msg: '家庭消息通知，留言板消息'
	    },
	    '10': {
	      status: 10,
	      msg: '家庭邀请通知'
	    },
	    '11': {
	      status: 11,
	      msg: '家庭设备权限变化'
	    },
	    '12': {
	      status: 12,
	      msg: '家庭成员变化'
	    },
	    '13': {
	      status: 13,
	      msg: '家庭设备变化'
	    }
	  };
	  var type = (0, _pad._bytesToInt)(bytes.slice(9, 11));
	  var response = result[type] || {};
	  response.source = eventSource;
	  return response;
	}

	/**
	 * 系统事件
	 * @param  {Array} bytes 字节数组
	 */
	function systemEvent(bytes) {
	  var result = {
	    '1': {
	      status: 1,
	      msg: '升级指令'
	    },
	    '2': {
	      status: 2,
	      msg: '升级完成'
	    },
	    '3': {
	      status: 3,
	      msg: '请求服务器时间'
	    },
	    '4': {
	      status: 4,
	      msg: '服务器时间应答'
	    },
	    '5': {
	      status: 5,
	      msg: '强制踢下线'
	    }
	  };
	  var type = (0, _pad._bytesToInt)(bytes.slice(4, 6));
	  return result[type] || type;
	}

	/**
	 * 写入设备日志
	 * @param  {Array} bytes 字节数组
	 */
	function log(bytes) {
	  // [0, 20, 0, 35, 0, 3, 89, 220, 55, 43, 0, 27, 54, 55, 50, 57, 56, 52, 51, 48, 53, 35, 46, 35, 70, 48, 70, 69, 54, 66, 55, 57, 50, 54, 52, 57, 35, 46, 35]
	  // 11点左右
	  // [0, 20, 0, 35, 0, 3, 89, 220, 55, 217, 0, 27, 54, 55, 50, 57, 56, 52, 51, 48, 53, 35, 46, 35, 70, 48, 70, 69, 54, 66, 55, 57, 50, 54, 52, 57, 35, 46, 35]
	  // 第5到第6位为日志等级和日志内容，需要转成16进制，拼成字符串再转回10进制
	  var arr = [];
	  bytes.slice(4, 6).forEach(function (item) {
	    arr.push((0, _pad.pad)(item.toString(2), 8));
	  });
	  var str = arr.join('');
	  var level = parseInt(str.slice(0, 4), 2);
	  var type = parseInt(str.slice(4), 2);

	  // 第7到第14位为时间戳
	  var timestamp = (0, _pad._bytesToTimestamp)(bytes.slice(6, 14));

	  var msgArr = (0, _pad._bytesToString)(bytes.slice(16)).split('#.#');

	  return {
	    timestamp: timestamp,
	    level: level,
	    msg: (0, _pad.msgText)(type, msgArr)
	  };
	}

	/**
	 * ********************************************app发起的行为*****************************************************
	 * */

	/**
	 * 获取数据端点
	 * @export
	 * @param {any} msgId
	 * @returns {any} msgId
	 */
	function getDataPoint(msgId) {
	  // 7个固定的数据长度
	  var b = new ArrayBuffer(7);
	  var v1 = new Uint8Array(b);
	  var len = (0, _pad.pad)(3 .toString(2), 16);
	  /*
	   * arraybufferArray（用整型存储）
	   * 数据包类型，用两个字节来存储
	   * 0： 默认0
	   * 1： 默认为7
	   *
	   * 数据包长度，就是内存的字节数，用两个字节来存储
	   * 2：数据包高位
	   * 3：数据包低位
	   *
	   * messageID
	   * 4：message高位
	   * 5：message低位
	   *
	   * 标志位
	   * 6
	   *
	   * 数据包内容
	   * 7 数据端点索引
	   * 8  前四位代表type类型
	   * 9：后12位代表数据内容的长度（字节）
	   * 10 数据包内容
	   */
	  v1[0] = 0;
	  v1[1] = 9;
	  v1[2] = parseInt(len.slice(0, 8), 2);
	  v1[3] = parseInt(len.slice(8, 16), 2);
	  v1[4] = 0;
	  v1[5] = msgId++;
	  v1[6] = parseInt('10000000', 2);
	  // 把内存发过去
	  return {
	    b: b,
	    msgId: msgId
	  };
	}

	/**
	 * 设置数据端点数组类型
	 * @export
	 * @param {Array} array
	 * @param {Number} msgId
	 * @returns
	 */
	function setDataPointArray(array, msgId) {
	  // 后端定义的数据端点类型值跟硬件定义不一样，需要做个映射
	  var arrlen = 0;
	  var arr = [];
	  array.forEach(function (item) {
	    arr.push((0, _lang.clone)(item));
	  });
	  arr.forEach(function (dp, index) {
	    var datapoint = {
	      '1': { // 布尔类型
	        type: 0,
	        len: 1
	      },
	      '2': { // 单字节(无符号)
	        type: 0,
	        len: 1
	      },
	      '3': { // 16位短整型(有符号)
	        type: 1,
	        len: 2
	      },
	      '4': { // 32位整型(有符号)
	        type: 3,
	        len: 4
	      },
	      '5': { // 浮点
	        type: 7,
	        len: 4
	      },
	      '6': { // 字符串
	        type: 9
	      },
	      '7': { // 字节数组
	        type: 10
	      },
	      '8': { // 16位短整型(无符号)
	        type: 2,
	        len: 2
	      },
	      '9': { // 32位整型(无符号)
	        type: 4,
	        len: 4
	      }
	    }[dp.type];

	    if (dp.type === 1) {
	      // 布尔值转换成0和1
	      arr[index].value = dp.value ? 1 : 0;
	    }

	    var valLen = datapoint.len || dp.value.length;

	    if (datapoint.type === 9) {
	      // 字符串的长度
	      valLen = (0, _pad._stringToBytes)(dp.value).length;
	    } else if (datapoint.type === 10) {
	      // 字节数组
	      valLen = Math.ceil(dp.value.length / 2);
	    }
	    // 存储有用的数据（index, value, type,valLen）
	    arr[index].valLen = valLen;
	    arr[index].type = datapoint.type;
	    // 获取整个端点数组的长度
	    arrlen += valLen;
	    arrlen += 3;
	  });

	  // 7个固定的数据端点长度，arrlen数据的长度，其中字节数组和字符串数组不确定
	  var b = new ArrayBuffer(7 + arrlen);
	  var v1 = new Int8Array(b);
	  // 数据内容arrlen + 数据包实体内容3
	  var len = (0, _pad.pad)((arrlen + 3).toString(2), 16);

	  /*
	   * arraybufferArray（用整型存储）
	   * 数据包类型，用两个字节来存储
	   * 0： 默认0
	   * 1： 默认为7
	   *
	   * 数据包长度，就是内存的字节数，用两个字节来存储
	   * 2：数据包低位
	   * 3：数据包高位
	   *
	   * messageID
	   * 4：message高位（一般不超过255，所有默认为0）
	   * 5：message低位
	   *
	   * 标志位
	   * 6 一般默认没有设备名称选项
	   *
	   * 数据端点内容
	   * 7 数据端点索引
	   * 8  前四位代表type类型
	   * 9：后12位代表数据内容的长度（字节）
	   * 10 数据包内容（n个字节）
	   */
	  v1[0] = 0;
	  v1[1] = 7;
	  v1[2] = parseInt(len.slice(0, 8), 2);
	  v1[3] = parseInt(len.slice(8, 16), 2);
	  v1[4] = 0;
	  v1[5] = msgId++;
	  v1[6] = parseInt('01100000', 2);
	  var i = 7;
	  arr.forEach(function (dp) {
	    // 每位数据端点的内容以及索引，长度
	    v1[i] = dp.index;
	    var bin = '' + (0, _pad.pad)(dp.type.toString(2), 4) + (0, _pad.pad)(dp.valLen.toString(2), 12);
	    v1[i + 1] = parseInt(bin.slice(0, 8), 2);
	    v1[i + 2] = parseInt(bin.slice(8, 16), 2);
	    // 从buffer的第十位开始创建一个新的进制存到内存（以大端字节方式写入）
	    var v2 = new DataView(b, i + 3, dp.valLen);
	    switch (dp.type) {
	      case 0:
	        v2.setUint8(0, dp.value, false);
	        break;
	      case 1:
	        v2.setInt16(0, dp.value, false);
	        break;
	      case 2:
	        v2.setUint16(0, dp.value, false);
	        break;
	      case 3:
	        v2.setInt32(0, dp.value, false);
	        break;
	      case 4:
	        v2.setUint32(0, dp.value, false);
	        break;
	      case 7:
	        v2.setFloat32(0, dp.value, false);
	        break;
	      // 字符串
	      case 9:
	        var s = (0, _pad._stringToBytes)(dp.value);
	        s.forEach(function (item, index) {
	          v2.setUint8(index, item, false);
	        });
	        break;
	      // 字节数组
	      case 10:
	        // 一个字节存储两个字节数组的量（以16进制的方式）
	        for (var _i = 0; _i < dp.valLen; _i++) {
	          var str = (0, _pad.pad)(dp.value.slice(_i * 2, (_i + 1) * 2), 2);
	          v2.setInt8(_i, parseInt(str, 16), false);
	        }
	        break;
	      default:
	    }
	    i = i + 3 + dp.valLen;
	  });
	  // 把内存发过去
	  return {
	    b: b,
	    msgId: msgId
	  };
	}

	/**
	 * 设备下线
	 * @export
	 * @returns
	 */
	function setDeviceOffline() {
	  var b = new ArrayBuffer(4);
	  var v1 = new Int8Array(b);
	  v1[0] = 0;
	  v1[1] = 11;
	  v1[2] = 0;
	  v1[3] = 4;
	  return b;
	}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pad = pad;
	exports._bytesToTimestamp = _bytesToTimestamp;
	exports._bytesToInt = _bytesToInt;
	exports._bytesToNum = _bytesToNum;
	exports._bytesToFloat = _bytesToFloat;
	exports._bytesToHex = _bytesToHex;
	exports._bytesToString = _bytesToString;
	exports._stringToBytes = _stringToBytes;
	exports.msgText = msgText;
	/**
	 * 在前面补0
	 * @param  {Number|String} num 需要补零的数字
	 * @param  {Number} n   长度
	 * @return {String}
	 */
	function pad(num, n) {
	  var len = num.toString().length;
	  while (len < n) {
	    num = '0' + num;
	    len++;
	  }
	  return num;
	}

	/**
	 * 字节数组转时间戳，需要转成16进制，拼成字符串再转回10进制
	 * @param  {Array}  bytes 字节数组
	 * @param  {Boolean} ms 是否毫秒
	 * @return {String}
	 */
	function _bytesToTimestamp(bytes) {
	  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  // let result = _bytesToInt(bytes)
	  // return ms ? result * 1000 : result
	  return _bytesToInt(bytes);
	}

	/**
	 * 字节数组转数字
	 * @param  {Array}  bytes 字节数组
	 * @return {String}
	 */
	function _bytesToInt(bytes) {
	  var arr = [];
	  bytes.forEach(function (item) {
	    arr.push(pad(item.toString(2), 8));
	  });
	  return parseInt(arr.join(''), 2);
	}

	/**
	 * 字节数组转数字
	 * @param  {Array}  bytes 字节数组
	 * @return {String}
	 */
	function _bytesToNum(bytes, type) {
	  var res = 0;
	  var ab = void 0;
	  var view = void 0;
	  switch (type) {
	    case 0:
	      // 单字节
	      res = bytes[0];
	      break;
	    case 1:
	      // 16位有符号
	      ab = new ArrayBuffer(2);
	      view = new Int8Array(ab);
	      view[1] = bytes[0];
	      view[0] = bytes[1];
	      var int16view = new Int16Array(ab);
	      res = int16view[0];
	      break;
	    case 2:
	      // 16位无符号
	      ab = new ArrayBuffer(2);
	      view = new Int8Array(ab);
	      view[1] = bytes[0];
	      view[0] = bytes[1];
	      var uint16view = new Uint16Array(ab);
	      res = uint16view[0];
	      break;
	    case 3:
	      // 32位有符号
	      ab = new ArrayBuffer(4);
	      view = new Int8Array(ab);
	      view[3] = bytes[0];
	      view[2] = bytes[1];
	      view[1] = bytes[2];
	      view[0] = bytes[3];
	      var int32view = new Int32Array(ab);
	      res = int32view[0];
	      break;
	    case 4:
	      // 32位无符号
	      ab = new ArrayBuffer(4);
	      view = new Int8Array(ab);
	      view[3] = bytes[0];
	      view[2] = bytes[1];
	      view[1] = bytes[2];
	      view[0] = bytes[3];
	      var uint32view = new Uint32Array(ab);
	      res = uint32view[0];
	      break;
	    default:
	  }
	  return res;
	}

	/**
	 * 字节数组转浮点数
	 * @param  {Array}  bytes 字节数组
	 * @return {Number}
	 */
	function _bytesToFloat(bytes) {
	  var arr = [];
	  bytes.forEach(function (byte) {
	    arr.push(pad(byte.toString(16), 2));
	  });
	  var a = arr.join('').match(/.{1,2}/g).map(function (num) {
	    return parseInt(num, 16);
	  }).reverse();
	  var uint8Array = new Uint8Array(a).buffer;
	  return new Float32Array(uint8Array)[0];
	}

	/**
	 * 字节数组转十六进制
	 * @param  {Array}  bytes 字节数组
	 * @return {String}
	 */
	function _bytesToHex(bytes) {
	  var arr = [];
	  bytes.forEach(function (item) {
	    arr.push(pad(item.toString(16), 2).toUpperCase());
	  });
	  return arr.join('');
	}

	/**
	 * 字节数组转字符串
	 * @param  {Array}  bytes 字节数组
	 * @return {String}
	 */
	function _bytesToString(bytes) {
	  // return String.fromCharCode.apply(null, bytes)
	  var encodedString = String.fromCharCode.apply(null, bytes);
	  var decodedString = decodeURIComponent(escape(encodedString));
	  return decodedString;
	}

	/**
	 * 字符串转字节数组
	 * @param  {String}  str 字符串
	 * @return {Array}
	 */
	function _stringToBytes(str) {
	  str = unescape(encodeURIComponent(str));
	  var charList = str.split('');
	  var uintArray = [];
	  for (var i = 0; i < charList.length; i++) {
	    uintArray.push(charList[i].charCodeAt(0));
	  }
	  return uintArray;
	}

	/**
	 * 消息文案
	 * @param  {[type]} type 消息类型
	 * @param  {[type]} msg  用于填充消息占位符的数组
	 */
	function msgText(type, msg) {
	  var LOG_TEMPLATES = {
	    '1': '设备[ID:{0}, MAC:{1}]上线了, 上线IP为:{2}',
	    '2': '设备[ID:{0}, MAC:{1}]下线了',
	    '3': '设备[ID:{0}, MAC:{1}]发送Ping',
	    '4': '设备[ID:{0}, MAC:{1}]接收到设置数据端点指令',
	    '5': '设备[ID:{0}, MAC:{1}]返回了设置数据端点指令, 设置返回码为{2}',
	    '6': '设备[ID:{0}, MAC:{1}]接收了应用{2}的订阅请求',
	    '7': '设备[ID:{0}, MAC:{1}]返回了应用{2}的订阅, 返回码为{3}',
	    '8': '设备[ID:{0}, MAC:{1}]上报了数据端点,内容为:{2}',
	    '9': '设备[ID:{0}, MAC:{1}]收到了通知',
	    '10': '设备[ID:{0}, MAC:{1}]完成了升级, 版本由{2}升级到了{3}'
	  };
	  var template = LOG_TEMPLATES[type];
	  return template.replace(/\{(\d)\}/g, function (match, p1) {
	    return msg[p1];
	  });
	}

	var dataPointType = exports.dataPointType = {
	  '1': 3, // 16位短整型(有符号)
	  '2': 8, // 16位短整型(无符号)
	  '3': 4, // 32位整型(有符号)
	  '4': 9, // 32位整型(无符号)
	  '7': 5, // 浮点
	  '9': 6, // 字符串
	  '10': 7 // 字节数组
	};

/***/ })
/******/ ])
});
;