
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var table = "\n.one-column-emphasis{\n\tfont-size: 16px;\n\twidth: 1024PX;\n\ttext-align: left;\n\tborder: 1px solid #dddddd;\n\tborder-collapse: collapse;\n\tmargin: 20px;\n}\n\n.one-column-emphasis th{\n\tfont-size: 15px;\n\tfont-weight: bold;\n\tcolor: #039;\n\tpadding: 12px 15px;\n}\n\n.one-column-emphasis th.sortable{\n\tposition: relative;\n  cursor: pointer;\n  user-select: none;\n  padding-right: 2rem;\n}\n.one-column-emphasis th span.sortable::after{\n\t position: absolute;\n\t  content: '';\n\t  width: 20px;\n\t  height: 20px;\n\t  top: 50%;\n\t  right: 10px;\n\t  margin-top: -10px;\n\t  background: url('/static/sort_sprite.png') no-repeat 0 0;\n\t  overflow: hidden;\n}\n.one-column-emphasis th span.sortable.sort-asc::after{\n\t background-position: -20px 0;\n}\n.one-column-emphasis th span.sortable.sort-dsc::after{\n\t background-position: -40px 0;\n}\n\n\n.one-column-emphasis td{\n\tcolor: #000000;\n\tborder-top: 1px solid #e8edff;\n\tpadding: 10px 15px;\n}\n\n.one-column-emphasis tbody tr:first-child{\n\tborder-top: 5px solid #e8edff;\n}\n\n.one-column-emphasis tbody tr:nth-child(even){\n\tbackground-color: #efe8ff;\n}";

exports.default = table;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/table_css.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/table_css.js"); } } })();

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepCloneObject = undefined;
exports.convertServerToTableData = convertServerToTableData;
exports.calculateAllPercentage = calculateAllPercentage;
exports.recursiveGetValue = recursiveGetValue;

var _stringify = __webpack_require__(543);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var carBuildOptions = [{ value: 'none', label: 'None' }];
var scenarioIdOptions = [{ value: 'none', label: 'None' }];

function convertServerToTableData(data) {
	//match the scenario and simulation, and extend the data in scenario to simulation
	var convertedData = data.simulationRuns.map(function (sim) {
		var matchScenario = data.scenarios.filter(function (scenario) {
			return scenario.scenarioId === sim.scenarioId;
		})[0];

		var runningTime = sim.endTime - sim.startTime;
		var maxRunningTime = matchScenario.maxRunningTime;
		var timeRender = runningTime + ' / ' + maxRunningTime;
		var exceedRunningTime = runningTime > maxRunningTime;

		var numberOfStops = sim.result.numberOfStops;
		var maxNumberOfStops = matchScenario.maxNumberOfStops;
		var stopsRender = numberOfStops + ' / ' + maxNumberOfStops;
		var exceedMaxStops = numberOfStops > maxNumberOfStops;

		if (sim.result.hasCollision === false && !exceedRunningTime && !exceedMaxStops) {
			sim.doesScenarioPass = true;
		} else {
			sim.doesScenarioPass = false;
		}

		sim.timeRender = timeRender;
		sim.stopsRender = stopsRender;
		sim.exceedRunningTime = exceedRunningTime;
		sim.exceedMaxStops = exceedMaxStops;
		// assigning to carBuildOptions & scenarioIdOptions
		carBuildOptions = addSelectOptionToArray(carBuildOptions, sim.carBuild);
		scenarioIdOptions = addSelectOptionToArray(scenarioIdOptions, sim.scenarioId);

		return sim;
	});

	return {
		convertedData: convertedData, carBuildOptions: carBuildOptions, scenarioIdOptions: scenarioIdOptions
	};
}

function calculateAllPercentage(data) {

	var numOfexceedRunningTime = 0,
	    numOfexceedStops = 0,
	    hasCollision = 0,
	    doesnotPass = 0;
	var length = data.length;

	data.forEach(function (d) {
		if (d.exceedRunningTime) numOfexceedRunningTime += 1;
		if (d.exceedMaxStops) numOfexceedStops += 1;
		if (d.result.hasCollision) hasCollision += 1;
		if (d.doesScenarioPass === false) doesnotPass += 1;
	});

	return {
		exceedMaxStops: calculatePercentage(numOfexceedStops, length),
		exceedRunningTime: calculatePercentage(numOfexceedRunningTime, length),
		haveCollision: calculatePercentage(hasCollision, length),
		dontPass: calculatePercentage(doesnotPass, length)
		// percentage of runs that exceed the maximum number of stops
		// percentage of runs that exceed the maximum running time
		// percentage of runs that have a collision
		// percentage of runs that do not pass
	};
}

function calculatePercentage(value, length) {
	if (length === 0) return 0;
	return (value / length * 100).toFixed(2);
}

var deepCloneObject = exports.deepCloneObject = function deepCloneObject(obj) {
	return JSON.parse((0, _stringify2.default)(obj));
};

function recursiveGetValue(obj, fieldString) {
	var arrayOfField = fieldString.indexOf('.') > 0 ? fieldString.split('.') : [fieldString];

	if (arrayOfField.length === 1) {
		return String(obj[arrayOfField[0]]);
	}

	var nextObj = obj[arrayOfField[0]];
	return recursiveGetValue(nextObj, arrayOfField.slice(1));
}

function addSelectOptionToArray(array, value) {
	var obj = { value: value, label: value };
	var isDuplicate = array.filter(function (obj) {
		return obj.value === value;
	}).length > 0;

	//prevent duplicate value
	if (isDuplicate) {
		return array;
	}
	return array.concat([obj]);
}

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/helper/appHelper.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/helper/appHelper.js"); } } })();

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(544);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = __webpack_require__(37);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _index_css = __webpack_require__(548);

var _index_css2 = _interopRequireDefault(_index_css);

var _Table = __webpack_require__(551);

var _Table2 = _interopRequireDefault(_Table);

var _Select = __webpack_require__(549);

var _Select2 = _interopRequireDefault(_Select);

var _service = __webpack_require__(553);

