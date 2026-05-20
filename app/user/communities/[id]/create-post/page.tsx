import CreateCommunityPostForm from "@/app/Components/CreateCommunityPostForm/CreateCommunityPostForm";
import "./createPost.css";

const CreatePostInCommunityId = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ padding: "20px" }}
    >
      <h1 className="font-bold text-[20px]">Create a new post</h1>
      <div className="createCommunityPostContainer">
        <CreateCommunityPostForm />
      </div>
    </div>
  );
};

export default CreatePostInCommunityId;
