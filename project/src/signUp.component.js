import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOneUsers, loginto } from './features/user/userSlice';
import './signUp.component.scss';

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!user.firstName) tempErrors.firstName = 'First name is required.';
    if (!user.lastName) tempErrors.lastName = 'Last name is required.';
    if (!user.email) tempErrors.email = 'Email is required.';
    if (!user.password) {
      tempErrors.password = 'Password is required.';
    } else if (user.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(user);
      const res = await dispatch(addOneUsers(user));
      let usertolog = { email: user.email, password: user.password };
      const respon = await dispatch(loginto(usertolog));
      console.log('ok');
      if (!res.payload) {      
          setUser({});
        navigate('/navBar');
      }
     
    }
  };

  return (
    <div className="sign-up-container">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered? <a href="/sign-in">sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
