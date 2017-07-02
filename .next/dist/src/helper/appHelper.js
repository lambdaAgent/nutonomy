'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepCloneObject = undefined;
exports.convertServerToTableData = convertServerToTableData;
exports.calculateAllPercentage = calculateAllPercentage;
exports.recursiveGetValue = recursiveGetValue;

var _stringify = require('babel-runtime/core-js/json/stringify');

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