import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, loginto, logout } from './features/user/userSlice';
import './signUp.component.scss';

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const fetchAllUser = async () => {
    await dispatch(fetchAllUsers());
    await dispatch(logout());
  };

  useEffect(() => {
    fetchAllUser();
  }, [dispatch]);

  const changeEmail = (e) => {
    setInputValue(e.target.value);
    setEmailError(''); // Clear error message when user types
  };

  const changePass = (e) => {
    setInputValue1(e.target.value);
    setPasswordError(''); // Clear error message when user types
  };

  const submit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!inputValue) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!inputValue1) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    let user = { email: inputValue, password: inputValue1 };
    const res = await dispatch(loginto(user));

    if (!res.payload) {
      const retry = window.confirm("Error: Invalid credentials. Would you like to try again or create a new account?");
      if (retry) {
        setInputValue('');
        setInputValue1('');
      } else {
        navigate("/sign-up");
      }
    } else {
      navigate('/navBar');
    }
  };

  return (
    <div className="sign-up-container">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={submit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                value={inputValue}
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={changeEmail}
              />
              {emailError && <div className="alert-danger">{emailError}</div>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                value={inputValue1}
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={changePass}
              />
              {passwordError && <div className="alert-danger">{passwordError}</div>}
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Don't have an account? <a href="/sign-up">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
