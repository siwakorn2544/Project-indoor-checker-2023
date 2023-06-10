import React, { useState, useEffect, } from 'react';
import FieldOne from '../components/FieldOne';
import '../App.css';
import '../components/FieldOne';
import LogModal from "../components/logmodal"
import AddUserToRoom from '../components/AddUserToRoom'
import CheckStudents from '../components/checkStudents';
import { Row } from 'react-bootstrap';
import { BsClockHistory,BsPersonCheck,BsPersonPlus } from "react-icons/bs";
import { useParams } from 'react-router-dom';
// import {TestStudents} from '../mockstudents'
import  {mockTest }  from '../mockdata';
import { useSelector } from 'react-redux'
import ShowModal from '../components/showmodal';


function MockPage(){
   /** เอาไว้ใช้้ useEffect*/
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [student, setStudent] = useState([]);
    
    /** เอาไว้ใช้้ useEffect*/

    const [color, setColor] = useState(false)
    const mockData = mockTest
    // const posXposY = TestStudents
    const {mockpagedetailId} = useParams();
    
    const [showlogModal, setShowlogModal] = useState(false);
    const [showaddModal, setShowaddModal] = useState(false);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const rows = 2;
    const columns = 2;
    const showModal = useSelector(state => state.showModal);
    /**เอาไว้ show modal*/

    const handleSwitch = () => {
      setColor(!color)
    }

    const showlog = () => {
      setShowlogModal(true);
    }
    const closeshowlog = () => {
      setShowlogModal(false);
    }
    const showadd = () =>{
      setShowaddModal(true);
    } 
    const closeshowadd = () =>{
      setShowaddModal(false)
    }
    const showCheck = () =>{
      setShowCheckModal(true)
    }
    const closeCheck = () =>{
      setShowCheckModal(false)
    }

    /**เอาไว้ show modal*/
    /** 
     * เอาข้อมูลมา test
     *  */
    let all = mockData.find(elm => elm.id === mockpagedetailId)
    // console.log(all)

    const buttonClick = () => {
      console.log("Button clicked!")
      alert("Button Clicked!")
    }
  /*  ตรงนี้*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/getroomdata/${all.roomid}`);
        const jsonData = await response.json();
        setNewData(jsonData.courseInfo);
        setStudent(jsonData.studentsList)
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData()
    const intervalId = setInterval(() => {
      fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/getpostudent/${all.roomid}`)
      .then(response => response.json())
      .then(data => setData(data));
    }, 2000);

    return () => clearInterval(intervalId);
  },[all.roomid]);
  useEffect(()=>{
    // console.log(data)
    // console.log("parent Page",color)
  },[data,newData,color])
  /* ข้างบนนี้*/
  console.log("Course Info:", newData)
  console.log("data:", student)
  console.log("data we got : ", data)
  const rownumbers = Array.from(Array(rows), (_, i) => rows - 1 - i);
  const colnumbers = Array.from(Array(columns), (_, i) => i);
    return (
        <div className='container mt-5'>
          {/* <pre>{JSON.stringify(newData)}</pre> */}
            {
            newData ? (
            <div className='card mx-5'>
             <div className=' m-4 row justify-content-between'>
              <div className='col-6'>
                <h3 style={{textDecoration:'underline'}}>
                  {/* Room:{all.roomid} */}
                   Room: {newData.roomid}
                </h3>
                <h3 >
                  Course name: {newData.course_name} Course id: {newData.courseId}
                </h3>
              </div>
              <div className='col-5 align-self-center'>
                <p>
                  Day: {newData.regular_weekday} start: {newData.regular_starttime} 
                  end :{newData.regular_endtime}
                </p>
              </div>
              <div>
                Description : {newData.description}
             </div>
             </div>
             
          <div className='row m-5'>
            <div className='col-12'>
              <div className='row'>
                <div className='col-6'>
                3 = <mark style={{backgroundColor:'#dc3545'}}>Red</mark> 
                2= <mark style={{backgroundColor:'#dc5633'}}>Orange</mark> 
                1~0 = <mark style={{backgroundColor:'#198754'}}>Green</mark>
                </div>
                <div className='col-6 text-end form-switch'>
                    <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    id="setColor" 
                    aria-expanded={color}
                    onChange={handleSwitch}/>
                    <label className='form-check-label' htmlFor='Color'>switch to set color</label>
                </div>
              </div>
            </div>
          {
            rownumbers.map((row,index) => 
              <div className="text-center"key={index} style={{direction:"initial"}}>
                {
                  colnumbers.map(
                    col => {
                      // console.log("Data before filter: ",data)
                      let posData = data.filter(item => item.positionX === col && item.positionY === row);
                      // console.log("PosData line 141: ",posData)
                      return <FieldOne key={posData.uuid} dataInPos={posData} colorOpen={color}alt={posData} roomid={all.roomid} />
                    }
                  )
                }
              </div>
              )
          }
          {
           showModal &&(
            <ShowModal onShow={showModal} onClose={showModal}/>
           )
          }
          </div>
          <Row>
            <div className='col-6 ps-5'>
              <BsPersonCheck size={"3em"} onClick={showCheck}/>
              <p>Check Students in class</p>
              {
                showCheckModal &&(
                  <CheckStudents onShow={showCheck} onClose={closeCheck} mockData={data} roomId={newData} />
                )
              }
            </div>
            <div className='col-6 text-end pe-5'>
              <BsPersonPlus size={"3em"} onClick={showadd} />
              <p>Add Students to class</p>
              {
                showaddModal && (
                  <AddUserToRoom onShow={showadd} onClose={closeshowadd} mockData={newData}/>
                )
              }
            </div>
            <div className='col-6 p-5'>
              <BsClockHistory size={"3em"} onClick={showlog} />
              <p>Log timeline</p>
              {
                showlogModal && (
                  <LogModal onShow={showlog}onClose={closeshowlog} mockData={data} roomId={newData}/>
                )
              }
            </div>
            <div className='col-6 text-end p-5'>
                <button type="button" className="btn btn-primary" onClick={buttonClick}>
                        Save
                </button>
            </div>

          </Row>
          </div>
            ):(
              <>
               <h1>Loading...</h1>
              </>
            )
          }
          
          
        </div>
      );
}
export default MockPage;