import React, { useState ,useEffect}  from 'react'
import Fade from 'react-bootstrap/Fade';
function AddClass(props) {
    const [formData, setFormData] = useState({
        roomid:"",
        courseId:"",
        course_name:"",
        description:"",
        regular_weekday:"Monday",
        regular_starttime:"",
        regular_endTime:"",
        scheduleDate:"",
        teacher:"",
    })
    const date = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    const [switchDate,setSwitchDate] = useState(false)

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        active:switchDate,
        [name]: value,
      });
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        var forData = JSON.stringify(formData)
        console.log("hello in submit json.Stringify",forData)
        console.log(formData);
        sendData()
        // sendWhoControl()
    }
 /*ตรงนี้เป็นการกดเปลี่ยนswitchเมือเปลี่ยนจะไปตั้งให้วันที่เรียนตลอด เป็นวันจันทร์แก้ bug ตรงนั้น
  และ
 */
    const handleSwitchChange = () => {
      setSwitchDate(!switchDate);
      console.log("switchDate: ",!switchDate)
      if (!switchDate) {
        setFormData({
          ...formData,
          regular_weekday:"Monday".toUpperCase(),
          active:true,
          scheduleDate:""
        })
      } else {
        setFormData({
          ...formData,
          regular_weekday:"",
          active:false,
          scheduleDate:""
        })
      }

    };
    useEffect(()=>{
      /** เปลี่ยนในนี้ */
        // console.log("in useEffect", formData)
        // console.log('formData changed:', formData);
        var fordata = JSON.stringify(formData)
        console.log("hello this is json.Stringify",fordata)
        /**Do something*/
  
    },[formData])
    console.log('formData we got :', formData);

    const sendData = () =>{
      fetch('http://trackingposition.us-east-1.elasticbeanstalk.com:8080/addcourse' , {
        method:"POST",
        body:JSON.stringify({
            "courseId":formData.courseId,
            "course_name":formData.course_name,
            "description":formData.description,
            "schedule_date":formData.scheduleDate,
            "regular_starttime":formData.regular_starttime,
            "regular_endtime":formData.regular_endTime,
            "regular_weekday":formData.regular_weekday.toUpperCase(),
            "roomid":formData.roomid,
            "active":formData.active
        }),
        headers:{
          "Content-type": "application/json;"
        }}
      )
      .then(response => response.json())
      .then(data => console.log("data has pass",data))
      .catch(error => console.log(error));
    }

    // const sendWhoControl = () =>{
    //   fetch('http://trackingposition.us-east-1.elasticbeanstalk.com:8080/watchcourse', {
    //     method:"POST",
    //     body:JSON.stringify({
    //       userid:formData.teacher,
    //       courseId:formData.courseId,
    //     }),
    //     headers:{
    //       "Content-type":"application/json;"
    //     }}
    //   ).then(response => response.text())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));
    // }

  return (
    <>
          <form className="form-inline" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="inlineFormInputName2">Room Name</label>
            <input type="text" 
            className="form-control mb-2 mr-sm-2" 
            name="roomid"
            placeholder="Enter room name"
            value={formData.roomid}
            onChange={handleInputChange}/>
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Subject name</label>
            <div className="input-group mb-2 mr-sm-2">
              <input type="text" 
              className="form-control" 
              name="course_name"
              placeholder="Subject name" 
              value={formData.course_name}
              onChange={handleInputChange}/>
            </div>
            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Subject id</label>
            <div className="input-group mb-2 mr-sm-2">
              <input type="text" 
              className="form-control" 
              name="courseId"
              placeholder="Subject id" 
              value={formData.courseId}
              onChange={handleInputChange}/>
            </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea 
                name="description" 
                value={formData.description} 
                className="form-control" 
                onChange={handleInputChange}  
                placeholder="Description"
                id="exampleFormControlTextarea1" 
                rows="3"></textarea>
              </div>
              {/* <div className="mb-3 col-5">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Teacher</label>
                <input 
                name="teacher" 
                value={formData.teacher} 
                className="form-control" 
                onChange={handleInputChange}  
                placeholder="user id(email before @)"
                />
              </div> */}
              <div className="form-check form-switch mb-5">
                  <input className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="flexSwitchCheckDefault"
                  aria-controls="Fade-text"
                  aria-expanded={switchDate}
                  onChange={handleSwitchChange}
                   />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Switch to select between only one time or once a ever week</label>
              </div>
              <Fade in={switchDate} unmountOnExit>
                    <div id="Fade-text">
                        <div className='col-6'>
                          <h3>This is for every week </h3>
                          <label htmlFor="Date" className='me-3'>Select a regular Date:</label>
                          <select 
                          name='regular_weekday'
                          className='form-control'
                          value={formData.regular_weekday} 
                          onChange={handleInputChange}>
                            {
                              date.map((eme) =>{
                                return(<option key={eme} value={eme}>{eme}</option>)
                              } )
                            }
                          </select>
                        </div>
                        <div className='col-6'>
                          <label htmlFor="time" className='mt-2 me-3'>Select a regular Start time:</label>
                          <input 
                          type="time" 
                          className='form-control'
                          name='regular_starttime'
                          step="2"
                          value={formData.regular_starttime} 
                          onChange={handleInputChange}/>
                        </div>
                        <div className='col-6'>
                          <label htmlFor="time" className='mt-2 me-3'>Select a regular end time:</label>
                          <input type="time"
                          name='regular_endTime'
                          className='form-control'
                          step="2"
                          value={formData.regular_endTime} 
                          onChange={handleInputChange}/>
                        </div>
                    </div>
              </Fade>
                <Fade appear in={!switchDate} unmountOnExit>
                  <div id="Fade-text">
                      <div className='col-6'>
                      <h3>This is for once time only </h3>
                              <label htmlFor="Date" className='me-3'>Select a Date:</label>
                                      <input 
                                  name='scheduleDate'
                                  className='form-control'
                                  type='date'
                                  value={formData.scheduleDate} 
                                  onChange={handleInputChange}>
                          </input>
                          </div>
                          <div className='col-6'>
                          <label htmlFor="time" className='mt-2 me-3'>Select a Start time:</label>
                          <input 
                          type="time"
                          className='form-control'
                          name='regular_starttime'
                          step="2"
                          value={formData.regular_starttime} 
                          onChange={handleInputChange}/>
                        </div>
                        <div className='col-6'>
                          <label htmlFor="time" className='mt-2 me-3'>Select a end time:</label>
                          <input type="time"
                          name='regular_endTime'
                          className='form-control'
                          step="2"
                          value={formData.regular_endTime} 
                          onChange={handleInputChange}/>
                        </div>
                  </div>
              </Fade> 
            <button type="submit" className="btn btn-primary mb-2 mt-4">Save</button>
          </form>
  </>
  )
}

export default AddClass