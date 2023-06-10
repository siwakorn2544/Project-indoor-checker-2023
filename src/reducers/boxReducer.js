import { SEND_TO_PAGE,SHOW_MODAL,HIDE_A_MODAL,SEND_ROOM_ID,LOGOUT_SUCCESS} from "../actions/boxAction";
/**
 *  ตัวอย่าง
 * "id":"1",
    "Firstname":"Siwakorn",
    "Lastname":"Pianmgam",
    "IdStudents":"62070180",
    "attendance":"Attend",
    "roomid":"LAB",
    "positionX":1,
    "positionY":2,
 * 
 */


const initialState = {
    data:null,
    roomid:"",
    showModal:false,
    isLoggedInBeacon: false,
    loginWithGoogle:false,
    userid: 1,
    userData: null
}

export function boxReducer(state = initialState, action){
    switch(action.type) {
        case SEND_TO_PAGE:
            return {...state, data: action.payload};
        case SEND_ROOM_ID:
            return {
                ...state, roomid: action.payload
            };
        case SHOW_MODAL:
                return {
                  ...state,
                  showModal: true,
                };
        case HIDE_A_MODAL:
                return {
                  ...state,
                  showModal: false,
                };
        case 'LOGIN_BEACON':
            return {
              ...state,
              isLoggedInBeacon: true,
              userid: action.payload
            };
        case 'LOGOUT_BEACON':
            return {
              ...state,
              isLoggedInBeacon: false,
              userid: null
            };
        case 'LOGIN_SUCCESS':
            return {
              ...state,
              loginWithGoogle:true,
              userData: action.payload,
              userid: 2,
            };
        case LOGOUT_SUCCESS:
            return {
              ...state,
              loginWithGoogle:false,
              userData: null,
            };
            default:
          return state;
    }


}
