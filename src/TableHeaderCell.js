import React from "react";

class TableHeaderCell extends React.Component{
    render(){
        return(
            <th>{this.props.headerName}</th>
        );
    }
}

export default TableHeaderCell;