import { useEffect, useState } from 'react';
import api from '../api/permissions'
import { Link } from "react-router-dom";
import { Modal, Button, Row} from 'react-bootstrap';
import Swal from "sweetalert2";
import CardComponent from './CardComponent';

const PermissionsMain = () =>{
    const CONTROLLER_KEY= "Permission";
    const PERMISSIONTYPE_CONTROLLER_KEY = "PermissionType";

    const [permissionList, setPermissionList] = useState([])
    const [permissionTypeList, setPermissionTypeList] = useState([]);

    const [show, setShow] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const retrievePermissions = async () =>{
        const response = await api.get(`/${CONTROLLER_KEY}`);
        return response.data;
    }

    const retrievePermissionTypes = async () => {
        const response = await api.get(`/${PERMISSIONTYPE_CONTROLLER_KEY}`);
        return response.data;
    }
    useEffect(()=>{
        const getAllPermissions = async () =>
        {
          const obtainedList = await retrievePermissions();
          if(obtainedList){
            setPermissionList(obtainedList);
          };
        }

        const getAllPermissionTypes = async () =>
        {
          const obtainedList = await retrievePermissionTypes();
          if(obtainedList){
            setPermissionTypeList(obtainedList);
          };
        }

        getAllPermissionTypes();
    
        getAllPermissions();
    }, [permissionList])
    
    const handleChangeModal = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleUpdatePermission = async () =>{
        if(dataModal.EmployeeFirstName === "" ||
        dataModal.EmployeeLastName === "" ||
        dataModal.PermissionType === 0){
            Swal.fire(
                'Warning',
                `All Fields Are Mandatory!`,
                'warning'
            )
            return;
        }

        const response = await api.put(`/${CONTROLLER_KEY}`, dataModal);
        console.log(response);
        if(response.status === 200){
            Swal.fire(
                'Sucessfully Saved!',
                `Permissions for ${dataModal.EmployeeFirstName} ${dataModal.EmployeeLastName} have been updated`,
                'success'
            )
            handleClose();
        }
    }

    return(
    <div>
        <br/>
        <br/>

        <h1 style={{textAlign:'center'}}>All Existing Permissions</h1>
        <br/>
        <Link to="/add">
            <button type="button" style={{width:'200px', height:'70px'}} className='ml-2 btn btn-primary'>Request Permission</button>
        </Link>
        <br/>
        <br/>

        <Row>
            {permissionList?.map(
                        (permission) => 
                        (
                            <CardComponent 
                            permission={permission}
                            handleShow={handleShow}
                            setDataModal = {setDataModal}
                            />
                        )
            )}
        </Row>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Permission Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <span className='col-form-label'>First Name:</span>
                    </div>
                    <div className="col-md-4">
                        <input type='text'
                        className='form-control' 
                        name="EmployeeFirstName"
                        value={dataModal.EmployeeFirstName}
                        onChange={handleChangeModal}
                        />
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
                        value={dataModal.EmployeeLastName}
                        onChange={handleChangeModal}
                        />
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
                        value={dataModal.PermissionType}
                        onChange={handleChangeModal}
                        >
                            <option value="0">--Select Option--</option>
                            {permissionTypeList.map(permissionType =>
                            (
                                <option value={permissionType.Id}>{permissionType.Description}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdatePermission}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
}

export default PermissionsMain;