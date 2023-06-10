import React, { useState, useEffect, } from 'react';
import { Modal,Table,Button } from 'react-bootstrap'
// import {TestStudents} from '../mockstudents'
import {useDispatch} from 'react-redux'
import {sendToPage} from '../actions/boxAction'

function CheckStudents(props) {
    const [listA,setlistA] = useState([])
    const dispatch = useDispatch()
    const listB = props.mockData
    console.log("listB got from page",listB)
    const datatest = props.roomId
    // console.log("listA is got from fetch",listA)
    // console.log("Hello from Check",datatest.courseId)
    const checkinRoom = [];

    listA.forEach(a => {
      const b = listB.find(b => b.user_id === a.user_id);
      const newObj = {
        user_id: a.user_id,
        name: b ? b.name : a.name,
        Attendance: b ? "Attend" : "Absent"
      };
      checkinRoom.push(newObj);
    });
    
    listB.forEach(b => {
      const a = listA.find(a => a.user_id === b.user_id);
      if (!a) {
        const newObj = {
          user_id: b.user_id,
          name: b.name,
          Attendance: "Unregistered"
        };
        checkinRoom.push(newObj);
      }
    });
    
    console.log("checkinRoom :",checkinRoom)
    const handleSave = () => {
      // console.log(checkinRoom)
      dispatch(sendToPage({...[checkinRoom]}))
    }
    useEffect(()=>{
      fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/getcourse/${datatest.courseId}`)
      .then(response => response.json())
      .then(data => setlistA(data));
    },[datatest.courseId])

    console.log("listA",listA)
  return (  
    <div>
<div
      className="modal"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.onShow} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Check students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-xl-start'>
            <span className="label me-1 p-1 bg-success text-dark rounded">Attend</span>
            <span className="label me-1 p-1 bg-danger text-white rounded">Absent</span>
            <span className="label me-1 p-1 bg-secondary text-white rounded">Unregistered</span>
          </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>IDStudents</th>
        </tr>
      </thead>
      <tbody>
        {checkinRoom.map((item,index) =>{
           const [firstName, lastName] = item.name.split(' ');
           return(
            <tr key={index}
            style={{ 
            backgroundColor: item.Attendance === "Absent"? '#dc3545' :'none' 
            && item.Attendance === "Unregistered"? '#6c757d': 'none' 
            && item.Attendance === "Attend"? '#198754': 'none'
            }}
            className={item.Attendance === "Absent"? 'text-white':'none' 
            && item.Attendance === "Unregistered"? 'text-white': 'none' 
            && item.Attendance === "Attend"? 'text-dark': 'none'}
            >
              <td>{index + 1}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{item.user_id}</td>
            </tr>
          )}
           )
        }
      </tbody>
    </Table>
    <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>

    )
}

export default CheckStudents