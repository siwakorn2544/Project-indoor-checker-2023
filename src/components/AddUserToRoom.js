import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'



function AddUserToRoom(props) {
  const [formData, setFormStudent] = useState({
    user_id:"",
    coruse_id:props.mockData.courseId,
  })
  console.log("Course id",formData.coruse_id)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormStudent({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
    sendData() 
}
const sendData = () =>{
  fetch('http://trackingposition.us-east-1.elasticbeanstalk.com:8080/enroll',{
    method:"POST",
    body:JSON.stringify(formData),
    headers:{
      "Content-type": "application/json"
    }
  }
  )
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error(error))
}
  return (
    <>
      <Modal
      show={props.onShow}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
    >
    <Modal.Header closeButton>
      <Modal.Title>Add students</Modal.Title>
    </Modal.Header>
        <Modal.Body>
                <form className="form-inline" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Students ID ex. 62070xxx</label>
                  <div className="input-group mb-2 mr-sm-2">
                    <input type="text" 
                    className="form-control" 
                    id="inlineFormInputGroupUsername2" 
                    placeholder="xxxxxxxx" 
                    name='user_id'
                    value={formData.user_id}
                    onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
</>
  )
}

export default AddUserToRoom