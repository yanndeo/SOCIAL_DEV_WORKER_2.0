import axios from "axios";
import { _setAlert } from './alertAction';
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import { setAuthToken } from "../utils/setAuthToken";



/**
 * Get current
 * user profile
 */

 export const _getCurrentProfile = ()=> async dispatch => {



     try {
         const res = await axios.get('/api/profile/me');

         dispatch({
             type: GET_PROFILE,
             payload : res.data
         });

     } catch (error) {
         dispatch({
             type: PROFILE_ERROR,
             payload: { msg : error.response.statusText, status : error.response.status }
         })
     }
 }