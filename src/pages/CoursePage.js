import React,{ useEffect, useState } from 'react'

function CoursePage() {
const [allCourse, setAllCourse] = useState(null);



useEffect(()=>{
  const id = localStorage.getItem("userId")
  const role = localStorage.getItem("role")
  if(role === 'Teacher'){
    fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/getschedule/${id}`)
    .then(response => response.json())
    .then(data => setAllCourse(data))
  }else if(role === "Student"){
    setAllCourse("You are not suppose to be here")
  }
  console.log("hi")
},[])
useEffect(()=>{
  console.log("Hello",allCourse)
  if (!allCourse) {
    setAllCourse("There is no course to see..")
  }else{
    return 
  }
},[allCourse])

  const AllCourseAtOne = () => {
  if (typeof allCourse === "string" ) {
  return (
    <h1>{allCourse}</h1>
  )
  } else {
    return allCourse.map((val, index) =>{
      return(
        <>
          <div key={index + 1} className='col-12' >
            <div className='card mt-4'>
              <div className='card-header'>
              <div className=' m-1 row justify-content-between'>
                <div className='col-5' >
                  {val.roomid}
                  <h3> {val.course_name} </h3>
                </div>
                <div className='col-5'>
                <div>Day {val.regular_weekday ? val.regular_weekday: val.schedule_date}&nbsp; Start time&nbsp;
                  {val.regular_starttime.split(":").slice(0, 2).join(":")}&nbsp;
                  End Time&nbsp;
                  {val.regular_endtime.split(":").slice(0, 2).join(":")}
                  </div>
                  <div className='col-6'>
                  Course id:{val.courseId}
                  </div>
                </div>
                </div>
              </div>
              <div className='card-body'>
              <h5 className="card-title">
              {val.course_name}
                </h5>
                <p className="card-text">
                    {val.description}
                </p>
              </div>
            </div>
          </div>      
        </>
      )
      }
    )
  }

}
  return (
    <>
      {/* <pre> {JSON.stringify(allCourse, 2, null)} </pre> */}
      <div className='container mt-lg-5'>
        { allCourse ? (
          <>
          <AllCourseAtOne/>
          </>
        ):(
          <>
            <h1>There is no course to see..</h1>
          </>
        )}
      </div>
      
    </>

  )

}
export default CoursePage
