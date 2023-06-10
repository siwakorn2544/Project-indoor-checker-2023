export const SEND_TO_PAGE ='SEND_TO_PAGE'
export const SHOW_MODAL ='SHOW_MODAL'
export const HIDE_A_MODAL ='HIDE_A_MODAL'
export const SEND_ROOM_ID ='SEND_ROOM_ID'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
/**
 * const action = {
 * type:'',
 * payload: {
 *      "id":"",
        "Firstname":"",
        "Lastname":"",
        "IdStudents":"",
        "attendance":"",
        "roomid":"",
        "positionX":0,
        "positionY":0,
 *  },
 * }
 */
    export function sendToPage(sendedToPage){
        console.log(sendedToPage)
        return {
            type: SEND_TO_PAGE,
            payload:sendedToPage,
        }
    }
    export function sendRoomID(sendedRoomID){
        console.log("Hello ",sendedRoomID)
        return {
            type: SEND_ROOM_ID,
            payload:sendedRoomID,
        }
    }
    export function showAModal(showModal){
        console.log("Hello ",showModal)
        return {
            type: SHOW_MODAL,
        }
    }
    export function hideAModal(showModal){
        console.log(showModal)
        return {
            type: HIDE_A_MODAL,
        }
    }
    export function loginSuccess(userData) {
        console.log("This is in boxAction: ",userData)
        return {
          type: 'LOGIN_SUCCESS',
          payload: userData,
        };
        
      }
    export function logoutSuccess(userData) {
        return {
          type: LOGOUT_SUCCESS,
        };
      }