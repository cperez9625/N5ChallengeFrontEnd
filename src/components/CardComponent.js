
import { Card} from 'react-bootstrap'
const CardComponent = ({permission, handleShow, setDataModal}) =>{
    const handleUpdate = () =>{
        handleShow();
        setDataModal(permission);
    }
    
    return(
        <div className="mr-1 mb-3">
            {console.log(permission)}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://2wcvjr2o0jc97l6eq1lut4y1-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/no-profile-img.jpg" />
                <Card.Body>
                    <Card.Title>{permission.EmployeeFirstName} {permission.EmployeeLastName}</Card.Title>
                    <Card.Text><strong>Permission Type:</strong> {permission.PermissionTypeNavigation.Description}</Card.Text>
                    <Card.Text><strong>Permission Date Granted:</strong> {new Date(permission.PermissionDate).toLocaleDateString("en-US")}</Card.Text>
                    <button className="btn btn-primary" onClick={handleUpdate}>Modify Permission</button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardComponent;