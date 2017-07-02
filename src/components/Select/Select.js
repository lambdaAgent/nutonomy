import React, { PropTypes } from 'react';
import select from './select_css.js';

class Select extends React.Component {
	static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object), // { label:String, value: String}
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }
	constructor(props) {
		super(props);
		
	}

	render(){

		return(
			<div>
				<style>{select}</style>
				<select className='select' onClick={this.props.onClick} onChange={this.props.onChange} style={this.props.style}>
					{
						this.props.options.map(opt => {
							return <option key={opt.label} value={opt.value}>{opt.label}</option>
						})
					}
				</select>
			</div>
		);
	}
}

export default Select;