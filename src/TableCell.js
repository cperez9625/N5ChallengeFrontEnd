import React from 'react';
class TableCell extends React.Component{
    render(){
        return(
            <td>{this.props.name}</td>
        );
    }
}

export default TableCell;
