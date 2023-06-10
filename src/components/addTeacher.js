import React, {useState } from 'react'

function AddTeacher() {
  const [formData ,setFormData] = useState({
    userid:"",
    courseid:""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

  };
  const selectData = () => {
    console.log("user id :" , formData.userid)
    console.log("courseId :" ,formData.courseid)
    console.log("This is JSON.stringify", JSON.stringify(formData))
    fetch('http://trackingposition.us-east-1.elasticbeanstalk.com:8080/watchcourse',{
        method:"POST",
        body:JSON.stringify(
            formData
        ),
        headers:{
            "Content-type":"application/json;"
        }}).then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
  }
    return (
    <>
        <label>Add teacher</label>
        <input type='text' className='form-control col-6' name='userid' placeholder='Your user id' value={formData.userid} onChange={handleChange}/>
        <label>Course Id</label>
        <input type='text' className='form-control col-6' name='courseid' placeholder='course id to add teacher' value={formData.courseid} onChange={handleChange}/>
        <button onClick={selectData} className="btn btn-primary mb-2 mt-4">Save</button>
    </>

  )
}

export default AddTeacher