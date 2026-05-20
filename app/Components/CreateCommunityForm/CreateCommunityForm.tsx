"use client";
import { ChangeEvent, SubmitEvent, useState } from "react";
import "./createCommunityForm.css";

const CreateCommunityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      if (!formData.name) {
        setMessageType("error");
        setMessage("Please enter the community name");
        return;
      }
      if (!formData.description) {
        setMessageType("error");
        setMessage("Please enter description of community");
        return;
      }
      console.log(formData);
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
        `${process.env.NEXT_PUBLIC_URL}/community/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
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
          name: "",
          description: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Create community failed:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div style={{ margin: "20px 0px" }}>
      <form
        className="createCommnityForm flex flex-col gap-4 "
        onSubmit={handleFormSubmit}
      >
        <div className="formElement flex flex-col">
          <label htmlFor="communityName">Community Name</label>
          <input
            id="communityName"
            name="name"
            type="text"
            placeholder="Enter community name"
            className="formInput"
            onChange={handleChange}
          />
        </div>
        <div className="formElement flex flex-col">
          <label htmlFor="communityDesc">Description</label>
          <input
            id="communityDesc"
            name="description"
            type="text"
            placeholder="Enter short description"
            className="formInput"
            onChange={handleChange}
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
        <div className="formElement flex flex-col">
          <button className="createCommunityButton">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunityForm;
