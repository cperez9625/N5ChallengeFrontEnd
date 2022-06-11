import React from "react";
import api from './api/permissions'

class AddPermission extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          CONTROLLER_KEY: "PermissionType",
          PERMISSION_CONTROLLER_KEY: "Permission",
          permissionTypeList: [],
          permission:{
              Id:0,
              EmployeeFirstName: '',
              EmployeeLastName: '',
              PermissionType: 0,
          }
        };
    }

    async retrievePermissionTypes () {
        const response = await api.get(`/${this.state.CONTROLLER_KEY}`);
        return response.data;
    }

    componentDidMount() {
        console.log("state",this.state);
        console.log("props",this.props);

        const getAllPermissionTypes = async () =>
        {
          const obtainedList = await this.retrievePermissionTypes();
          console.log(obtainedList);
          if(obtainedList){
            this.setState(() => ({
                permissionTypeList: obtainedList
            }));
          }
        }
    
        getAllPermissionTypes();
    }

    handleUpdate = (e) =>{
        const target = e.target;
        this.setState({
            permission:{
                ...this.state.permission,
                [target.name]:target.value,
            }
        })
    }

    SavePermission = async (e) =>{
        e.preventDefault();
        if(this.state.permission.EmployeeFirstName == "" ||
        this.state.permission.EmployeeLastName == "" ||
        this.state.permission.PermissionType == 0){
            alert("All the fields are mandatory!");
            return;
        }

        const response = await api.post(`/${this.state.PERMISSION_CONTROLLER_KEY}`, this.state.permission);
        console.log(response);
        if(response.status === 201){
            this.props.location.push("/");
        }
    }
  render() {
    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                    <span className='col-form-label'>First Name:</span>
                </div>
                <div className="col-md-4">
                    <input type='text'
                     className='form-control' 
                     name="EmployeeFirstName"
                     value={this.state.permission.EmployeeFirstName}
                     onChange={this.handleUpdate}/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-3">
                    <span className='col-form-label'>Last Name:</span>
                </div>
                <div className="col-md-4">
                    <input type='text'
                     className='form-control'
                     name="EmployeeLastName"
                     value={this.state.permission.EmployeeLastName}
                     onChange={this.handleUpdate}/>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-3">
                    <span className='col-form-label'>Permission Type</span>
                </div>
                <div className="col-md-4">
                    <select className="form-control"
                    name="PermissionType"
                    value={this.state.permission.PermissionType}
                    onChange={this.handleUpdate}>
                        <option value="0">--Select Option--</option>
                        {this.state.permissionTypeList.map(permissionType =>
                        (
                            <option value={permissionType.Id}>{permissionType.Description}</option>
                        ))}
                    </select>
                </div>
            </div>
            <br/>
            <button className="btn btn-primary" onClick={this.SavePermission}>Save</button>
        </div>
    );
  }
}

export default AddPermission;
