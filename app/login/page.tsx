"use client";
import Link from "next/link";
import "./login.css";
import { useState, SubmitEvent, ChangeEvent } from "react";
const loginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      if (!formData.email) {
        setMessageType("error");
        setMessage("Please enter your email");
        return;
      }
      if (!formData.password) {
        setMessageType("error");
        setMessage("Please enter your password");
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
        `${process.env.NEXT_PUBLIC_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        },
      );
      const result = await response.json();
      if (!result.success) {
        setMessageType("error");
        setMessage(result.message);
        return;
      }
      if (result.success) {
        setMessageType("success");
        setMessage(result.message);
        setFormData({
          email: "",
          password: "",
        });
        window.location.href = "/user";
      }
    } catch (error) {
      console.error("login failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div className="loginUi flex justify-center items-center">
      <div className="loginFormContainer flex justify-center items-center flex-col">
        <h1 className="text-3xl font-extrabold text-center">
          Log In to Your Account
        </h1>
        <small>Welcome back! Please enter your details.</small>

        <div className="loginForm flex justify-center  flex-col gap-4">
          <form
            className="flex justify-center  flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
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
                onChange={handleChange}
                name="password"
                className="formInput"
                type="password"
                placeholder="Please enter your password"
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
              <button type="submit" className="logInButton">
                Log In
              </button>
            </div>
          </form>
          <div className="info">
            <p>
              Not have and <strong>SDEDIT</strong> account?{" "}
              <span className="text-(--accent-orange) font-bold">
                <Link href="/register">Register</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
