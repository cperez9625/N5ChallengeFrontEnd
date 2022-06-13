import { useState, React,useEffect } from "react"
import { useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import api from '../api/permissions'
const PermissionManagement = () =>{
    const [permissionTypeList, setPermissionTypeList] = useState([]);
    const [permission, setPermissionData] = useState({
        Id:0,
        EmployeeFirstName: '',
        EmployeeLastName: '',
        PermissionType: 0,
    });

    const CONTROLLER_KEY = "PermissionType";
    const PERMISSION_CONTROLLER_KEY = "Permission";
    const navigate = useNavigate();
    const retrievePermissionTypes = async () => {
        const response = await api.get(`/${CONTROLLER_KEY}`);
        return response.data;
    }
    
    useEffect(()=>{
        const getAllPermissionTypes = async () =>
        {
          const obtainedList = await retrievePermissionTypes();
          if(obtainedList){
            setPermissionTypeList(obtainedList);
          };
        }

        getAllPermissionTypes();
    }, [])

    const handleUpdate = ({target}) =>{
        setPermissionData({
            ...permission,
            [target.name]: target.value
        })
    }

    const savePermission = async  (e) =>{
        e.preventDefault();
        if(permission.EmployeeFirstName === "" ||
        permission.EmployeeLastName === "" ||
        permission.PermissionType === 0){
            Swal.fire(
                'Warning',
                `All Fields Are Mandatory!`,
                'warning'
            )
            return;
        }

        const response = await api.post(`/${PERMISSION_CONTROLLER_KEY}`, permission);
        if(response.status === 200){
            Swal.fire(
                'Sucessfully Saved!',
                `Permissions for ${permission.EmployeeFirstName} ${permission.EmployeeLastName} have been granted`,
                'success'
            )
            navigate('/')
        }
    }

    return(
        <div class="container">
            <div class=" text-center mt-5 ">
                <h1 >Permission Request</h1>
            </div>

    
    <div class="row ">
      <div class="col-lg-7 mx-auto">
        <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
       
                <div class = "container">
                    <div class="controls">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_name">Firstname *</label>
                                    <input id="form_name" 
                                    type="text" 
                                    name="EmployeeFirstName" 
                                    className="form-control"
                                     placeholder="Please enter your firstname *" 
                                     required="required" 
                                     data-error="Firstname is required."
                                     value={permission.EmployeeFirstName}
                                     onChange={handleUpdate}/>
                                    
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_lastname">Lastname *</label>
                                    <input id="form_lastname" 
                                    type="text"
                                    name="EmployeeLastName" 
                                    className="form-control"
                                    placeholder="Please enter your lastname *"
                                    required="required"
                                    data-error="Lastname is required."
                                    value={permission.EmployeeLastName}
                                    onChange={handleUpdate}/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="form_need">Permission Type *</label>
                                    <select 
                                    id="form_need" 
                                    name="PermissionType"
                                    className="form-control" 
                                    required="required"
                                    data-error="Please specify your need."
                                    onChange={handleUpdate}>
                                        <option value="0">--Select Option--</option>
                                        {permissionTypeList.map(permissionType =>
                                        (
                                            <option value={permissionType.Id}>{permissionType.Description}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button className="btn btn-success btn-send  pt-2 btn-block" onClick={savePermission}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    </div>
</div>


     
    );
}

export default PermissionManagement;