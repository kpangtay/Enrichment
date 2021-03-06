import React from 'react';
import CampusSelectForm from './CampusSelectForm';

const StudentForm = props => {
  console.log(props);
  const image = props.imageUrl
    ? props.imageUrl
    : 'https://www.chefbakers.com/userfiles/pin_photo62522.jpg';
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>New Student Form</h2>
      <br />

      <div className="formCampus">
        <label>
          First Name:
          <input
            onChange={props.handleChange}
            value={props.firstName}
            name="firstName"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <label>
          Last Name:
          <input
            onChange={props.handleChange}
            value={props.lastName}
            name="lastName"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <input
            onChange={props.handleChange}
            value={props.email}
            name="email"
            type="text"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <label>
          GPA:
          <input
            onChange={props.handleChange}
            value={props.gpa}
            name="gpa"
            type="number"
            min="0"
            max="4"
            step=".01"
            placeholder="..."
          />
        </label>
        <br />
        <br />
        <img className="student-image" src={image} width={150} height={150} />
        <input type="file" onChange={props.fileChangedHandler} />
        <br />
        <CampusSelectForm handleChange={props.handleChange} />
        <button
          disabled={!props.firstName || !props.lastName || !props.email}
          className="smallbutton"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
