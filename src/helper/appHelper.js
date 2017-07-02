let carBuildOptions = [{ value: 'none', label: 'None'}];
let scenarioIdOptions = [{ value: 'none', label: 'None'}];


export function convertServerToTableData(data){
	//match the scenario and simulation, and extend the data in scenario to simulation
  const convertedData =  data.simulationRuns.map((sim) => {
  	const matchScenario    = data.scenarios.filter(scenario => scenario.scenarioId === sim.scenarioId)[0];

    const runningTime      = (sim.endTime - sim.startTime);
    const maxRunningTime   = matchScenario.maxRunningTime;
    const timeRender       = runningTime + ' / ' + maxRunningTime;
    const exceedRunningTime = runningTime > maxRunningTime;

    const numberOfStops    = sim.result.numberOfStops
    const maxNumberOfStops = matchScenario.maxNumberOfStops
    const stopsRender      = numberOfStops + ' / ' + maxNumberOfStops
    const exceedMaxStops   = numberOfStops > maxNumberOfStops

    if(sim.result.hasCollision === false &&  !exceedRunningTime && !exceedMaxStops){
      sim.doesScenarioPass = true
    } else {
      sim.doesScenarioPass = false
    }


    sim.timeRender = timeRender;
    sim.stopsRender = stopsRender;
    sim.exceedRunningTime = exceedRunningTime;
    sim.exceedMaxStops = exceedMaxStops;
    // assigning to carBuildOptions & scenarioIdOptions
    carBuildOptions = addSelectOptionToArray(carBuildOptions, sim.carBuild);
    scenarioIdOptions = addSelectOptionToArray(scenarioIdOptions, sim.scenarioId)

    return sim;
  });

  return {
  	convertedData, carBuildOptions, scenarioIdOptions
  }
}

export function calculateAllPercentage(data){

	let numOfexceedRunningTime = 0
		  , numOfexceedStops = 0
	    , hasCollision = 0
	    , doesnotPass = 0
	const length = data.length;

	data.forEach(d => {
		if(d.exceedRunningTime) numOfexceedRunningTime += 1;
		if(d.exceedMaxStops) numOfexceedStops += 1;
		if(d.result.hasCollision) hasCollision += 1;
		if(d.doesScenarioPass === false) doesnotPass += 1;
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
	}
}

function calculatePercentage(value, length){
	if(length === 0) return 0;
	return ((value / length) * 100).toFixed(2);
}

export const deepCloneObject = (obj) => JSON.parse(JSON.stringify(obj));

export function recursiveGetValue(obj, fieldString){
	const arrayOfField = fieldString.indexOf('.') > 0 ? fieldString.split('.') : [fieldString];

	if(arrayOfField.length === 1){
		return String(obj[arrayOfField[0]]);
	}

	const nextObj = obj[arrayOfField[0]];
	return recursiveGetValue(nextObj, arrayOfField.slice(1))
}

function addSelectOptionToArray(array, value){
	let obj = { value: value, label: value };
	const isDuplicate = ( array.filter(obj => obj.value === value) ).length > 0;
	
	//prevent duplicate value
	if(isDuplicate){
		return array;
	}
	return array.concat([obj]);
}