var _appHelper = __webpack_require__(541);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_Component) {
  (0, _inherits3.default)(App, _Component);

  function App(props) {
    (0, _classCallCheck3.default)(this, App);

    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

    _this.state = {
      convertOriginalData: [],
      sortedOrFilteredData: [], // this is when data is sorted or filtered
      carBuildOptions: [],
      scenarioIdOptions: [],
      filteredObject_carBuild: {
        fieldName: 'carBuild',
        fieldValue: undefined
      },
      filteredObject_scenarioId: {
        fieldName: 'scenarioId',
        fieldValue: undefined
      },
      statistics: {
        exceedMaxStops: 0,
        exceedRunningTime: 0,
        haveCollision: 0,
        dontPass: 0
      }
    };

    _this.sortAction = _this.sortAction.bind(_this);
    _this.runFilter = _this.runFilter.bind(_this);
    _this.onFilterChange = _this.onFilterChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      (0, _service.fetchData)().then(function (res) {
        var _convertServerToTable = (0, _appHelper.convertServerToTableData)(res),
            convertedData = _convertServerToTable.convertedData,
            carBuildOptions = _convertServerToTable.carBuildOptions,
            scenarioIdOptions = _convertServerToTable.scenarioIdOptions;

        var statistics = (0, _appHelper.calculateAllPercentage)(convertedData);
        _this2.setState({
          convertOriginalData: convertedData,
          sortedOrFilteredData: convertedData,
          carBuildOptions: carBuildOptions,
          scenarioIdOptions: scenarioIdOptions,
          statistics: statistics
        });
      }).catch(function (err) {
        return console.error(err);
      });
    }
  }, {
    key: 'onFilterChange',
    value: function onFilterChange(e, fieldName) {
      var _setState;

      var value = e.target.value === 'none' ? undefined : e.target.value;
      var currentStateName = fieldName === 'carBuild' ? 'filteredObject_carBuild' : 'filteredObject_scenarioId';
      var stateName2 = fieldName !== 'carBuild' ? 'filteredObject_carBuild' : 'filteredObject_scenarioId';

      var currentObject = {
        fieldName: this.state[currentStateName].fieldName,
        fieldValue: value
      };
      var obj2 = {
        fieldName: this.state[stateName2].fieldName,
        fieldValue: this.state[stateName2].fieldValue
      };

      var filteredData = this.runFilter(currentObject, obj2);
      var statistics = (0, _appHelper.calculateAllPercentage)(filteredData);
      this.setState((_setState = {}, (0, _defineProperty3.default)(_setState, currentStateName, currentObject), (0, _defineProperty3.default)(_setState, 'sortedOrFilteredData', filteredData), (0, _defineProperty3.default)(_setState, 'statistics', statistics), _setState));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', null, _react2.default.createElement('style', null, _index_css2.default), _react2.default.createElement('div', { className: 'App' }, _react2.default.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } }, _react2.default.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '10px 30px', textAlign: 'left' } }, _react2.default.createElement('p', { style: { fontWeight: 'bold' } }, 'Filtered by:'), _react2.default.createElement('div', null, _react2.default.createElement('p', { style: { display: 'block' } }, 'Car Build:'), _react2.default.createElement(_Select2.default, {
        options: this.state.carBuildOptions,
        onChange: function onChange(e) {
          return _this3.onFilterChange(e, 'carBuild');
        }
      })), _react2.default.createElement('div', null, _react2.default.createElement('p', { style: { display: 'block' } }, 'ScenarioId:'), _react2.default.createElement(_Select2.default, {
        options: this.state.scenarioIdOptions,
        onChange: function onChange(e) {
          return _this3.onFilterChange(e, 'scenarioId');
        }
      }))), _react2.default.createElement('div', { style: { display: 'flex', flexDirection: 'column', margin: '10px 30px', width: 360, textAlign: 'left' } }, _react2.default.createElement('div', null, _react2.default.createElement('p', null, ' exceed the maximum number of stops: ', _react2.default.createElement('strong', null, this.state.statistics.exceedMaxStops, ' %')), _react2.default.createElement('p', null, ' exceed the maximum running time: ', _react2.default.createElement('strong', null, this.state.statistics.exceedRunningTime, ' %')), _react2.default.createElement('p', null, ' have a collision: ', _react2.default.createElement('strong', null, this.state.statistics.haveCollision, ' %')), _react2.default.createElement('p', null, ' do not pass: ', _react2.default.createElement('strong', null, this.state.statistics.dontPass, ' %'))))), _react2.default.createElement('div', null, _react2.default.createElement(_Table2.default, {
        data: this.state.sortedOrFilteredData,
        headerFields: [
        // rearrange the array below to rearrange the column in rendered table
        { label: 'scenarioId', dataFieldName: 'scenarioId', sortAction: this.sortAction }, { label: 'carBuild', dataFieldName: 'carBuild', sortAction: this.sortAction }, { label: 'startTime', dataFieldName: 'startTime', sortAction: this.sortAction }, { label: 'runningTime / maxRunningTime', dataFieldName: 'timeRender' }, { label: 'numberOfStops / maxNumberOfStops', dataFieldName: 'stopsRender' }, { label: 'hasCollision', dataFieldName: 'result.hasCollision', sortAction: this.sortAction }, { label: 'doesScenarioPass', dataFieldName: 'doesScenarioPass', sortAction: this.sortAction }]
      }))));
    }

    /**
     * sortAction, sort array in state, and then setState the sorted array
     * @param  label:String      [description]
     * @param  fieldName:String  [description]
     * @param  sortAction:String [description]
     * @return undefined
     */

  }, {
    key: 'sortAction',
    value: function sortAction(label, fieldName, _sortAction) {
      // since sorting array in javascript will mutate the original array, I will clone the filteredArray
      // cloning, simple implementation of immutability
      var filteredData = (0, _appHelper.deepCloneObject)(this.state.sortedOrFilteredData);

      var sortedData = filteredData.sort(function (a, b) {
        var fieldA = a[fieldName],
            fieldB = b[fieldName];

        if (fieldName.indexOf('.') > 0) {
          fieldA = (0, _appHelper.recursiveGetValue)(a, fieldName);
          fieldB = (0, _appHelper.recursiveGetValue)(b, fieldName);
        }

        if (_sortAction === 'ascending') {
          return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
        } else if (_sortAction === 'descending') {
          return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
        }
      });

      this.setState({ sortedOrFilteredData: sortedData });
    }

    /**
     * runFilter, filter array in state, and then setState the filtered array
     * @param  fieldObj1:Object = { fieldName1: string, fieldValue1: String} 
     * @param  fieldObj2:Object = { fieldName2: string, fieldValue2: String} 
     * @return [Object], array of filteredData
     */

  }, {
    key: 'runFilter',
    value: function runFilter(fieldObj1, fieldObj2) {
      var fieldName1 = fieldObj1.fieldName;
      var fieldValue1 = fieldObj1.fieldValue;
      var fieldName2 = fieldObj2.fieldName;
      var fieldValue2 = fieldObj2.fieldValue;

      if (!fieldValue1 && !fieldValue2) return this.state.convertOriginalData;

      var filteredData = this.state.convertOriginalData.filter(function (data) {
        if (fieldValue1 && fieldValue2) {
          return data[fieldName1] === fieldValue1 && data[fieldName2] === fieldValue2;
        } else if (fieldValue1) {
          return data[fieldName1] === fieldValue1;
        } else if (fieldValue2) {
          return data[fieldName2] === fieldValue2;
        }
      });

      return filteredData;
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = "\n.App {\n  text-align: center;\n  width: 1100px;\n  margin: 0 auto;\n}\nbody {\n  background-color: #fafbff;\n}\n";

exports.default = app;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/pages/index_css.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/pages/index_css.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (true) return

      var qs = __webpack_require__(85)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/index_css")
  
/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(37);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _select_css = __webpack_require__(550);

var _select_css2 = _interopRequireDefault(_select_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_React$Component) {
	(0, _inherits3.default)(Select, _React$Component);

	function Select(props) {
		(0, _classCallCheck3.default)(this, Select);

		return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));
	}

	(0, _createClass3.default)(Select, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement('div', null, _react2.default.createElement('style', null, _select_css2.default), _react2.default.createElement('select', { className: 'select', onClick: this.props.onClick, onChange: this.props.onChange, style: this.props.style }, this.props.options.map(function (opt) {
				return _react2.default.createElement('option', { key: opt.label, value: opt.value }, opt.label);
			})));
		}
	}]);

	return Select;
}(_react2.default.Component);

exports.default = Select;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Select/Select.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Select/Select.js"); } } })();

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var select = "\n.select {\n    background: #ffffff;\n    border: 1px solid #dddddd;\n    border-radius: 1px;\n    color: #444444;\n    padding: 6px 10px;\n}";

exports.default = select;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Select/select_css.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Select/select_css.js"); } } })();

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = __webpack_require__(37);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _ThWithSort = __webpack_require__(552);

var _ThWithSort2 = _interopRequireDefault(_ThWithSort);

var _table_css = __webpack_require__(540);

var _table_css2 = _interopRequireDefault(_table_css);

var _appHelper = __webpack_require__(541);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_React$Component) {
	(0, _inherits3.default)(Table, _React$Component);

	function Table(props) {
		(0, _classCallCheck3.default)(this, Table);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, props));

		_this.state = {
			sortingField: undefined,
			sortAction: 'ascending'
		};
		_this.renderHeader = _this.renderHeader.bind(_this);
		_this.renderBody = _this.renderBody.bind(_this);
		_this._onHeaderClick = _this._onHeaderClick.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Table, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    data = _props.data,
			    headerFields = _props.headerFields;

			return _react2.default.createElement('div', null, _react2.default.createElement('style', null, _table_css2.default), _react2.default.createElement('table', { className: 'one-column-emphasis' }, _react2.default.createElement('thead', null, _react2.default.createElement('tr', null, this.renderHeader(data, headerFields))), _react2.default.createElement('tbody', null, this.renderBody(data, headerFields))));
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader(data, headerFields) {
			var _this2 = this;

			return headerFields instanceof Array && headerFields.map(function (headerField) {
				if (headerField.sortAction && headerField.sortAction instanceof Function) {
					return _react2.default.createElement(_ThWithSort2.default, {
						key: headerField.label,
						label: headerField.label,
						fieldName: headerField.dataFieldName,
						sorting: headerField.label === _this2.state.sortingField,
						sortAction: _this2.state.sortAction,
						onClick: function onClick(label, fieldName, sortStatus) {
							return _this2._onHeaderClick(label, fieldName, sortStatus, headerField);
						}
					}, headerField.label);
				} else {
					return _react2.default.createElement('th', { key: headerField.label, style: { width: '10%' } }, headerField.label);
				}
			});
		}
	}, {
		key: 'renderBody',
		value: function renderBody(data, headerFields) {
			return data instanceof Array && data.map(function (d, index) {
				return _react2.default.createElement('tr', { key: 'tr' + index }, headerFields instanceof Array && headerFields.map(function (header) {
					var dataFieldName = header.dataFieldName;

					var value = (0, _appHelper.recursiveGetValue)(d, dataFieldName);
					return _react2.default.createElement('td', { key: 'td' + d.scenarioId + dataFieldName }, value);
				}));
			});
		}
	}, {
		key: '_onHeaderClick',
		value: function _onHeaderClick(label, fieldName, sortStatus, headerField) {
			this.setState({
				sortingField: label,
				sortAction: sortStatus
			},
			// after setState, pass the value to the parent with props.sortAction
			function () {
				return headerField.sortAction(label, fieldName, sortStatus);
			});
		}
	}]);

	return Table;
}(_react2.default.Component);

