import React from 'react';
import ThWithSort from './ThWithSort';
import './table.css'
import { recursiveGetValue } from '../../helper/appHelper.js';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortingField: undefined,
	    sortAction: 'ascending'
		};
		this.renderHeader = this.renderHeader.bind(this);
		this.renderBody = this.renderBody.bind(this);
		this._onHeaderClick = this._onHeaderClick.bind(this);
	}
	render(){
		const { data, headerFields } = this.props;

		return(
			<table className='one-column-emphasis'>
				<thead>
					<tr>
						{ this.renderHeader(data, headerFields) }
					</tr>
				</thead>
				<tbody>
					{
						this.renderBody(data, headerFields)
					}
				</tbody>
			</table>
		);
	}

	renderHeader(data, headerFields){
		return headerFields instanceof Array && headerFields.map(headerField => {
			if(headerField.sortAction && headerField.sortAction instanceof Function){
				return (
					<ThWithSort 
						key={headerField.label}
						label={headerField.label}
						fieldName={headerField.dataFieldName}
						sorting={headerField.label === this.state.sortingField}
						sortAction={this.state.sortAction}
						onClick={(label, fieldName, sortStatus) => this._onHeaderClick(label, fieldName, sortStatus,headerField)}
						>
						{headerField.label}				
					</ThWithSort>
				);
			} else {
				return <th key={headerField.label}>{headerField.label}</th>
			}
		})
	}

	renderBody(data, headerFields){
		return data instanceof Array && data.map((d,index) => {
			return(
				<tr key={'tr'+index}>
					{
						headerFields instanceof Array && headerFields.map(header => {
							const { dataFieldName } = header;
							const value = recursiveGetValue(d, dataFieldName)
							return (
								<td key={'td'+d.scenarioId+dataFieldName}>{value}</td>
							)
						})
					}
				</tr>
			)

		})
	} 

	_onHeaderClick(label, fieldName, sortStatus, headerField) {
		this.setState({
			sortingField: label,
			sortAction: sortStatus
		}, 
			// after setState, pass the value to the parent with props.sortAction
			() => headerField.sortAction(label, fieldName, sortStatus)
		)
	}
}

export default Table;


