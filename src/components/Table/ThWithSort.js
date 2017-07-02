import React, { PropTypes } from 'react';
import table_css from './table_css.js';

const style = {
  overflow: 'hidden',
  cursor: 'pointer',
  userSelect: 'none',
}

const cursorCss = {
  position: '',
  display: 'inline-block',
  width: '20px',
  height: '20px',
  right: 10,
  marginTop: '-10px',
  background: 'url("/static/sort_sprite.png") no-repeat 0 0',
}

let sortCss = {};
let widthColumn = {};

class ThWithSort extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    indexElement: PropTypes.number,
    label: PropTypes.string,
    onClick: PropTypes.func,
    active: PropTypes.bool,
  }

  handleClick = (e) => {
    e.preventDefault();

    if (this.props.onClick) {
      const sortAction = this.props.sortAction === 'ascending' ? 'descending' : 'ascending';
    	this.props.onClick(this.props.label, this.props.fieldName, sortAction);
    }
  }

  render() {
    const { children, sortAsc, sorting } = this.props;
    if(!this.props.sorting){
      sortCss = { backgroundPosition: '0 0' };
    }
    else if(this.props.sortAction === 'ascending' && this.props.sorting)  {
      sortCss = { backgroundPosition: '-20px 0' };
    } 
    else if(this.props.sortAction === 'descending' && this.props.sorting){
      sortCss = { backgroundPosition: '-40px 0' };
    }

    if(this.props.label === 'hasCollision'){
      widthColumn = { width: '15%'};
    } else if (this.props.label === 'doesScenarioPass'){
      widthColumn = { width: '17%'};
    } else {
      widthColumn = { width: '11%'};
    }
          
    return (
      <th style={Object.assign(style, widthColumn)}
        onClick={this.handleClick.bind(this)}
      >
        <style>{table_css}</style>
        {children} <div style={Object.assign(cursorCss, sortCss)}></div>
      </th>
    );
  }
}

export default ThWithSort;


// .one-column-emphasis th.sortable::after{
   
// }
// .one-column-emphasis th.sortable.sort-asc::after{
//    background-position: -20px 0;
// }
// .one-column-emphasis th.sortable.sort-dsc::after{
//    background-position: -40px 0;
// }