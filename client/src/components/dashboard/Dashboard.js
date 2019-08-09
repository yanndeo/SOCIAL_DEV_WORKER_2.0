import React, { Fragment, useEffect } from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { _getCurrentProfile, _deleteExperience, _deleteEducation, _deleteAccount } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from './Education';


const Dashboard = ({ _getCurrentProfile, auth: { user }, profile: { profile, loading }, _deleteExperience, _deleteEducation, _deleteAccount }) => {



  /**
   * Get profile 
   * when dashboed component
   * is mounted
   */
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
                   <Experience experiences={profile.experience} deleteExpCallback={ (expID) => _deleteExperience(expID)} />
                   <Education educations={profile.education} deleteEduCallback={(eduID) => _deleteEducation(eduID)} />

                   <div className="my-2">
              <button className="btn btn-danger" onClick={() => _deleteAccount()} >
                        <i className="fas fa-user-minus" > Delete My Account</i>
                      </button>
                   </div>
             </Fragment> )

            : (<Fragment> 
                <p> You have not setup yen your profile , please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1" > Create Profile </Link>
              </Fragment>)
             }
       </Fragment>


}



Dashboard.propTypes = {
  _getCurrentProfile: PropTypes.func.isRequired,
  _deleteExperience: PropTypes.func.isRequired,
  _deleteEducation: PropTypes.func.isRequired,
  _deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};



const mapStateToProps = state => ({
  auth: state.authReducer,
  profile: state.profileReducer
});

export default connect(
  mapStateToProps,
  { _getCurrentProfile, _deleteExperience, _deleteEducation , _deleteAccount}
)(Dashboard);
