import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const Education = ({ educations, deleteEduCallback }) => {


    /**
     * List educations
     *props
     */
    const education = educations.map(edu => (

        <tr key={edu._id}>
            <td>{edu.school} </td>
            <td className="hide-sm">{edu.degree} </td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
               {
                  edu.to === null
                    ?
                    "Now"
                    :
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                }
            </td>
            <td>
                <button className=" btn btn-danger" onClick={() => deleteEduCallback(edu._id) } >Delete </button>
            </td>
        </tr>
    ));




    return (
        <Fragment>
            <h2 className="my-2"> educations Credentials</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm" >Degree</th>
                        <th className="hide-sm" >Years</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>{education}</tbody>
            </table>

        </Fragment>
    )
}




//PropType
Education.propTypes = {
  educations: PropTypes.array.isRequired,
  deleteEduCallback: PropTypes.func.isRequired,
};


export default Education
