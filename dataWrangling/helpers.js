//import
const { monthLabels, dayLabels, monthWith31, monthWith30 } = require('./date');
const carDatabase = require('./carBuilds');


//exports 
const dateHelpers = {  pickDays }
const numberHelpers = { randomPossibilities }
const carBuildHelpers = { pickCarBuild }
const simulationHelpers = { createSimulationRuns, createScenarioId, createStartTime, createEndTime, createScenarios }

module.exports = {
	dateHelpers, numberHelpers, simulationHelpers
}


/** 
 * createSimulationRuns, desc: to create SimulationRuns Objects
 * @param1 scenarios:Array
 * @return [ Object ], desc: return array of simulationRun
 */
function createSimulationRuns(scenarios, numOfSimulations){
	function createOneSimrun(scenario){
		const isResultSuccess = randomPossibilities(2);
		const startTime = createStartTime();
		const endTime = createEndTime(startTime, isResultSuccess, scenario.maxRunningTime);
		const scenarioId = scenario.scenarioId;
		const carBuild = pickCarBuild();
		const result = createResult(isResultSuccess, scenario.maxNumberOfStops)

	  const simRun = { startTime, endTime, scenarioId, carBuild,	result };
    return simRun;
  }
  let simulations = [];
  for(let i=0; i<numOfSimulations; i++){
  	const pickRandomScenario = randomPossibilities(scenarios.length); 
  	const scenario = scenarios[pickRandomScenario];

  	const sim = createOneSimrun(scenario);
  	simulations.push(sim);
  }
  return simulations;
}


/** 
 * createResult, desc: create resultObject based on result, I randomize the result to increase the number of success
 * @param1 success:Number[0,1]
 * @param2 maxNumberOfStops: Number
 * @return resultObj:Object
 */
function createResult(success, maxNumberOfStops){
	let resultObj;
	if(success > 0 ){
		resultObj = {
			numberOfStops: randomPossibilities(maxNumberOfStops),
		  hasCollision: false
		};
	} else {
		resultObj = {
			numberOfStops: randomPossibilities(maxNumberOfStops),
			hasCollision: true
		}
	}

  return resultObj;
}


function createScenarios(numOfScenario){
	function createOneScenario(){
		const threeMonths = 3 * 30 * 24;
		const pickHours = randomPossibilities(threeMonths) // from 1 hour to 3months
		const scenario = {
			scenarioId: simulationHelpers.createScenarioId(),
			maxNumberOfStops: numberHelpers.randomPossibilities(100) + 3,
			maxRunningTime: pickHours * 60 * 60
		}
		return scenario
	}

	let scenarios = []
	for(let i=0; i< numOfScenario; i++){
		scenarios.push(createOneScenario())
	}
	return scenarios
}

function pickCarBuild(){
	const carIndex = randomPossibilities(carDatabase.length);
	const carCompanySelected = carDatabase[carIndex];
	const carModel = carCompanySelected.models[randomPossibilities(carCompanySelected.models.length)].value;

	return carCompanySelected.value + ' ' + carModel;
}


function createScenarioId(){
	function guid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return guid() + guid() + '-' + guid() + '-' + guid() + '-' +guid() + '-' + guid() + guid() + guid();
}

function createStartTime(){
	const monthIndex = randomPossibilities(12) 
	const monthName =  monthLabels[monthIndex]

	//randomize between 2016 or 2017
	const year = '201' + String(randomPossibilities(2) + 6)
	const days = pickDays(monthName, year)

	const hour = randomPossibilities(24) // 0-23
	const min = randomPossibilities(60)
	const sec = randomPossibilities(60)

	const startTime = new Date(`${days}/${monthName}/${year} ${hour}:${min}:${sec}`);
	return startTime.getTime();
}

/**
 * createEndTime, desc: createEndTime, based on the params result
 * @param1  startTime:Number
 * @param2  result: Number[0,1]
 * @param3  maxRunningTime: Number
 * @return  endTimeInUnix:Number
 */
function createEndTime(startTime, result, maxRunningTime){
	//pick a number after startTime, from 1 day to 90 days
	let endTimeInUnix, limitEndTime;

	// if result is success
	if(result > 0) {
		runningTime = Math.abs(maxRunningTime - 1000);
		endTimeInUnix = startTime + runningTime;
	} else {
		runningTime = Math.abs(maxRunningTime + 1000);
		endTimeInUnix = startTime + Math.floor(Math.random() * runningTime);
	}
	return endTimeInUnix
}

function randomPossibilities(num){
	return Math.floor(Math.random() * num) ;
}

function pickDays(monthName, year){
	// if leapyear, then feb can be 29, 
	if(year % 4 === 0 && monthName === 'Feb') return randomPossibilities(28) + 1;
	else if ( year % 4 === 0 && monthName === 'Feb') return randomPossibilities(27) + 1;
	else if (monthWith30.includes(monthName)) return randomPossibilities(29)+ 1;
	else return randomPossibilities(30) + 1
}


