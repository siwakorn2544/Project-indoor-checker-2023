import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Test, mockTest } from '../mockdata'
import { useSelector } from 'react-redux';
function RoomPage(){
  const test = useSelector(state => {
    console.log(state); // log state to console
    return state.userid;
  });
  const data = Test
  const mockData = mockTest
  useEffect(()=>{
    console.log("This is Test : ",test)
  })
  const MockRoomContent = () => {
    return mockData.map((val) =>{
      return(
        <div className='col-12' key={val.id}>
              <div className="card mt-3">
              <Link to={`/mockpage/${val.id}`}>
                <div className='card-header'>
                  {val.roomid}
                </div>
                  </Link>
                  <div className="card-body">
                  <h5 className="card-title">{val.courseId}</h5>
                  <p className="card-text">
                    {val.courseName}
                  </p>
                </div>
                
                {/* <div className='card-footer'>
                  Time: {val.time}
                </div> */}
              </div>
          
        </div>
      )
    })
  }

  const RoomContent = () => {
    return data.map((val) =>{
      return(
        <div className='col-12' key={val.id}>
              <div className="card mt-3">
              <Link to={`/roomdetail/${val.id}`}>
                <div className='card-header'>
                  {val.roomid}
                </div>
                  </Link>
                  <div className="card-body">
                  <h5 className="card-title">{val.courseId}</h5>
                  <p className="card-text">
                    {val.courseName}
                  </p>
                </div>
{/*                 
                <div className='card-footer'>
                  Time: {val.regular_starttime} : {val.regular_endtime}
                </div> */}
              </div>
          
        </div>
      )
    })
  }
  return (
    <>  
        <div className='container mt-4'>
        <h1>Room page</h1>
              <div className="m-2">
              <blockquote className="blockquote mb-0 card-body">
                  <MockRoomContent/>
                  <RoomContent/>
                </blockquote>
              </div>
        </div>
    </>

  )
}

export default RoomPage