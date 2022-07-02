import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const { user } = useSelector(state => ({ ...state }));
  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );
      //save user email to local storage
      window.localStorage.setItem('emailForRegistration', email);
      //clear state
      setEmail('');
    } catch (error) {
      toast.error(`You must enter a valid email address for further registration`);
    }
  };
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
