'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchData = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();
require('isomorphic-fetch');
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