exports.default = Table;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/Table.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/Table.js"); } } })();

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(93);

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = __webpack_require__(37);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(40);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(39);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _table_css = __webpack_require__(540);

var _table_css2 = _interopRequireDefault(_table_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none'
};

var cursorCss = {
  position: '',
  display: 'inline-block',
  width: '20px',
  height: '20px',
  right: 10,
  marginTop: '-10px',
  background: 'url("/static/sort_sprite.png") no-repeat 0 0'
};

var sortCss = {};
var widthColumn = {};

var ThWithSort = function (_React$Component) {
  (0, _inherits3.default)(ThWithSort, _React$Component);

  function ThWithSort() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ThWithSort);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ThWithSort.__proto__ || (0, _getPrototypeOf2.default)(ThWithSort)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      e.preventDefault();

      if (_this.props.onClick) {
        var sortAction = _this.props.sortAction === 'ascending' ? 'descending' : 'ascending';
        _this.props.onClick(_this.props.label, _this.props.fieldName, sortAction);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ThWithSort, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          sortAsc = _props.sortAsc,
          sorting = _props.sorting;

      if (!this.props.sorting) {
        sortCss = { backgroundPosition: '0 0' };
      } else if (this.props.sortAction === 'ascending' && this.props.sorting) {
        sortCss = { backgroundPosition: '-20px 0' };
      } else if (this.props.sortAction === 'descending' && this.props.sorting) {
        sortCss = { backgroundPosition: '-40px 0' };
      }

      if (this.props.label === 'hasCollision') {
        widthColumn = { width: '15%' };
      } else if (this.props.label === 'doesScenarioPass') {
        widthColumn = { width: '17%' };
      } else {
        widthColumn = { width: '11%' };
      }

      return _react2.default.createElement('th', { style: (0, _assign2.default)(style, widthColumn),
        onClick: this.handleClick.bind(this)
      }, _react2.default.createElement('style', null, _table_css2.default), children, ' ', _react2.default.createElement('div', { style: (0, _assign2.default)(cursorCss, sortCss) }));
    }
  }]);

  return ThWithSort;
}(_react2.default.Component);

exports.default = ThWithSort;

// .one-column-emphasis th.sortable::after{

// }
// .one-column-emphasis th.sortable.sort-asc::after{
//    background-position: -20px 0;
// }
// .one-column-emphasis th.sortable.sort-dsc::after{
//    background-position: -40px 0;
// }

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/ThWithSort.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/components/Table/ThWithSort.js"); } } })();

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchData = undefined;

var _promise = __webpack_require__(38);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(546).polyfill();
__webpack_require__(547);
var backEndUrl = 'http://localhost:3000/data';

var fetchData = exports.fetchData = function fetchData() {
	var status = void 0;
	return new _promise2.default(function (resolve, reject) {
		fetch(backEndUrl).then(function (res) {
			status = res.status;
			return res.json();
		}).then(function (res) {
			res.status = status;
			resolve(res);
		}).catch(function (err) {
			err.status = status;
			reject(err);
		});
	});
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/helper/service.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/vidy.alfredo/Documents/Personal/nutonomy2/src/helper/service.js"); } } })();

/***/ }),

/***/ 555:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(542);


