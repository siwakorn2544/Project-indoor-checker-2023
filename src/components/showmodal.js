import React from 'react'
import { Modal,Table,Button } from 'react-bootstrap'
import { useSelector ,useDispatch} from 'react-redux'



function ShowModal(props) {

  const dispatch = useDispatch();
  const selectedData = useSelector(state => {
    console.log(state);
    return state.data
  });
  console.log("This is selectedData ",selectedData)


  const result = Object.entries(selectedData);

  console.log("Hello this is result",result)



    const handleCloseModal = () => {
      dispatch({ type: 'HIDE_A_MODAL' });
    }
  return (
    <div>
<div
      className="modal"
    >
      <Modal show={props.onShow} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Check students in field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>IDStudents</th>
          <th>Beacon uuid</th>
        </tr>
      </thead>
      <tbody>
        {result.length === 0 ? null: result.map((item,index) => {
           // Split the full name into first and last name
           const [firstName, lastName] = item[1].name.split(' ');
           return(
            <tr key={item[0]}>
            <td>{index + 1 }</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{item[1].user_id}</td>
            <td>{item[1].uuid}</td>
          </tr>
           )
        })}
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>

    )
}

export default ShowModal