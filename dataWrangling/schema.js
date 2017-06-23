const { simulationHelpers, numberHelpers } = require('./helpers');

/* *
Every scenario has an id and a maximum number of "stops" (times when the car unexpectedly braked).

Every simulation run has a start time, end time, car build and a corresponding scenario. A run is considered successful if
	It does not exceed the maximum number of stops for the scenario
	It does not exceed the maximum running time for the scenario. (Calculated by <end_time> - <start_time>)
	It does not have a collision

const schema = 
{
 	"simulationRuns": [{
		 "startTime": number (UTC timestamp),
		 "endTime": number (UTC timestamp),
		 "scenarioId": string,
		 "carBuild": string,
		 "result": {
							 "numberOfStops": number,
							 "hasCollision": boolean,
							 }
	 }],
	 "scenarios": [{
		 "scenarioId": string,
		 "maxNumberOfStops": number,
		 "maxRunningTime": number,
	 }]
};
*/

function createLogs(){
	const numOfScenario = numberHelpers.randomPossibilities(10) + 1 // 1 - 10
	const numOfSimulations = (numberHelpers.randomPossibilities(2) + 3) * 10 // 10 - 50
	const scenario__array = simulationHelpers.createScenarios(numOfScenario); 
	const logs = {
		simulationRuns: simulationHelpers.createSimulationRuns(scenario__array, numOfSimulations),
		scenarios: scenario__array
	};
	return logs;
}

module.exports = createLogs;

//helper
