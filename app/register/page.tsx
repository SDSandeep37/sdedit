"use client";
import Link from "next/link";
import "./resgister.css";
import { useState, SubmitEvent, ChangeEvent } from "react";
const registerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!formData.email && !formData.password && !formData.name) {
        setMessageType("error");
        setMessage("Please fill the form");
        return;
      }
      if (!formData.name) {
        setMessageType("error");
        setMessage("Please enter your full name");
        return;
      }
      if (!formData.email) {
        setMessageType("error");
        setMessage("Please enter your email");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setMessageType("error");
        setMessage("Password should be same.");
        return;
      }
      handleApiCall();
    } catch (error) {
      console.log(error);
    } finally {
      timer();
    }
  };
  const handleApiCall = async () => {
    try {
      setMessageType("");
      setMessage("Please wait...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      console.log(result);
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      if (result.success) {
        setMessageType("success");
        setMessage(result.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        window.location.href = "/user";
      }
    } catch (error) {
      console.error("Register failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div className="register flex justify-center items-center">
      <div className="registerFormContainer flex justify-center items-center flex-col">
        <h1 className="text-3xl font-extrabold text-center">
          Create Your Account
        </h1>
        <small>Join the conversation and engage with the community</small>

        <div className="registerForm flex justify-center  flex-col gap-4">
          <form
            className="flex justify-center  flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <div className="formElement flex justify-center  flex-col">
              <label htmlFor="username">Your Name</label>
              <input
                id="username"
                // onChange={(e) => setUserName(e.target.value)}
                name="name"
                onChange={handleChange}
                className="formInput"
                type="text"
                placeholder="Please enter your name"
              />
            </div>
            <div className="formElement flex justify-center  flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                onChange={handleChange}
                name="email"
                className="formInput"
                type="email"
                placeholder="Please enter your email"
              />
            </div>
            <div className="formElement flex justify-center  flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                onChange={handleChange}
                className="formInput"
                type="password"
                placeholder="Please create a strong password"
              />
            </div>
            <div className="formElement flex justify-center  flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                className="formInput"
                type="password"
                placeholder="Please confirm your password"
              />
            </div>
            {message && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                  maxWidth: "300px",
                }}
                className={
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }
              >
                {message}
              </p>
            )}
            <div className="formElement flex  justify-center">
              <button type="submit" className="signUpButton">
                Sign Up
              </button>
            </div>
          </form>
          <div className="info">
            <p>
              Already have and account?{" "}
              <span className="text-(--accent-orange) font-bold">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
