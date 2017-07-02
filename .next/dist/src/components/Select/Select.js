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

var _select_css = require('./select_css.js');

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