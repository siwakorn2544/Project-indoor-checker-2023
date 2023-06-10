import React, { useState } from 'react'
import { connect , useDispatch} from 'react-redux';
import { Modal,Button } from 'react-bootstrap'

function RegisBeacon() {

    const [TextResponse, setTextResponse]= useState("")
    const dispatch = useDispatch();
    const [formData, setForm] = useState(
       {
         id:'',
       }
      )
    const [loginmodal, setModal] = useState(false)
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
          ...formData,
          [name]: value,
        });
      };
    const getBeacon = (id) =>{
      fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/beaconlogin/${id}`, {
      method:"POST",
      body:JSON.stringify({
        userid:formData.id
      }),
      headers: {
        "Content-type": "application/json;"
      }}
      )
      .then(response => response.text())
      .then(data => setTextResponse(data))
      .catch(error => console.error(error));
    }

    const returnBeacon = (id) =>{
      fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/beaconlogout/${id}`, {
        method:"POST",
        body:JSON.stringify({
          userid:formData.id
        }),
        headers:{
          "Content-type": "application/json;"
        }}
        )
        .then(response => response.text())
        .then(data => setTextResponse(data))
        .catch(error => console.error(error));
    }
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(formData.id);
      getBeacon(formData.id)
      dispatch({
        type: 'LOGIN_BEACON',
        payload: { name: formData.id }
      });
      handleShowModal()
  }
  const handleShowModal = () => {
    setModal(true)
  }
  const handleCloseModal = () => {
    setModal(false)
  }

  const handleLogout = () => {
    // Call your logout API here and dispatch the logout action
    returnBeacon(formData.id)
    dispatch({ type: 'LOGOUT_BEACON' });
    handleShowModal()
  };
  return (
    <> 
        <div className='container mt-5'>
            <div className='row' style={{justifyContent:'center'}}>
                <div className='col-5 m-2'>
                    <h3>Register to Beacon</h3>
                            <label className='sr-only m-2' htmlFor='id'>User ID</label>
                            <input
                            type='text'
                            name='id'
                            className='form-control mb-3 mr-sm-2'
                            placeholder='ID 62070***'
                            value={formData.id}
                            onChange={handleInputChange}/>
                        <button onClick={handleSubmit} className="btn btn-primary ms-2">login</button>
                        <button onClick={handleLogout} className="btn btn-danger text-white ms-2">logout</button>
                </div>
                {
                  loginmodal &&(
                    <Modal show={handleShowModal} onHide={handleCloseModal} size="lg"> 
                      <Modal.Header closeButton>
                       <Modal.Title>
                          Text from Response
                       </Modal.Title>
                      </Modal.Header>
                       <Modal.Body>
                          {TextResponse}
                       </Modal.Body>


                       <Modal.Footer>
                         <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                       </Modal.Footer>
                      
                    </Modal>
                  )
                }
                
            </div>
        </div>
    </>
  )
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user
  };
}


export default RegisBeacon
connect(mapStateToProps)(RegisBeacon)