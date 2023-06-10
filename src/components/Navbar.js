import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React,{ useState,useEffect} from 'react';
// import { useSelector } from 'react-redux';

function NavBar() {
  const [Name, setName] = useState(null)
  const [UserId, setUserId] = useState(null)
  const [seeNav, setSeeNav] = useState(false)
  

useEffect(()=>{
  const userId = localStorage.getItem('userId');
  if(userId){
    setUserId(userId)
  }else{
    setUserId(null)
  }
  const NewName = localStorage.getItem('Name');
 if(NewName){
    setName(NewName)
 }else{
  setName(null)
 }
},[])
useEffect(()=>{
  const role = localStorage.getItem('role');
 if(role === "Teacher"){
  setSeeNav(true)
 }else{
  setSeeNav(false)
 }
},[])

  return (
    <>
    {
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">KMITL</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/RegisBeacon">RegisBeacon</Nav.Link>
              <Nav.Link href="/roompage">Room</Nav.Link>
              <Nav.Link href="/AdminPage">Admin</Nav.Link>
              {
                 seeNav  && (
                    <Nav.Link href="/CoursePage">CoursePage</Nav.Link>
                 )
              }
              

            </Nav>
          </Navbar.Collapse>
          <p className='text-white m-2'>{ true && !!Name ? `Welcome, ${Name} ` : 'Welcome'}</p>
          <p className='text-white m-2 '>{ true && !!UserId ? `User ID ${UserId} ` : ''}</p>
        </Container>
      </Navbar>
  }
  </>
  );
}

export default NavBar;