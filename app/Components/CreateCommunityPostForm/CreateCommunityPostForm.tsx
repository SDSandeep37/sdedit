"use client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";
import "./createCommunityPost.css";
const CreateCommunityPostForm = () => {
  const router = useRouter();
  const params = useParams();
  const communityId = String(params.id);
  console.log(params.id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const timer = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setMessageType("error");
      setMessage("Please select an image");
    }
  };
  const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!file) {
        setMessageType("error");
        setMessage("No file selected. Please choose an image to upload.");
        return;
      }
      if (!title) {
        setMessageType("error");
        setMessage("Please enter the title of post");
        return;
      }
      if (!content) {
        setMessageType("error");
        setMessage("Please write something with the post");
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
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("title", title);
      formData.append("content", content);
      formData.append("communityId", communityId);
      setMessageType("");
      setMessage("Please wait...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/post/create`,
        {
          method: "POST",
          body: formData,
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
        router.push("/user");
      }
    } catch (error) {
      console.error("Error while saving post:", error);
      setMessageType("error");
      setMessage("Some went wrong. Please try again!");
    }
  };
  return (
    <div style={{ margin: "20px 0px" }}>
      <form
        className="createCommnityPostForm flex flex-col gap-4 "
        onSubmit={handleFormSubmit}
      >
        <div className="formElement flex flex-col">
          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            placeholder="Enter the title of post"
            className="formInput"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="formElement flex flex-col">
          <label htmlFor="content">Description</label>
          <input
            id="content"
            name="content"
            type="text"
            value={content}
            placeholder="Enter content"
            className="formInput"
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className="formElement flex flex-col">
          <label htmlFor="file">Select an Image</label>
          <input
            id="file"
            name="file"
            type="file"
            className="formInput"
            accept="image/*"
            onChange={handleFileChange}
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

export default CreateCommunityPostForm;
