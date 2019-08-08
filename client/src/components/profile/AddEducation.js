import React , {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { _addEducation } from '../../actions/profileAction';




const AddEducation = ({ _addEducation , history }) => {
  /**
   * state
   */
  const [stateEducationData, setStateEducationData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    to: "",
    from: "",
    current: false,
    description: ""
  });



    const [toDateisDisabled , toggleDisabledToDate ] = useState(false)

/**
 * Destructuring of state
 */
const { school, degree, fieldofstudy, to, from, current, description } = stateEducationData




  /**
   * control fields
   * @param {*} e
   */
  const handleChange = e => {
    setStateEducationData({
        ...stateEducationData,
      [e.target.name]: e.target.value
    });
  };

    console.log("state-education", stateEducationData);

  /**
   * Submit data
   */
  const handleSubmit = e => {
    e.preventDefault();
      _addEducation(stateEducationData, history)
  };

  return (
    <div>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc.. that you have attended
      </p>
      <small>* = required field</small>

      <form className="form" onSubmit={e => handleSubmit(e)} noValidate>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input 
            type="date"
            name="from"
            value={from} 
            onChange= {e=>handleChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input
             type="checkbox"
              name="current" 
              value={current} 
              checked={current}
              onChange={e => 
              {
                  setStateEducationData({ ...stateEducationData, current: !current});
                  toggleDisabledToDate(!toDateisDisabled);
              }}   /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input 
            type="date" 
            name="to" 
            value={to}
            onChange={e => handleChange(e)}
            disabled= { toDateisDisabled ? 'disabled' : '' }
            />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />

        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </div>
  );
};

AddEducation.propTypes = {
_addEducation: PropTypes.func.isRequired,
}

export default connect(null, { _addEducation})(withRouter(AddEducation));
