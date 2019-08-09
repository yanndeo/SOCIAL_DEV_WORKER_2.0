import React, { Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const Experience = ({ experiences, deleteExpCallback }) => {
  /**
   * List experiences
   * props
   */
  const experience = experiences.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company} </td>
      <td className="hide-sm">{exp.title} </td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          "Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className=" btn btn-danger" onClick={()=> deleteExpCallback(exp._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2"> Experience Credentials</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </Fragment>
  );
};





//PropType
Experience.propTypes = {
experiences : PropTypes.array.isRequired,
deleteExpCallback : PropTypes.func.isRequired,
}


export default Experience
