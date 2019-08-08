import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { _getCurrentProfile } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardActions from "./DashboardActions";


const Dashboard = ({ _getCurrentProfile, auth:{user}, profile:{profile, loading} }) => {


  useEffect(() => {
    console.log('componentDimount dahboard')
    _getCurrentProfile();
   
  }, [])


    return loading && profile === null 
      ? <Spinner />
      : <Fragment >
          <h1 className="large text-primary"> Dashboard</h1>
          <p className="lead" > 
            <i className ="">Welcome {user && user.name} </i>
          </p>

          { profile !== null 
            ? (<Fragment> 
                <DashboardActions/>
             </Fragment> )

            : (<Fragment> 
                <p> You have not setup yen your profile , please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1" > Create Profile </Link>
              </Fragment>)
             }
       </Fragment>


}



Dashboard.propTypes = {
  _getCurrentProfile : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}



const mapStateToProps = state => ({
  auth: state.authReducer,
  profile: state.profileReducer
});

export default connect(mapStateToProps, {_getCurrentProfile})(Dashboard);
