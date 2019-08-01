import  uuidv4  from "uuid/v4";

import { SET_ALERT , REMOVE_ALERT} from './types';


export const _setAlert = (message, alertType, timeOut= 6000 ) => dispatch =>{

    const id = uuidv4();

    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            message,
            alertType
        }
    });

    setTimeout(function () { 
        dispatch({ 
            type : REMOVE_ALERT,
            payload: id
     })

    }, timeOut);

}