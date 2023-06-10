import React, { useState } from 'react'

function AddModal() {
  const [formData, setFormStudent] = useState({
    course_id:"",
    user_id:"",
  })
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
            <form className="form-inline" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="inlineFormInputCourse">Course ID</label>
              <input type="text" 
              name="course_id"
              className="form-control mb-2 mr-sm-2" 
              id="inlineFormInputCourse" 
              placeholder="00"
              value={formData.course_id} 
              onChange={handleInputChange}/>
              <label className="sr-only" htmlFor="inlineFormInputGroupUser_Id">Students ID</label>
              <div className="input-group mb-2 mr-sm-2">
                <input type="text" 
                className="form-control" 
                name="user_id"
                id="inlineFormInputGroupUser_Id" 
                value={formData.user_id} 
                placeholder="62070***"
                onChange={handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>

    </>
  )
}

export default AddModal