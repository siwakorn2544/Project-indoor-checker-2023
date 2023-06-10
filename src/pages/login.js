import React,{useEffect, useState} from 'react';
import { GoogleLogin , GoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import { loginSuccess } from '../actions/boxAction';
import { Modal,Button } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Navbar from '../components/Navbar';
function Login(){
  // const { userId , setUserId } = useContext(UserContext)
  const clientId = '770253882701-o17c6c6rcr911eienucpppkatf6iao66.apps.googleusercontent.com'
  const [ profile, setProfile ] = useState(null); 
  const [ userId, setUserId ] = useState(null)
  const [TextResponse, setTextResponse]= useState("")
  const [LoginModal, setModal] = useState(false)
  const dispatch = useDispatch();

  const checkUserType = (str) => {
    const userId = str.split('@')[0];
    const regex = /^62070\d{3}$/;;
    if (regex.test(userId)) {
      console.log("This is a student:", userId)
      localStorage.setItem("userId", userId)
      localStorage.setItem("role", "Student")
      setUserId(userId)
      getBeacon(userId)
      handleShowModal()
    } else {
      console.log("This is a teacher:", userId)
      localStorage.setItem("role", "Teacher")
      localStorage.setItem("userId", userId)
      setUserId(userId)
    }
  }
  const handleLoginSuccess = (res) => {
    setProfile(res.profileObj)
    console.log("Success",res)
    dispatch(loginSuccess({...res.profileObj}))
    localStorage.setItem("Name", res.profileObj.name);
    checkUserType(res.profileObj.email);
    
};
    /**
    62070180@kmitl.ac.th
    01234567
     */
    const getBeacon = (id) =>{
      fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/beaconlogin/${id}`, {
      method:"POST",
      body:JSON.stringify({
        id
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
          id
        }),
        headers:{
          "Content-type": "application/json;"
        }}
        )
        .then(response => response.text())
        .then(data => setTextResponse(data))
        .catch(error => console.error(error));
    }
const handleLoginFailure  = (response) => {
    console.error('Login failed:', response);
};

const logOut = () =>{
  setProfile(null)
  localStorage.removeItem("Name")
  var id = localStorage.getItem('userId');
  var role = localStorage.getItem('role')
  if (role === "Student") {
    returnBeacon(id)
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    handleShowModal()
  }else{
    localStorage.removeItem("role")
    localStorage.removeItem("userId")
    alert("You had logout")
  }
}
useEffect(()=>{
  const initClient = () =>{
    gapi.client.init({
      clientId: clientId,
      scope: ''
    })
  }
  gapi.load("client:auth2", initClient)
}, [])

useEffect(()=>{

},[userId , profile])
const handleShowModal = () => {
  setModal(true)
}
const handleCloseModal = () => {
  setModal(false)
  if (profile) {
   return ''
  }
  return window.location.reload();
}
  return (
    <>
    <div className='container'>
      <div className='row'>
      <div className="col-5 m-auto pt-5">
          <div>
            { profile ? (
              <>
              {/* <pre>{TextResponse}</pre> */}
                <div className='text-center'>
                 <img src={ profile.imageUrl } alt='user' />
                </div>
                  <h3>Welcome to inDoorTracking</h3> 
                  <p>Name: {profile.name} </p>
                  <p>Email: {profile.email}</p>
                  <pre>User ID: {userId} </pre>
                  <div className='text-center'>
                  <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut}/>
                </div>
                {
                  LoginModal &&(
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
            </>
            ): (
              <>
              <div className='text-center'>
                  <GoogleLogin
                  clientId={clientId}
                  onSuccess={handleLoginSuccess} 
                  onError={handleLoginFailure} 
                  buttonText="Sign in with Google"
                  cookiePolicy="single_host_origin"
                  isSignedIn={true}
                  />
              </div>
                {
                  LoginModal &&(
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
                </>
            )}
          </div>

        </div>
      </div>
    </div>
    </>
    )
}

export default Login
