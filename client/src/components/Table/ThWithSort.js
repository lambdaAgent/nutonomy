import React, { PropTypes } from 'react';

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
    	this.props.onClick(this.props.label,this.props.fieldName, sortAction);
    }
  }

  render() {
    const { children, sortAsc, sorting } = this.props;
    let classSortable;
    if(this.props.sortAction === 'ascending' && this.props.sorting)  {
      classSortable = 'sort-asc'
    } else if(this.props.sortAction === 'descending' && this.props.sorting){
      classSortable = 'sort-dsc'
    }
          
    return (
      <th className={'sortable ' + classSortable}
        style={{cursor: 'pointer', userSelect: 'none'}}
        onClick={this.handleClick.bind(this)}
      >
        {children} 
      </th>
    );
  }
}

export default ThWithSort;