/***/ })

},[556]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RhYmxlL3RhYmxlX2Nzcy5qcz9iZDZmZTY4Iiwid2VicGFjazovLy8uL3NyYy9oZWxwZXIvYXBwSGVscGVyLmpzP2JkNmZlNjgiLCJ3ZWJwYWNrOi8vLy4vcGFnZXM/YmQ2ZmU2OCIsIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleF9jc3MuanM/YmQ2ZmU2OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TZWxlY3QvU2VsZWN0LmpzP2JkNmZlNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2VsZWN0L3NlbGVjdF9jc3MuanM/YmQ2ZmU2OCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UYWJsZS9UYWJsZS5qcz9iZDZmZTY4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1RhYmxlL1RoV2l0aFNvcnQuanM/YmQ2ZmU2OCIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVyL3NlcnZpY2UuanM/YmQ2ZmU2OCIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpP2JkNmZlNjgiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdGFibGUgPSBgXG4ub25lLWNvbHVtbi1lbXBoYXNpc3tcblx0Zm9udC1zaXplOiAxNnB4O1xuXHR3aWR0aDogMTAyNFBYO1xuXHR0ZXh0LWFsaWduOiBsZWZ0O1xuXHRib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuXHRtYXJnaW46IDIwcHg7XG59XG5cbi5vbmUtY29sdW1uLWVtcGhhc2lzIHRoe1xuXHRmb250LXNpemU6IDE1cHg7XG5cdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRjb2xvcjogIzAzOTtcblx0cGFkZGluZzogMTJweCAxNXB4O1xufVxuXG4ub25lLWNvbHVtbi1lbXBoYXNpcyB0aC5zb3J0YWJsZXtcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBwYWRkaW5nLXJpZ2h0OiAycmVtO1xufVxuLm9uZS1jb2x1bW4tZW1waGFzaXMgdGggc3Bhbi5zb3J0YWJsZTo6YWZ0ZXJ7XG5cdCBwb3NpdGlvbjogYWJzb2x1dGU7XG5cdCAgY29udGVudDogJyc7XG5cdCAgd2lkdGg6IDIwcHg7XG5cdCAgaGVpZ2h0OiAyMHB4O1xuXHQgIHRvcDogNTAlO1xuXHQgIHJpZ2h0OiAxMHB4O1xuXHQgIG1hcmdpbi10b3A6IC0xMHB4O1xuXHQgIGJhY2tncm91bmQ6IHVybCgnL3N0YXRpYy9zb3J0X3Nwcml0ZS5wbmcnKSBuby1yZXBlYXQgMCAwO1xuXHQgIG92ZXJmbG93OiBoaWRkZW47XG59XG4ub25lLWNvbHVtbi1lbXBoYXNpcyB0aCBzcGFuLnNvcnRhYmxlLnNvcnQtYXNjOjphZnRlcntcblx0IGJhY2tncm91bmQtcG9zaXRpb246IC0yMHB4IDA7XG59XG4ub25lLWNvbHVtbi1lbXBoYXNpcyB0aCBzcGFuLnNvcnRhYmxlLnNvcnQtZHNjOjphZnRlcntcblx0IGJhY2tncm91bmQtcG9zaXRpb246IC00MHB4IDA7XG59XG5cblxuLm9uZS1jb2x1bW4tZW1waGFzaXMgdGR7XG5cdGNvbG9yOiAjMDAwMDAwO1xuXHRib3JkZXItdG9wOiAxcHggc29saWQgI2U4ZWRmZjtcblx0cGFkZGluZzogMTBweCAxNXB4O1xufVxuXG4ub25lLWNvbHVtbi1lbXBoYXNpcyB0Ym9keSB0cjpmaXJzdC1jaGlsZHtcblx0Ym9yZGVyLXRvcDogNXB4IHNvbGlkICNlOGVkZmY7XG59XG5cbi5vbmUtY29sdW1uLWVtcGhhc2lzIHRib2R5IHRyOm50aC1jaGlsZChldmVuKXtcblx0YmFja2dyb3VuZC1jb2xvcjogI2VmZThmZjtcbn1gXG5cbmV4cG9ydCBkZWZhdWx0IHRhYmxlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1RhYmxlL3RhYmxlX2Nzcy5qcyIsImxldCBjYXJCdWlsZE9wdGlvbnMgPSBbeyB2YWx1ZTogJ25vbmUnLCBsYWJlbDogJ05vbmUnfV07XG5sZXQgc2NlbmFyaW9JZE9wdGlvbnMgPSBbeyB2YWx1ZTogJ25vbmUnLCBsYWJlbDogJ05vbmUnfV07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRTZXJ2ZXJUb1RhYmxlRGF0YShkYXRhKXtcblx0Ly9tYXRjaCB0aGUgc2NlbmFyaW8gYW5kIHNpbXVsYXRpb24sIGFuZCBleHRlbmQgdGhlIGRhdGEgaW4gc2NlbmFyaW8gdG8gc2ltdWxhdGlvblxuICBjb25zdCBjb252ZXJ0ZWREYXRhID0gIGRhdGEuc2ltdWxhdGlvblJ1bnMubWFwKChzaW0pID0+IHtcbiAgXHRjb25zdCBtYXRjaFNjZW5hcmlvICAgID0gZGF0YS5zY2VuYXJpb3MuZmlsdGVyKHNjZW5hcmlvID0+IHNjZW5hcmlvLnNjZW5hcmlvSWQgPT09IHNpbS5zY2VuYXJpb0lkKVswXTtcblxuICAgIGNvbnN0IHJ1bm5pbmdUaW1lICAgICAgPSAoc2ltLmVuZFRpbWUgLSBzaW0uc3RhcnRUaW1lKTtcbiAgICBjb25zdCBtYXhSdW5uaW5nVGltZSAgID0gbWF0Y2hTY2VuYXJpby5tYXhSdW5uaW5nVGltZTtcbiAgICBjb25zdCB0aW1lUmVuZGVyICAgICAgID0gcnVubmluZ1RpbWUgKyAnIC8gJyArIG1heFJ1bm5pbmdUaW1lO1xuICAgIGNvbnN0IGV4Y2VlZFJ1bm5pbmdUaW1lID0gcnVubmluZ1RpbWUgPiBtYXhSdW5uaW5nVGltZTtcblxuICAgIGNvbnN0IG51bWJlck9mU3RvcHMgICAgPSBzaW0ucmVzdWx0Lm51bWJlck9mU3RvcHNcbiAgICBjb25zdCBtYXhOdW1iZXJPZlN0b3BzID0gbWF0Y2hTY2VuYXJpby5tYXhOdW1iZXJPZlN0b3BzXG4gICAgY29uc3Qgc3RvcHNSZW5kZXIgICAgICA9IG51bWJlck9mU3RvcHMgKyAnIC8gJyArIG1heE51bWJlck9mU3RvcHNcbiAgICBjb25zdCBleGNlZWRNYXhTdG9wcyAgID0gbnVtYmVyT2ZTdG9wcyA+IG1heE51bWJlck9mU3RvcHNcblxuICAgIGlmKHNpbS5yZXN1bHQuaGFzQ29sbGlzaW9uID09PSBmYWxzZSAmJiAgIWV4Y2VlZFJ1bm5pbmdUaW1lICYmICFleGNlZWRNYXhTdG9wcyl7XG4gICAgICBzaW0uZG9lc1NjZW5hcmlvUGFzcyA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgc2ltLmRvZXNTY2VuYXJpb1Bhc3MgPSBmYWxzZVxuICAgIH1cblxuXG4gICAgc2ltLnRpbWVSZW5kZXIgPSB0aW1lUmVuZGVyO1xuICAgIHNpbS5zdG9wc1JlbmRlciA9IHN0b3BzUmVuZGVyO1xuICAgIHNpbS5leGNlZWRSdW5uaW5nVGltZSA9IGV4Y2VlZFJ1bm5pbmdUaW1lO1xuICAgIHNpbS5leGNlZWRNYXhTdG9wcyA9IGV4Y2VlZE1heFN0b3BzO1xuICAgIC8vIGFzc2lnbmluZyB0byBjYXJCdWlsZE9wdGlvbnMgJiBzY2VuYXJpb0lkT3B0aW9uc1xuICAgIGNhckJ1aWxkT3B0aW9ucyA9IGFkZFNlbGVjdE9wdGlvblRvQXJyYXkoY2FyQnVpbGRPcHRpb25zLCBzaW0uY2FyQnVpbGQpO1xuICAgIHNjZW5hcmlvSWRPcHRpb25zID0gYWRkU2VsZWN0T3B0aW9uVG9BcnJheShzY2VuYXJpb0lkT3B0aW9ucywgc2ltLnNjZW5hcmlvSWQpXG5cbiAgICByZXR1cm4gc2ltO1xuICB9KTtcblxuICByZXR1cm4ge1xuICBcdGNvbnZlcnRlZERhdGEsIGNhckJ1aWxkT3B0aW9ucywgc2NlbmFyaW9JZE9wdGlvbnNcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlQWxsUGVyY2VudGFnZShkYXRhKXtcblxuXHRsZXQgbnVtT2ZleGNlZWRSdW5uaW5nVGltZSA9IDBcblx0XHQgICwgbnVtT2ZleGNlZWRTdG9wcyA9IDBcblx0ICAgICwgaGFzQ29sbGlzaW9uID0gMFxuXHQgICAgLCBkb2Vzbm90UGFzcyA9IDBcblx0Y29uc3QgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cblx0ZGF0YS5mb3JFYWNoKGQgPT4ge1xuXHRcdGlmKGQuZXhjZWVkUnVubmluZ1RpbWUpIG51bU9mZXhjZWVkUnVubmluZ1RpbWUgKz0gMTtcblx0XHRpZihkLmV4Y2VlZE1heFN0b3BzKSBudW1PZmV4Y2VlZFN0b3BzICs9IDE7XG5cdFx0aWYoZC5yZXN1bHQuaGFzQ29sbGlzaW9uKSBoYXNDb2xsaXNpb24gKz0gMTtcblx0XHRpZihkLmRvZXNTY2VuYXJpb1Bhc3MgPT09IGZhbHNlKSBkb2Vzbm90UGFzcyArPSAxO1xuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdGV4Y2VlZE1heFN0b3BzOiBjYWxjdWxhdGVQZXJjZW50YWdlKG51bU9mZXhjZWVkU3RvcHMsIGxlbmd0aCksXG5cdFx0ZXhjZWVkUnVubmluZ1RpbWU6IGNhbGN1bGF0ZVBlcmNlbnRhZ2UobnVtT2ZleGNlZWRSdW5uaW5nVGltZSwgbGVuZ3RoKSxcblx0XHRoYXZlQ29sbGlzaW9uOiBjYWxjdWxhdGVQZXJjZW50YWdlKGhhc0NvbGxpc2lvbiwgbGVuZ3RoKSxcblx0XHRkb250UGFzczogY2FsY3VsYXRlUGVyY2VudGFnZShkb2Vzbm90UGFzcywgbGVuZ3RoKVxuXHRcdC8vIHBlcmNlbnRhZ2Ugb2YgcnVucyB0aGF0IGV4Y2VlZCB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc3RvcHNcblx0XHQvLyBwZXJjZW50YWdlIG9mIHJ1bnMgdGhhdCBleGNlZWQgdGhlIG1heGltdW0gcnVubmluZyB0aW1lXG5cdFx0Ly8gcGVyY2VudGFnZSBvZiBydW5zIHRoYXQgaGF2ZSBhIGNvbGxpc2lvblxuXHRcdC8vIHBlcmNlbnRhZ2Ugb2YgcnVucyB0aGF0IGRvIG5vdCBwYXNzXG5cdH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlUGVyY2VudGFnZSh2YWx1ZSwgbGVuZ3RoKXtcblx0aWYobGVuZ3RoID09PSAwKSByZXR1cm4gMDtcblx0cmV0dXJuICgodmFsdWUgLyBsZW5ndGgpICogMTAwKS50b0ZpeGVkKDIpO1xufVxuXG5leHBvcnQgY29uc3QgZGVlcENsb25lT2JqZWN0ID0gKG9iaikgPT4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY3Vyc2l2ZUdldFZhbHVlKG9iaiwgZmllbGRTdHJpbmcpe1xuXHRjb25zdCBhcnJheU9mRmllbGQgPSBmaWVsZFN0cmluZy5pbmRleE9mKCcuJykgPiAwID8gZmllbGRTdHJpbmcuc3BsaXQoJy4nKSA6IFtmaWVsZFN0cmluZ107XG5cblx0aWYoYXJyYXlPZkZpZWxkLmxlbmd0aCA9PT0gMSl7XG5cdFx0cmV0dXJuIFN0cmluZyhvYmpbYXJyYXlPZkZpZWxkWzBdXSk7XG5cdH1cblxuXHRjb25zdCBuZXh0T2JqID0gb2JqW2FycmF5T2ZGaWVsZFswXV07XG5cdHJldHVybiByZWN1cnNpdmVHZXRWYWx1ZShuZXh0T2JqLCBhcnJheU9mRmllbGQuc2xpY2UoMSkpXG59XG5cbmZ1bmN0aW9uIGFkZFNlbGVjdE9wdGlvblRvQXJyYXkoYXJyYXksIHZhbHVlKXtcblx0bGV0IG9iaiA9IHsgdmFsdWU6IHZhbHVlLCBsYWJlbDogdmFsdWUgfTtcblx0Y29uc3QgaXNEdXBsaWNhdGUgPSAoIGFycmF5LmZpbHRlcihvYmogPT4gb2JqLnZhbHVlID09PSB2YWx1ZSkgKS5sZW5ndGggPiAwO1xuXHRcblx0Ly9wcmV2ZW50IGR1cGxpY2F0ZSB2YWx1ZVxuXHRpZihpc0R1cGxpY2F0ZSl7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHR9XG5cdHJldHVybiBhcnJheS5jb25jYXQoW29ial0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXIvYXBwSGVscGVyLmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBhcHAgZnJvbSAnLi9pbmRleF9jc3MuanMnO1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL1RhYmxlL1RhYmxlJztcbmltcG9ydCBTZWxlY3QgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvU2VsZWN0L1NlbGVjdCc7XG5cbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJy4uL3NyYy9oZWxwZXIvc2VydmljZS5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0U2VydmVyVG9UYWJsZURhdGEsIGRlZXBDbG9uZU9iamVjdCwgcmVjdXJzaXZlR2V0VmFsdWUsIGNhbGN1bGF0ZUFsbFBlcmNlbnRhZ2UgfSBmcm9tICcuLi9zcmMvaGVscGVyL2FwcEhlbHBlci5qcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjb252ZXJ0T3JpZ2luYWxEYXRhOiBbXSwgXG4gICAgICBzb3J0ZWRPckZpbHRlcmVkRGF0YTogW10sIC8vIHRoaXMgaXMgd2hlbiBkYXRhIGlzIHNvcnRlZCBvciBmaWx0ZXJlZFxuICAgICAgY2FyQnVpbGRPcHRpb25zOiBbXSxcbiAgICAgIHNjZW5hcmlvSWRPcHRpb25zOiBbXSxcbiAgICAgIGZpbHRlcmVkT2JqZWN0X2NhckJ1aWxkOiB7XG4gICAgICAgIGZpZWxkTmFtZTogJ2NhckJ1aWxkJyxcbiAgICAgICAgZmllbGRWYWx1ZTogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAgZmlsdGVyZWRPYmplY3Rfc2NlbmFyaW9JZDoge1xuICAgICAgICBmaWVsZE5hbWU6ICdzY2VuYXJpb0lkJyxcbiAgICAgICAgZmllbGRWYWx1ZTogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAgc3RhdGlzdGljczoge1xuICAgICAgICBleGNlZWRNYXhTdG9wczogMCxcbiAgICAgICAgZXhjZWVkUnVubmluZ1RpbWU6IDAsXG4gICAgICAgIGhhdmVDb2xsaXNpb246IDAsXG4gICAgICAgIGRvbnRQYXNzOiAwXG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc29ydEFjdGlvbiA9IHRoaXMuc29ydEFjdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMucnVuRmlsdGVyID0gdGhpcy5ydW5GaWx0ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlID0gdGhpcy5vbkZpbHRlckNoYW5nZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGZldGNoRGF0YSgpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCB7IGNvbnZlcnRlZERhdGEsIGNhckJ1aWxkT3B0aW9ucywgc2NlbmFyaW9JZE9wdGlvbnMgfSA9IGNvbnZlcnRTZXJ2ZXJUb1RhYmxlRGF0YShyZXMpO1xuICAgICAgICBjb25zdCBzdGF0aXN0aWNzID0gY2FsY3VsYXRlQWxsUGVyY2VudGFnZShjb252ZXJ0ZWREYXRhKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgY29udmVydE9yaWdpbmFsRGF0YTogY29udmVydGVkRGF0YSxcbiAgICAgICAgICBzb3J0ZWRPckZpbHRlcmVkRGF0YTogY29udmVydGVkRGF0YSxcbiAgICAgICAgICBjYXJCdWlsZE9wdGlvbnMsXG4gICAgICAgICAgc2NlbmFyaW9JZE9wdGlvbnMsXG4gICAgICAgICAgc3RhdGlzdGljc1xuICAgICAgICB9KTtcbiAgICAgIH0pIFxuICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKGVycikpXG4gIH1cblxuICBvbkZpbHRlckNoYW5nZShlLCBmaWVsZE5hbWUpe1xuICAgIGNvbnN0IHZhbHVlICAgICA9IChlLnRhcmdldC52YWx1ZSA9PT0gJ25vbmUnKSA/IHVuZGVmaW5lZCA6IGUudGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGN1cnJlbnRTdGF0ZU5hbWUgPSAoZmllbGROYW1lID09PSAnY2FyQnVpbGQnKSAgPyAnZmlsdGVyZWRPYmplY3RfY2FyQnVpbGQnIDogJ2ZpbHRlcmVkT2JqZWN0X3NjZW5hcmlvSWQnO1xuICAgIGNvbnN0IHN0YXRlTmFtZTIgPSAoZmllbGROYW1lICE9PSAnY2FyQnVpbGQnKSAgPyAnZmlsdGVyZWRPYmplY3RfY2FyQnVpbGQnIDogJ2ZpbHRlcmVkT2JqZWN0X3NjZW5hcmlvSWQnO1xuXG4gICAgY29uc3QgY3VycmVudE9iamVjdCA9IHtcbiAgICAgIGZpZWxkTmFtZTogdGhpcy5zdGF0ZVtjdXJyZW50U3RhdGVOYW1lXS5maWVsZE5hbWUsXG4gICAgICBmaWVsZFZhbHVlOiB2YWx1ZVxuICAgIH1cbiAgICBjb25zdCBvYmoyID0ge1xuICAgICAgZmllbGROYW1lOiB0aGlzLnN0YXRlW3N0YXRlTmFtZTJdLmZpZWxkTmFtZSxcbiAgICAgIGZpZWxkVmFsdWU6IHRoaXMuc3RhdGVbc3RhdGVOYW1lMl0uZmllbGRWYWx1ZVxuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHRoaXMucnVuRmlsdGVyKGN1cnJlbnRPYmplY3QsIG9iajIpO1xuICAgIGNvbnN0IHN0YXRpc3RpY3MgPSBjYWxjdWxhdGVBbGxQZXJjZW50YWdlKGZpbHRlcmVkRGF0YSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IFtjdXJyZW50U3RhdGVOYW1lXTogY3VycmVudE9iamVjdCwgc29ydGVkT3JGaWx0ZXJlZERhdGE6IGZpbHRlcmVkRGF0YSwgc3RhdGlzdGljcyB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8c3R5bGU+e2FwcH08L3N0eWxlPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2Vlbid9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBtYXJnaW46ICcxMHB4IDMwcHgnLCAgdGV4dEFsaWduOidsZWZ0J319PiBcbiAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250V2VpZ2h0OiAnYm9sZCd9fT5GaWx0ZXJlZCBieTo8L3A+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tkaXNwbGF5OidibG9jayd9fT5DYXIgQnVpbGQ6PC9wPlxuICAgICAgICAgICAgICAgIDxTZWxlY3QgXG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLnN0YXRlLmNhckJ1aWxkT3B0aW9uc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5vbkZpbHRlckNoYW5nZShlLCAnY2FyQnVpbGQnKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2Rpc3BsYXk6J2Jsb2NrJ319PlNjZW5hcmlvSWQ6PC9wPlxuICAgICAgICAgICAgICAgIDxTZWxlY3QgXG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXt0aGlzLnN0YXRlLnNjZW5hcmlvSWRPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLm9uRmlsdGVyQ2hhbmdlKGUsICdzY2VuYXJpb0lkJyl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgbWFyZ2luOiAnMTBweCAzMHB4Jywgd2lkdGg6IDM2MCwgdGV4dEFsaWduOiAnbGVmdCd9fT4gXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHA+IGV4Y2VlZCB0aGUgbWF4aW11bSBudW1iZXIgb2Ygc3RvcHM6IDxzdHJvbmc+e3RoaXMuc3RhdGUuc3RhdGlzdGljcy5leGNlZWRNYXhTdG9wc30gJTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD4gZXhjZWVkIHRoZSBtYXhpbXVtIHJ1bm5pbmcgdGltZTogPHN0cm9uZz57dGhpcy5zdGF0ZS5zdGF0aXN0aWNzLmV4Y2VlZFJ1bm5pbmdUaW1lfSAlPC9zdHJvbmc+PC9wPlxuICAgICAgICAgICAgICAgIDxwPiBoYXZlIGEgY29sbGlzaW9uOiA8c3Ryb25nPnt0aGlzLnN0YXRlLnN0YXRpc3RpY3MuaGF2ZUNvbGxpc2lvbn0gJTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgICA8cD4gZG8gbm90IHBhc3M6IDxzdHJvbmc+e3RoaXMuc3RhdGUuc3RhdGlzdGljcy5kb250UGFzc30gJTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxUYWJsZSBcbiAgICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5zb3J0ZWRPckZpbHRlcmVkRGF0YX1cbiAgICAgICAgICAgICAgaGVhZGVyRmllbGRzPXtbXG4gICAgICAgICAgICAgICAgLy8gcmVhcnJhbmdlIHRoZSBhcnJheSBiZWxvdyB0byByZWFycmFuZ2UgdGhlIGNvbHVtbiBpbiByZW5kZXJlZCB0YWJsZVxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdzY2VuYXJpb0lkJywgICAgICAgICAgICAgICAgICAgICAgIGRhdGFGaWVsZE5hbWU6ICdzY2VuYXJpb0lkJyAgICAgICAgICwgc29ydEFjdGlvbjogdGhpcy5zb3J0QWN0aW9uIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ2NhckJ1aWxkJywgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUZpZWxkTmFtZTogJ2NhckJ1aWxkJyAgICAgICAgICAgLCBzb3J0QWN0aW9uOiB0aGlzLnNvcnRBY3Rpb24gfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnc3RhcnRUaW1lJywgICAgICAgICAgICAgICAgICAgICAgICBkYXRhRmllbGROYW1lOiAnc3RhcnRUaW1lJyAgICAgICAgICAsIHNvcnRBY3Rpb246IHRoaXMuc29ydEFjdGlvbiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdydW5uaW5nVGltZSAvIG1heFJ1bm5pbmdUaW1lJywgICAgIGRhdGFGaWVsZE5hbWU6ICd0aW1lUmVuZGVyJyAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJ251bWJlck9mU3RvcHMgLyBtYXhOdW1iZXJPZlN0b3BzJywgZGF0YUZpZWxkTmFtZTogJ3N0b3BzUmVuZGVyJyAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IGxhYmVsOiAnaGFzQ29sbGlzaW9uJywgICAgICAgICAgICAgICAgICAgICBkYXRhRmllbGROYW1lOiAncmVzdWx0Lmhhc0NvbGxpc2lvbicsIHNvcnRBY3Rpb246IHRoaXMuc29ydEFjdGlvbiB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICdkb2VzU2NlbmFyaW9QYXNzJywgICAgICAgICAgICAgICAgIGRhdGFGaWVsZE5hbWU6ICdkb2VzU2NlbmFyaW9QYXNzJyAgICwgc29ydEFjdGlvbjogdGhpcy5zb3J0QWN0aW9uIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogc29ydEFjdGlvbiwgc29ydCBhcnJheSBpbiBzdGF0ZSwgYW5kIHRoZW4gc2V0U3RhdGUgdGhlIHNvcnRlZCBhcnJheVxuICAgKiBAcGFyYW0gIGxhYmVsOlN0cmluZyAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICogQHBhcmFtICBmaWVsZE5hbWU6U3RyaW5nICBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAgc29ydEFjdGlvbjpTdHJpbmcgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHVuZGVmaW5lZFxuICAgKi9cbiAgc29ydEFjdGlvbihsYWJlbCwgZmllbGROYW1lLCBzb3J0QWN0aW9uKXtcbiAgICAvLyBzaW5jZSBzb3J0aW5nIGFycmF5IGluIGphdmFzY3JpcHQgd2lsbCBtdXRhdGUgdGhlIG9yaWdpbmFsIGFycmF5LCBJIHdpbGwgY2xvbmUgdGhlIGZpbHRlcmVkQXJyYXlcbiAgICAvLyBjbG9uaW5nLCBzaW1wbGUgaW1wbGVtZW50YXRpb24gb2YgaW1tdXRhYmlsaXR5XG4gICAgY29uc3QgZmlsdGVyZWREYXRhID0gZGVlcENsb25lT2JqZWN0KHRoaXMuc3RhdGUuc29ydGVkT3JGaWx0ZXJlZERhdGEpO1xuXG4gICAgY29uc3Qgc29ydGVkRGF0YSA9IGZpbHRlcmVkRGF0YS5zb3J0KChhLGIpID0+IHtcbiAgICAgIGxldCBmaWVsZEEgPSBhW2ZpZWxkTmFtZV0sIGZpZWxkQiA9IGJbZmllbGROYW1lXTtcbiAgICAgICAgICBcbiAgICAgIGlmKGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPiAwKXtcbiAgICAgICAgZmllbGRBID0gcmVjdXJzaXZlR2V0VmFsdWUoYSwgZmllbGROYW1lKVxuICAgICAgICBmaWVsZEIgPSByZWN1cnNpdmVHZXRWYWx1ZShiLCBmaWVsZE5hbWUpXG4gICAgICB9XG5cbiAgICAgIGlmKHNvcnRBY3Rpb24gPT09ICdhc2NlbmRpbmcnKXtcbiAgICAgICAgcmV0dXJuIChmaWVsZEEgPiBmaWVsZEIpID8gLTEgOiAoIChmaWVsZEEgPCBmaWVsZEIpID8gMSA6IDApO1xuICAgICAgfSBcbiAgICAgIGVsc2UgaWYgKHNvcnRBY3Rpb24gPT09ICdkZXNjZW5kaW5nJyl7XG4gICAgICAgIHJldHVybiAoZmllbGRBIDwgZmllbGRCKSA/IC0xIDogKCAoZmllbGRBID4gZmllbGRCKSA/IDEgOiAwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBzb3J0ZWRPckZpbHRlcmVkRGF0YTogc29ydGVkRGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBydW5GaWx0ZXIsIGZpbHRlciBhcnJheSBpbiBzdGF0ZSwgYW5kIHRoZW4gc2V0U3RhdGUgdGhlIGZpbHRlcmVkIGFycmF5XG4gICAqIEBwYXJhbSAgZmllbGRPYmoxOk9iamVjdCA9IHsgZmllbGROYW1lMTogc3RyaW5nLCBmaWVsZFZhbHVlMTogU3RyaW5nfSBcbiAgICogQHBhcmFtICBmaWVsZE9iajI6T2JqZWN0ID0geyBmaWVsZE5hbWUyOiBzdHJpbmcsIGZpZWxkVmFsdWUyOiBTdHJpbmd9IFxuICAgKiBAcmV0dXJuIFtPYmplY3RdLCBhcnJheSBvZiBmaWx0ZXJlZERhdGFcbiAgICovXG4gIHJ1bkZpbHRlcihmaWVsZE9iajEsIGZpZWxkT2JqMil7XG4gICAgbGV0IGZpZWxkTmFtZTEgID0gZmllbGRPYmoxLmZpZWxkTmFtZTtcbiAgICBsZXQgZmllbGRWYWx1ZTEgPSBmaWVsZE9iajEuZmllbGRWYWx1ZTsgICBcbiAgICBsZXQgZmllbGROYW1lMiAgPSBmaWVsZE9iajIuZmllbGROYW1lO1xuICAgIGxldCBmaWVsZFZhbHVlMiA9IGZpZWxkT2JqMi5maWVsZFZhbHVlO1xuXG4gICAgaWYoIWZpZWxkVmFsdWUxICYmICFmaWVsZFZhbHVlMikgcmV0dXJuIHRoaXMuc3RhdGUuY29udmVydE9yaWdpbmFsRGF0YTtcblxuICAgIGNvbnN0IGZpbHRlcmVkRGF0YSA9IHRoaXMuc3RhdGUuY29udmVydE9yaWdpbmFsRGF0YS5maWx0ZXIoZGF0YSA9PiB7XG4gICAgICBpZihmaWVsZFZhbHVlMSAmJiBmaWVsZFZhbHVlMil7XG4gICAgICAgIHJldHVybiBkYXRhW2ZpZWxkTmFtZTFdID09PSBmaWVsZFZhbHVlMSAmJiBkYXRhW2ZpZWxkTmFtZTJdID09PSBmaWVsZFZhbHVlMlxuICAgICAgfSBlbHNlIGlmKGZpZWxkVmFsdWUxKXtcbiAgICAgICAgcmV0dXJuIGRhdGFbZmllbGROYW1lMV0gPT09IGZpZWxkVmFsdWUxXG4gICAgICB9IGVsc2UgaWYoZmllbGRWYWx1ZTIpe1xuICAgICAgICByZXR1cm4gZGF0YVtmaWVsZE5hbWUyXSA9PT0gZmllbGRWYWx1ZTJcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmaWx0ZXJlZERhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsImNvbnN0IGFwcCA9IGBcbi5BcHAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMTAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZiZmY7XG59XG5gO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcy9pbmRleF9jc3MuanMiLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICcuL3NlbGVjdF9jc3MuanMnO1xuXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLCAvLyB7IGxhYmVsOlN0cmluZywgdmFsdWU6IFN0cmluZ31cbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbiAgfVxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHRcblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PHN0eWxlPntzZWxlY3R9PC9zdHlsZT5cblx0XHRcdFx0PHNlbGVjdCBjbGFzc05hbWU9J3NlbGVjdCcgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfSBvbkNoYW5nZT17dGhpcy5wcm9wcy5vbkNoYW5nZX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMub3B0aW9ucy5tYXAob3B0ID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxvcHRpb24ga2V5PXtvcHQubGFiZWx9IHZhbHVlPXtvcHQudmFsdWV9PntvcHQubGFiZWx9PC9vcHRpb24+XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9TZWxlY3QvU2VsZWN0LmpzIiwiY29uc3Qgc2VsZWN0ID0gYFxuLnNlbGVjdCB7XG4gICAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkZGRkO1xuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICBjb2xvcjogIzQ0NDQ0NDtcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcbn1gO1xuXG5leHBvcnQgZGVmYXVsdCBzZWxlY3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvU2VsZWN0L3NlbGVjdF9jc3MuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRoV2l0aFNvcnQgZnJvbSAnLi9UaFdpdGhTb3J0JztcbmltcG9ydCB0YWJsZSBmcm9tICcuL3RhYmxlX2Nzcy5qcydcbmltcG9ydCB7IHJlY3Vyc2l2ZUdldFZhbHVlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2FwcEhlbHBlci5qcyc7XG5cbmNsYXNzIFRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHNvcnRpbmdGaWVsZDogdW5kZWZpbmVkLFxuXHQgICAgc29ydEFjdGlvbjogJ2FzY2VuZGluZydcblx0XHR9O1xuXHRcdHRoaXMucmVuZGVySGVhZGVyID0gdGhpcy5yZW5kZXJIZWFkZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnJlbmRlckJvZHkgPSB0aGlzLnJlbmRlckJvZHkuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9vbkhlYWRlckNsaWNrID0gdGhpcy5fb25IZWFkZXJDbGljay5iaW5kKHRoaXMpO1xuXHR9XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHsgZGF0YSwgaGVhZGVyRmllbGRzIH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0cmV0dXJuKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PHN0eWxlPnt0YWJsZX08L3N0eWxlPlxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPSdvbmUtY29sdW1uLWVtcGhhc2lzJz5cblx0XHRcdFx0XHQ8dGhlYWQ+XG5cdFx0XHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0XHRcdHsgdGhpcy5yZW5kZXJIZWFkZXIoZGF0YSwgaGVhZGVyRmllbGRzKSB9XG5cdFx0XHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRcdDwvdGhlYWQ+XG5cdFx0XHRcdFx0PHRib2R5PlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbmRlckJvZHkoZGF0YSwgaGVhZGVyRmllbGRzKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvdGJvZHk+XG5cdFx0XHRcdDwvdGFibGU+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVySGVhZGVyKGRhdGEsIGhlYWRlckZpZWxkcyl7XG5cdFx0cmV0dXJuIGhlYWRlckZpZWxkcyBpbnN0YW5jZW9mIEFycmF5ICYmIGhlYWRlckZpZWxkcy5tYXAoaGVhZGVyRmllbGQgPT4ge1xuXHRcdFx0aWYoaGVhZGVyRmllbGQuc29ydEFjdGlvbiAmJiBoZWFkZXJGaWVsZC5zb3J0QWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pe1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxUaFdpdGhTb3J0XG5cdFx0XHRcdFx0XHRrZXk9e2hlYWRlckZpZWxkLmxhYmVsfVxuXHRcdFx0XHRcdFx0bGFiZWw9e2hlYWRlckZpZWxkLmxhYmVsfVxuXHRcdFx0XHRcdFx0ZmllbGROYW1lPXtoZWFkZXJGaWVsZC5kYXRhRmllbGROYW1lfVxuXHRcdFx0XHRcdFx0c29ydGluZz17aGVhZGVyRmllbGQubGFiZWwgPT09IHRoaXMuc3RhdGUuc29ydGluZ0ZpZWxkfVxuXHRcdFx0XHRcdFx0c29ydEFjdGlvbj17dGhpcy5zdGF0ZS5zb3J0QWN0aW9ufVxuXHRcdFx0XHRcdFx0b25DbGljaz17KGxhYmVsLCBmaWVsZE5hbWUsIHNvcnRTdGF0dXMpID0+IHRoaXMuX29uSGVhZGVyQ2xpY2sobGFiZWwsIGZpZWxkTmFtZSwgc29ydFN0YXR1cyxoZWFkZXJGaWVsZCl9XG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHR7aGVhZGVyRmllbGQubGFiZWx9XHRcdFx0XHRcblx0XHRcdFx0XHQ8L1RoV2l0aFNvcnQ+XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gPHRoIGtleT17aGVhZGVyRmllbGQubGFiZWx9IHN0eWxlPXt7d2lkdGg6ICcxMCUnfX0+e2hlYWRlckZpZWxkLmxhYmVsfTwvdGg+XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHJlbmRlckJvZHkoZGF0YSwgaGVhZGVyRmllbGRzKXtcblx0XHRyZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEFycmF5ICYmIGRhdGEubWFwKChkLGluZGV4KSA9PiB7XG5cdFx0XHRyZXR1cm4oXG5cdFx0XHRcdDx0ciBrZXk9eyd0cicraW5kZXh9PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGhlYWRlckZpZWxkcyBpbnN0YW5jZW9mIEFycmF5ICYmIGhlYWRlckZpZWxkcy5tYXAoaGVhZGVyID0+IHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgeyBkYXRhRmllbGROYW1lIH0gPSBoZWFkZXI7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHZhbHVlID0gcmVjdXJzaXZlR2V0VmFsdWUoZCwgZGF0YUZpZWxkTmFtZSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8dGQga2V5PXsndGQnK2Quc2NlbmFyaW9JZCtkYXRhRmllbGROYW1lfT57dmFsdWV9PC90ZD5cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvdHI+XG5cdFx0XHQpXG5cblx0XHR9KVxuXHR9IFxuXG5cdF9vbkhlYWRlckNsaWNrKGxhYmVsLCBmaWVsZE5hbWUsIHNvcnRTdGF0dXMsIGhlYWRlckZpZWxkKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRzb3J0aW5nRmllbGQ6IGxhYmVsLFxuXHRcdFx0c29ydEFjdGlvbjogc29ydFN0YXR1c1xuXHRcdH0sIFxuXHRcdFx0Ly8gYWZ0ZXIgc2V0U3RhdGUsIHBhc3MgdGhlIHZhbHVlIHRvIHRoZSBwYXJlbnQgd2l0aCBwcm9wcy5zb3J0QWN0aW9uXG5cdFx0XHQoKSA9PiBoZWFkZXJGaWVsZC5zb3J0QWN0aW9uKGxhYmVsLCBmaWVsZE5hbWUsIHNvcnRTdGF0dXMpXG5cdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlO1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1RhYmxlL1RhYmxlLmpzIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0YWJsZV9jc3MgZnJvbSAnLi90YWJsZV9jc3MuanMnO1xuXG5jb25zdCBzdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgdXNlclNlbGVjdDogJ25vbmUnLFxufVxuXG5jb25zdCBjdXJzb3JDc3MgPSB7XG4gIHBvc2l0aW9uOiAnJyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHdpZHRoOiAnMjBweCcsXG4gIGhlaWdodDogJzIwcHgnLFxuICByaWdodDogMTAsXG4gIG1hcmdpblRvcDogJy0xMHB4JyxcbiAgYmFja2dyb3VuZDogJ3VybChcIi9zdGF0aWMvc29ydF9zcHJpdGUucG5nXCIpIG5vLXJlcGVhdCAwIDAnLFxufVxuXG5sZXQgc29ydENzcyA9IHt9O1xubGV0IHdpZHRoQ29sdW1uID0ge307XG5cbmNsYXNzIFRoV2l0aFNvcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgICBpbmRleEVsZW1lbnQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcbiAgfVxuXG4gIGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICBjb25zdCBzb3J0QWN0aW9uID0gdGhpcy5wcm9wcy5zb3J0QWN0aW9uID09PSAnYXNjZW5kaW5nJyA/ICdkZXNjZW5kaW5nJyA6ICdhc2NlbmRpbmcnO1xuICAgIFx0dGhpcy5wcm9wcy5vbkNsaWNrKHRoaXMucHJvcHMubGFiZWwsIHRoaXMucHJvcHMuZmllbGROYW1lLCBzb3J0QWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgc29ydEFzYywgc29ydGluZyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZighdGhpcy5wcm9wcy5zb3J0aW5nKXtcbiAgICAgIHNvcnRDc3MgPSB7IGJhY2tncm91bmRQb3NpdGlvbjogJzAgMCcgfTtcbiAgICB9XG4gICAgZWxzZSBpZih0aGlzLnByb3BzLnNvcnRBY3Rpb24gPT09ICdhc2NlbmRpbmcnICYmIHRoaXMucHJvcHMuc29ydGluZykgIHtcbiAgICAgIHNvcnRDc3MgPSB7IGJhY2tncm91bmRQb3NpdGlvbjogJy0yMHB4IDAnIH07XG4gICAgfSBcbiAgICBlbHNlIGlmKHRoaXMucHJvcHMuc29ydEFjdGlvbiA9PT0gJ2Rlc2NlbmRpbmcnICYmIHRoaXMucHJvcHMuc29ydGluZyl7XG4gICAgICBzb3J0Q3NzID0geyBiYWNrZ3JvdW5kUG9zaXRpb246ICctNDBweCAwJyB9O1xuICAgIH1cblxuICAgIGlmKHRoaXMucHJvcHMubGFiZWwgPT09ICdoYXNDb2xsaXNpb24nKXtcbiAgICAgIHdpZHRoQ29sdW1uID0geyB3aWR0aDogJzE1JSd9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5sYWJlbCA9PT0gJ2RvZXNTY2VuYXJpb1Bhc3MnKXtcbiAgICAgIHdpZHRoQ29sdW1uID0geyB3aWR0aDogJzE3JSd9O1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aENvbHVtbiA9IHsgd2lkdGg6ICcxMSUnfTtcbiAgICB9XG4gICAgICAgICAgXG4gICAgcmV0dXJuIChcbiAgICAgIDx0aCBzdHlsZT17T2JqZWN0LmFzc2lnbihzdHlsZSwgd2lkdGhDb2x1bW4pfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyl9XG4gICAgICA+XG4gICAgICAgIDxzdHlsZT57dGFibGVfY3NzfTwvc3R5bGU+XG4gICAgICAgIHtjaGlsZHJlbn0gPGRpdiBzdHlsZT17T2JqZWN0LmFzc2lnbihjdXJzb3JDc3MsIHNvcnRDc3MpfT48L2Rpdj5cbiAgICAgIDwvdGg+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaFdpdGhTb3J0O1xuXG5cbi8vIC5vbmUtY29sdW1uLWVtcGhhc2lzIHRoLnNvcnRhYmxlOjphZnRlcntcbiAgIFxuLy8gfVxuLy8gLm9uZS1jb2x1bW4tZW1waGFzaXMgdGguc29ydGFibGUuc29ydC1hc2M6OmFmdGVye1xuLy8gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTIwcHggMDtcbi8vIH1cbi8vIC5vbmUtY29sdW1uLWVtcGhhc2lzIHRoLnNvcnRhYmxlLnNvcnQtZHNjOjphZnRlcntcbi8vICAgIGJhY2tncm91bmQtcG9zaXRpb246IC00MHB4IDA7XG4vLyB9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvVGFibGUvVGhXaXRoU29ydC5qcyIsInJlcXVpcmUoJ2VzNi1wcm9taXNlJykucG9seWZpbGwoKTtcbnJlcXVpcmUoJ2lzb21vcnBoaWMtZmV0Y2gnKTtcbmNvbnN0IGJhY2tFbmRVcmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2RhdGEnXG5cbmV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSAoKSA9PiB7XG5cdGxldCBzdGF0dXM7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0ZmV0Y2goYmFja0VuZFVybClcblx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0c3RhdHVzID0gcmVzLnN0YXR1cztcblx0XHRcdHJldHVybiByZXMuanNvbigpXG5cdFx0fSlcblx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0cmVzLnN0YXR1cyA9IHN0YXR1cztcblx0XHRcdHJlc29sdmUocmVzKVxuXHRcdH0pXG5cdFx0LmNhdGNoKGVyciA9PiB7XG5cdFx0XHRlcnIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0cmVqZWN0KGVycilcblx0XHR9KVxuXHR9KVxuXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxwZXIvc2VydmljZS5qcyIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIHZlcnR4IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gNTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gNSJdLCJtYXBwaW5ncyI6IjtBOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUF1REE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDckRBO0FBc0NBO0FBa0NBO0FBQ0E7Ozs7Ozs7QUE3RUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7O0FBREE7QUFDQTtBQUlBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQVRBOzs7QUFXQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUVBO0FBSEE7O0FBS0E7QUFFQTtBQUhBOztBQUtBO0FBQ0E7QUFDQTtBQUlBO0FBUEE7QUFiQTtBQUNBO0FBbUJBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBTkE7QUFMQTtBQVlBO0FBQ0E7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUhBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBU0E7QUFDQTtBQUFBO0FBR0E7QUFKQTtBQU9BO0FBQ0E7QUFBQTtBQUlBO0FBTEE7QUFpQkE7QUFFQTtBQUNBO0FBQUE7QUFIQTtBQWtCQTtBQUNBOzs7Ozs7Ozs7OztBQU1BO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTs7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBREE7QUFHQTtBQUVBO0FBRUE7QUFDQTtBQUFBOzs7OztBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pMQTtBQUNBO0FBV0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBTUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUVBOzs7OztBQUlBO0FBQ0E7QUFBQTtBQUtBO0FBTUE7Ozs7O0FBekJBO0FBQ0E7QUEyQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQVFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFFQTtBQUhBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUVBOzs7O0FBa0JBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFQQTtBQUhBO0FBY0E7QUFFQTtBQUNBOzs7O0FBRUE7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUFBO0FBRUE7QUFPQTtBQUNBOzs7O0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFIQTtBQUlBO0FBQUE7QUFBQTtBQUVBOzs7OztBQWpGQTtBQUNBO0FBbUZBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFGQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRkE7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBU0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBREE7QUFJQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFHQTtBQURBO0FBR0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQURBOzs7OztBQXZDQTtBQUNBO0FBZ0RBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUhBO0FBTUE7QUFFQTtBQVJBO0FBVUE7QUFFQTtBQUNBO0FBRUE7QUFsQkE7QUFDQTs7Ozs7Ozs7QUNMQTs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        