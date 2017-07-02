'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _table_css = require('./table_css.js');

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