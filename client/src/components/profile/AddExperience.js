import React, { useState} from 'react'

import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { _addExperience } from '../../actions/profileAction';




const AddExperience = ({_addExperience, history }) => {


    /**
     * state 
     */
    const [stateExperienceData, setStateExperinceData] = useState({
      title:"",
      company: "",
      location: "",
      from:"",
      to:"",
      current:"",
      description:"",
    
    });


    /**
     * manage state from to date /curent date
     */
    const [ toDateDisabled , toogleDisabledTodate ] = useState(false);

    const { title, company, location, from, to, current, description } = stateExperienceData;


    /**
     * control fields
     * @param {*} e 
     */
    const handleChange = e =>{

        setStateExperinceData({
            ...stateExperienceData,
            [e.target.name]: e.target.value,
        })
    }

    console.log('state-experience',stateExperienceData)



    /**
     * Submit data
     */
    const handleSubmit =e=>{
        e.preventDefault();
        _addExperience(stateExperienceData, history )
    }




    return (
        <div>
                <h3 className="large text-primary">
                    Add An Experience
                </h3>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> 
                    Add any developer/programming
                    positions that you have had in the past
                </p>

                <small>* = required field</small>

                <form className="form" onSubmit= {e=> handleSubmit(e)} noValidate >
                    <div className="form-group">
                        <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={e=>handleChange(e) } />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" required value={company} onChange={e => handleChange(e)}  />
                    </div>
                    <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => handleChange(e)}  />
                    </div>


                    <div className="form-group">
                        <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => handleChange(e)}  />
                    </div>
                    <div className="form-group">
                    <p>

                    <input
                     type="checkbox" 
                     name="current" 
                     value={current} 
                     checked={current}
                        onChange={ e =>{ 
                            setStateExperinceData({ ...stateExperienceData, current: !current}); 
                            toogleDisabledTodate( !toDateDisabled )
                            
                            }} 
                     /> Current Job

                    </p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                    <input 
                        type="date"
                         name="to" 
                        value={to} 
                        onChange={e => handleChange(e)}
                        disabled= {toDateDisabled ? 'disabled' :'' }
                          />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
                           value={description} onChange={e => handleChange(e)} 
                        ></textarea>
                    </div>

                    <input type="submit" className="btn btn-primary my-1" />

                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
        </div>
    )
}


//PRopstype
AddExperience.propTypes = {
    _addExperience : PropTypes.func.isRequired,
}

export default connect(null, {_addExperience }) (withRouter(AddExperience) );
