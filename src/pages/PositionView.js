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
import {TestStudents} from '../mockstudents'
import { Test } from '../mockdata';
import { useSelector } from 'react-redux'
import ShowModal from '../components/showmodal';


function PositionView(){
    const mockData = Test
    const posXposY = TestStudents
    const {roomdtailId} = useParams();
    const [data, setData] = useState([]);
    const [showlogModal, setShowlogModal] = useState(false);
    const [showaddModal, setShowaddModal] = useState(false);
    const [showCheckModal, setShowCheckModal] = useState(false);
    const [color, setColor] = useState(false)
    const rows = 2;
    const columns = 2;
    const showModal = useSelector(state => state.showModal);
    /**เอาไว้ show modal*/
    console.log(posXposY)
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
    const all = mockData.find(elm => elm.id === roomdtailId)
    console.log(all)

    const buttonClick = () => {
      console.log("Button clicked!")
      alert("Button Clicked!")
    }

  useEffect(() => {
    fetch('localhost')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const rownumbers = Array.from(Array(rows), (_, i) => rows - 1 - i);
  const colnumbers = Array.from(Array(columns), (_, i) => i);

    return (
        <div className='container mt-5'>
          <div className='card mx-5'>
             <div className='m-4 row justify-content-between'>
              <div className='col-6'>
              <h3 style={{textDecoration:'underline'}}>
                Room:{all.roomid}
              </h3>
              <h3>
                Course Name: {all.courseName} Course id: {all.courseId}
              </h3>
             </div>
             <div className='col-5 align-self-center'>
                <p>
                  Day: {all.regular_weekday} start: {all.regular_starttime} 
                  end :{all.regular_endtime}
                </p>
              </div>
              <div>
                Description : {all.description}
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
                      let posData = posXposY.filter(item => item.attendance !== "Absent" && item.roomid === all.roomid  && item.positionX === col && item.positionY === row);
                      // console.log("PosData line 141: ",posData)
                      return <FieldOne key={posData.user_id} dataInPos={posData} colorOpen={color}alt={posData} roomid={all.roomid} />
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
                  <CheckStudents onShow={showCheck} onClose={closeCheck} mockData={all} roomId={posXposY} />
                )
              }
            </div>
            <div className='col-6 text-end pe-5'>
              <BsPersonPlus size={"3em"} onClick={showadd} />
              <p>Add Students to class</p>
              {
                showaddModal && (
                  <AddUserToRoom onShow={showadd} onClose={closeshowadd} mockData={all}/>
                )
              }
            </div>
            <div className='col-6 p-5'>
              <BsClockHistory size={"3em"} onClick={showlog} />
              <p>Log timeline</p>
              {
                showlogModal && (
                  <LogModal onShow={showlog}onClose={closeshowlog} mockData={all}/>
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
        </div>
      );
}
export default PositionView;