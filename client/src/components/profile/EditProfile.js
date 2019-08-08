import React, { Fragment, useState , useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { _createProfile, _getCurrentProfile } from '../../actions/profileAction';
import profileReducer from '../../reducers/profileReducer';


const EditProfile = ({ profile :{ profile, loading } , _createProfile, _getCurrentProfile, history  }) => {



    /**
     * State for form profil
     */
    const [stateProfileData, setStateProfileData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUsername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });



    //Destructucting value of state profile
    const { company, website, location, status, skills, githubUsername, bio, twitter, facebook, linkedin, youtube, instagram } = stateProfileData


    /**
     * State to show or hide 
     * social inputs
     */
    const [ displaySocialInputs, toggleSocailInputs ] = useState(false);



    /**
     * 
     */
    useEffect(() => {

        console.log('componentDidmount on edit', '')

         _getCurrentProfile(); 
     
        setStateProfileData({
       
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubUsername:loading || !profile.githubUsername ? '' : profile.githUbusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
            facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
            linkedin: loading || !profile.social.linkedin ? '' : profile.social.linkedin,
            youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
            instagram: loading || !profile.social.instagram ? '' : profile.social.instagram
        });
        

    }, [loading]);



    console.log("state-profile-edit", stateProfileData);

    //Control fiels form for state
    const handleChange = (e) => { setStateProfileData({ ...stateProfileData, [e.target.name]: e.target.value }) }



    //Submit all datas
    const handleSubmit = e => {
        e.preventDefault();
        _createProfile(stateProfileData, history, true)
    }







    return (
        <div>
            <h1 className="large text-primary">
                Edit Your Profile
                </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile stand out
            </p>

            <small>* = required field</small>

            <form className="form" onSubmit={ e => handleSubmit(e)} >

                <div className="form-group">
                    <select name="status" value={status} onChange={e => handleChange(e)} >
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text" >Give us an idea of where you are at in your career</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company && company } onChange={e => handleChange(e)} />
                    <small className="form-text">Could be your own company or one you work for</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => handleChange(e)} />
                    <small className="form-text">Could be your own or a company website</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => handleChange(e)} />
                    <small className="form-text" >City & state suggested (eg. Boston, MA)</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => handleChange(e)} />
                    <small className="form-text">Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)</small>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Github Username" name="githubUsername" value={githubUsername} onChange={e => handleChange(e)} />
                    <small className="form-text">If you want your latest repos and a Github link, include your username</small>
                </div>

                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio && bio} onChange={e => handleChange(e)} ></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>




                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => toggleSocailInputs(!displaySocialInputs)}>
                        Add Social Network Links
                        </button>
                    <span>Optional</span>
                </div>

                {
                    displaySocialInputs
                    &&
                    <Fragment>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter && twitter} onChange={e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook && facebook} onChange={e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube && youtube} onChange={e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin && linkedin} onChange={e => handleChange(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram && instagram} onChange={e => handleChange(e)} />
                        </div>
                    </Fragment>
                }

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/">Go Back</Link>
            </form>
        </div>
    )
}


//
EditProfile.propTypes = {
  _createProfile: PropTypes.func.isRequired,
  profile : PropTypes.object,
};

//
const  mapStateToProps = (state) => ({
    profile: state.profileReducer,
    
})



export default connect(mapStateToProps, { _createProfile, _getCurrentProfile })(withRouter(EditProfile));
