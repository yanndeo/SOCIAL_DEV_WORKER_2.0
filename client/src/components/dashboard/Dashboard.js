import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { _getCurrentProfile } from '../../actions/profileAction';


const Dashboard = ({ _getCurrentProfile, auth, profile}) => {


  useEffect(() => {
    console.log('componentDimount dahboard')
    _getCurrentProfile()
   
  }, [])


    return (
      <div>
        <h3>Dashboard ....</h3>
      </div>
    );


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
