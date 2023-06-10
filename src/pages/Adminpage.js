import React , { useState }  from 'react'
import AddClass from '../components/addClass'
import AddModal from '../components/addmodal'
import AddTeacher from '../components/addTeacher';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Adminpage() {
    const [key, setKey] = useState('Add new course');
    // const [text, setText] = useState('')
    
  return (
    <>
    <div className='container mt-5 mb-5'>
        <div className='row'>
            <h3 className='text-center text-primary'>{key}</h3>
            <div className='card col-12 pt-0 pe-3 ps-3'>
                <Tabs
                id="controlled-tab"
                justify
                fill
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="me-3 ms-3 mb-3">
                        <Tab eventKey="Add new course" unmountOnExit title="Add-course">
                          <AddClass/>
                        </Tab>
                        <Tab eventKey="Add teacher" unmountOnExit title="Add-teacher">
                          <AddTeacher/>
                        </Tab>
                        <Tab eventKey="Add Student to Course" unmountOnExit title="FormAddStudent">
                          <AddModal/>
                        </Tab>
                </Tabs>
            </div>
        </div>
    </div>
       
    </>
  )
}

export default Adminpage;