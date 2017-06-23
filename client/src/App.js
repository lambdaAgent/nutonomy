import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table/Table';
import Select from './components/Select/Select';

import { fetchData } from './helper/service.js';
import { convertServerToTableData, deepCloneObject, recursiveGetValue, calculateAllPercentage } from './helper/appHelper.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    this.sortAction = this.sortAction.bind(this);
    this.runFilter = this.runFilter.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    fetchData()
      .then(res => {
        const { convertedData, carBuildOptions, scenarioIdOptions } = convertServerToTableData(res);
        const statistics = calculateAllPercentage(convertedData);
        this.setState({
          convertOriginalData: convertedData,
          sortedOrFilteredData: convertedData,
          carBuildOptions,
          scenarioIdOptions,
          statistics
        });
      }) 
      .catch(err => console.error(err))
  }

  onFilterChange(e, fieldName){
    const value     = (e.target.value === 'none') ? undefined : e.target.value;
    const currentStateName = (fieldName === 'carBuild')  ? 'filteredObject_carBuild' : 'filteredObject_scenarioId';
    const stateName2 = (fieldName !== 'carBuild')  ? 'filteredObject_carBuild' : 'filteredObject_scenarioId';

    const currentObject = {
      fieldName: this.state[currentStateName].fieldName,
      fieldValue: value
    }
    const obj2 = {
      fieldName: this.state[stateName2].fieldName,
      fieldValue: this.state[stateName2].fieldValue
    }

    const filteredData = this.runFilter(currentObject, obj2);
    const statistics = calculateAllPercentage(filteredData);
    this.setState({ [currentStateName]: currentObject, sortedOrFilteredData: filteredData, statistics })
  }

  render() {
    console.log(this.state.sortedOrFilteredData)
    return (
      <div className="App">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', margin: '10px 30px',  textAlign:'left'}}> 
            <p style={{fontWeight: 'bold'}}>Filtered by:</p>
            <div>
              <p style={{display:'block'}}>Car Build:</p>
              <Select 
                options={this.state.carBuildOptions}
                onChange={(e) => this.onFilterChange(e, 'carBuild')}
              />
            </div>
            <div>
              <p style={{display:'block'}}>ScenarioId:</p>
              <Select 
                options={this.state.scenarioIdOptions}
                onChange={(e) => this.onFilterChange(e, 'scenarioId')}
              />
            </div>
          </div>
           <div style={{display: 'flex', flexDirection: 'column', margin: '10px 30px', width: 360, textAlign: 'left'}}> 
            <div>
              <p> exceed the maximum number of stops: <strong>{this.state.statistics.exceedMaxStops} %</strong></p>
              <p> exceed the maximum running time: <strong>{this.state.statistics.exceedRunningTime} %</strong></p>
              <p> have a collision: <strong>{this.state.statistics.haveCollision} %</strong></p>
              <p> do not pass: <strong>{this.state.statistics.dontPass} %</strong></p>
            </div>  
          </div>
        </div>

        <div>
          <Table 
            data={this.state.sortedOrFilteredData}
            headerFields={[
              // rearrange the array below to rearrange the column in rendered table
              { label: 'scenarioId',                       dataFieldName: 'scenarioId'         , sortAction: this.sortAction },
              { label: 'carBuild',                         dataFieldName: 'carBuild'           , sortAction: this.sortAction },
              { label: 'startTime',                        dataFieldName: 'startTime'          , sortAction: this.sortAction },
              { label: 'runningTime / maxRunningTime',     dataFieldName: 'timeRender'         },
              { label: 'numberOfStops / maxNumberOfStops', dataFieldName: 'stopsRender'        },
              { label: 'hasCollision',                     dataFieldName: 'result.hasCollision', sortAction: this.sortAction },
              { label: 'doesScenarioPass',                 dataFieldName: 'doesScenarioPass'   , sortAction: this.sortAction },
            ]}
          />
        </div>
      </div>
    );
  }

  /**
   * sortAction, sort array in state, and then setState the sorted array
   * @param  label:String      [description]
   * @param  fieldName:String  [description]
   * @param  sortAction:String [description]
   * @return undefined
   */
  sortAction(label, fieldName, sortAction){
    // since sorting array in javascript will mutate the original array, I will clone the filteredArray
    // cloning, simple implementation of immutability
    const filteredData = deepCloneObject(this.state.sortedOrFilteredData);

    const sortedData = filteredData.sort((a,b) => {
      let fieldA = a[fieldName], fieldB = b[fieldName];
          
      if(fieldName.indexOf('.') > 0){
        fieldA = recursiveGetValue(a, fieldName)
        fieldB = recursiveGetValue(b, fieldName)
      }

      if(sortAction === 'ascending'){
        return (fieldA > fieldB) ? -1 : ( (fieldA < fieldB) ? 1 : 0);
      } 
      else if (sortAction === 'descending'){
        return (fieldA < fieldB) ? -1 : ( (fieldA > fieldB) ? 1 : 0);
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
  runFilter(fieldObj1, fieldObj2){
    let fieldName1  = fieldObj1.fieldName;
    let fieldValue1 = fieldObj1.fieldValue;   
    let fieldName2  = fieldObj2.fieldName;
    let fieldValue2 = fieldObj2.fieldValue;

    if(!fieldValue1 && !fieldValue2) return this.state.convertOriginalData;

    const filteredData = this.state.convertOriginalData.filter(data => {
      if(fieldValue1 && fieldValue2){
        return data[fieldName1] === fieldValue1 && data[fieldName2] === fieldValue2
      } else if(fieldValue1){
        return data[fieldName1] === fieldValue1
      } else if(fieldValue2){
        return data[fieldName2] === fieldValue2
      }
    });

    return filteredData;
  }
}

export default App;

