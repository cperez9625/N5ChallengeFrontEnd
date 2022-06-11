import TableCell from './TableCell';
import TableHeaderCell from './TableHeaderCell';
import React from 'react';
import api from './api/permissions'
import { Link } from "react-router-dom";

class GetPermissions extends React.Component{
    constructor() {
        super();
    
        this.state = {
          CONTROLLER_KEY: "Permission",
          permissionsList: []
        };
    }

    async retrievePermissions () {
        const response = await api.get(`/${this.state.CONTROLLER_KEY}`);
        return response.data;
    }

    componentDidMount = () => {
        console.log("props:",this.props)
        const getAllPermissions = async () =>
        {
          const obtainedList = await this.retrievePermissions();
          if(obtainedList){
            this.setState(() => ({
              permissionsList: obtainedList
            }));
          }
        }
    
        getAllPermissions();
    }
    
    render(){
        return(
        <div className='table-responsive'>
            <br/>
            <h1>Permission</h1>
            <br/>
            <Link to="/add">
                <button type="button" className='btn btn-primary'>Request Permission</button>
            </Link>
            <hr/>
            <div className='table-responsive'>
            <table className="table table-striped table-bordered table-hover table-sm" width="100%">
                <caption>List of permissions</caption>
                <thead className='thead-dark'>
                <tr>
                    <TableHeaderCell headerName="First Name"/>
                    <TableHeaderCell headerName="Last Name"/>
                    <TableHeaderCell headerName="Permission Type"/>
                    <TableHeaderCell headerName="Permission Date"/>
                    <TableHeaderCell headerName="Actions"/>
                </tr>
                </thead>
                <tbody>
                {this.state.permissionsList.map(
                    (element) => 
                    (
                    <tr>
                        <TableCell name={element.EmployeeFirstName}/>
                        <TableCell name={element.EmployeeLastName}/>
                        <TableCell name={element.PermissionTypeNavigation.Description}/>
                        <TableCell name={element.PermissionDate}/>
                        <Link to={{pathname:`/add`, state:{permission:"testie" }}}>
                            <td>
                                <button className="btn btn-primary">Edit</button>
                            </td>
                        </Link>

                    </tr>
                    )
                )}
                </tbody>
            </table>
            </div>
        </div>
        );
    }
}

export default GetPermissions;