import React from "react";
import {useDispatch} from 'react-redux'
import {sendToPage,sendRoomID} from '../actions/boxAction'
function FieldOne(props){
  // console.log("What is props FieldOne : ", props)
  const{dataInPos} = props
  // console.log("What is props FieldOne : ", dataInPos)
  const{roomid} = props
  const color = props.colorOpen
  // console.log("In components",color)
  // console.log("This is what roomid is in FieldOne : ", roomid)
    const dispatch = useDispatch()

    const backgroundColor = 
      color && dataInPos.length >= 3
    ? '#dc3545'
    : color && dataInPos.length === 2
    ? '#dc5633'
    :  color && dataInPos.length <= 1
    ? '#198754'
    : "#FFFFFF"

    const handleOpenModal = () =>{
        dispatch(sendToPage({...dataInPos}))
        dispatch(sendRoomID({...roomid}))
        dispatch({ type: 'SHOW_MODAL' });
    }
    return(
        <>
          <div className="pos" style={{backgroundColor}} onClick={handleOpenModal}>
            {dataInPos.length}
          </div>
        </>
        
    );
}

export default FieldOne;
