import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import React,{useEffect} from 'react';
// import { Testlogdata } from '../mockstudents';



function LogModal(props) {
  // const [saveData, setSaveData] = useState({
  //     students:[],
  //     room_id:props.roomId.roomid,
  // });
  const roomid =props.roomId.roomid
  console.log("ROOMID :",roomid)
  // const data = Testlogdata
  const dataFromPage = props.mockData
  const postData = dataFromPage.map(({user_id, positionX, positionY}) => ({
    uuid: user_id,
    positionX,
    positionY
  }));
  console.log("Hello this postData:",postData)
  // const checkloginroom = data.filter(elm => elm.roomid === dataFromPage.mockData.roomid)
  // const alldata = checkloginroom.filter(elm => elm.attendance !== "Absent" )

  const timestamp = Date.now();
  const date = new Date(timestamp);

  const formattedTime = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = date.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const formattedDateTime = `${formattedTime} ${formattedDate}`;
  const handleSavelog = () => {
    // setSaveData(prevState => ({
    //   ...prevState,
    //   record_time: formattedDateTime,
    //   students:{
    //   }
    // }));

    sendData(roomid)
    /** ตรงนี้ไม่เปลี่ยนเหมือนกดครั้งแรก*/
  }
  const sendData = (id) =>{
    fetch(`http://trackingposition.us-east-1.elasticbeanstalk.com:8080/record/${id}`,{
      method:"POST",
      body:JSON.stringify(
        postData
      ),
      headers:{
        "Content-type": "application/json"
      }}
    )
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.log(error))
  }
  useEffect(()=>{
    /** เปลี่ยนในนี้ */
      // console.log("in useEffect", saveData)
      // console.log('SaveData changed:', saveData);
      // var logdata = JSON.stringify(saveData)
      // console.log("hello this is json.Stringify",logdata)
      /**Do something*/

  },[])
  // console.log('saveData we got :', saveData);
  return (
    <div
      className="modal"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.onShow} onHide={props.onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Log timeline</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {dataFromPage.length === 0? null: dataFromPage.map((item,index)=>{
          const [firstName, lastName] = item.name.split(' ');
          return(
            <tr>
              <td>{index + 1}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Close</Button>
          <Button variant="primary" onClick={handleSavelog}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogModal;