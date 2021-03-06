import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editProfile, getCurrentUser } from "../../actions/profile";
import { Link, Redirect } from "react-router-dom";
import Alert from "../UI/Alert";

const EditProfile = ({
  editProfile,
  profile: { profile, loading },
  history,
  getCurrentUser,
}) => {
  const [createForm, setCreateForm] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });

  useEffect(() => {
    if (profile !== null) {
      getCurrentUser();

      const stateObj = { ...createForm };

      for (const objKey in profile) {
        if (objKey in stateObj) stateObj[objKey] = profile[objKey];
      }
      for (const objKey in profile.social) {
        if (objKey in stateObj) stateObj[objKey] = profile.social[objKey];
      }
      if (stateObj.skills) stateObj.skills = stateObj.skills.join(", ");

      setCreateForm(stateObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, profile]);

  if (profile === null) {
    return <Redirect to="/dashboard" />;
  }
  const {
    status,
    company,
    website,
    location,
    skills,
    githubusername,
    bio,
    twitter,
    instagram,
    facebook,
    linkedin,
    youtube,
  } = createForm;

  const handleInputChange = (event) => {
    const value = event.target.value;

    setCreateForm({ ...createForm, [event.target.name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile(createForm, history);
    window.scrollTo(0, 0);
  };

  return (
    <section className="container">
      <Alert />
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(event) => handleInputChange(event)}
          >
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
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(event) => handleInputChange(event)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(event) => handleInputChange(event)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(event) => handleInputChange(event)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(event) => handleInputChange(event)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(event) => handleInputChange(event)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(event) => handleInputChange(event)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            style={{ cursor: "not-allowed" }}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            value={twitter}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            value={facebook}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input
            type="text"
            placeholder="YouTube URL"
            name="youtube"
            value={youtube}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
            value={linkedin}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            value={instagram}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getCurrentUser })(
  EditProfile
);
