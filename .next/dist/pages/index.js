'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index_css = require('./index_css.js');

var _index_css2 = _interopRequireDefault(_index_css);

var _Table = require('../src/components/Table/Table');

var _Table2 = _interopRequireDefault(_Table);

var _Select = require('../src/components/Select/Select');

var _Select2 = _interopRequireDefault(_Select);

var _service = require('../src/helper/service.js');

var _appHelper = require('../src/helper/appHelper.js');

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