import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
const signInImage =
  "https://randomwordgenerator.com/img/picture-generator/54e3dd404c5aaf14f1dc8460962e33791c3ad6e04e5074417c2f7dd6954cc1_640.jpg";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarUrl: "",
};

const cookies = new Cookies();
function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState(initialState);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {  username, avatarUrl, password, phoneNumber } = form;

    const URL = "https://stream-chat-server.vercel.app/auth";
    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarUrl,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarUrl", avatarUrl);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>{" "}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}{" "}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarUrl">Avatar URL</label>
                <input
                  name="avatarUrl"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}{" "}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>{" "}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}{" "}
            <div className="auth__form-container_fields-content_button">
              {" "}
              <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <span onClick={switchMode}>
                {isSignUp ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signInImage} alt="sign-in" />
      </div>
    </div>
  );
}

export default Auth;
