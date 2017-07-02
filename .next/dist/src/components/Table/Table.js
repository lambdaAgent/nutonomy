'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _ThWithSort = require('./ThWithSort');

var _ThWithSort2 = _interopRequireDefault(_ThWithSort);

var _table_css = require('./table_css.js');

var _table_css2 = _interopRequireDefault(_table_css);

var _appHelper = require('../../helper/appHelper.js');

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