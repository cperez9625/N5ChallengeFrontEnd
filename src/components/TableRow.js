import TableCell from '../TableCell';

const TableRow = ({permission, handleShow, setDataModal}) =>{

const handleUpdate = () =>{
    handleShow();
    setDataModal(permission);
}

    return(
        <tr>
        <TableCell name={permission.EmployeeFirstName}/>
        <TableCell name={permission.EmployeeLastName}/>
        <TableCell name={permission.PermissionTypeNavigation.Description}/>
        <TableCell name={permission.PermissionDate}/>
        <td>
            <button className="btn btn-primary" onClick={handleUpdate}>Edit</button>
        </td>

    </tr>
    );
}

export default TableRow;