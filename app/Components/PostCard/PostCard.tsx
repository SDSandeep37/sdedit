import { BiSolidDownvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import "./postcard.css";
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
type PostCardProps = {
  spread: string | number;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  communityId: string;
  title: string;
  poster: string;
  content: string;
  upvotes: number;
  downvotes: number;
  id: string;
  comments: number;
};
const PostCard = ({
  spread,
  authorId,
  authorAvatar,
  authorName,
  communityId,
  title,
  poster,
  content,
  upvotes,
  downvotes,
  id,
  comments,
}: PostCardProps) => {
  const [upvote, setUpvote] = useState(upvotes);
  const [downVote, setDownVote] = useState(downvotes);
  // track current user vote
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);
  // comment popup state
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [comment, setComment] = useState("");
  const handleVoting = async (postId: string, type: "up" | "down") => {
    try {
      const value = type === "up" ? 1 : -1;

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/vote`, {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          postId,
          value,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // remove existing vote
        if (data.vote === null) {
          if (userVote === 1) {
            setUpvote((prev) => prev - 1);
          }

          if (userVote === -1) {
            setDownVote((prev) => prev - 1);
          }

          setUserVote(null);

          return;
        }
        // UPVOTE
        if (value === 1) {
          // switching from downvote -> upvote
          if (userVote === -1) {
            setDownVote((prev) => prev - 1);

            setUpvote((prev) => prev + 1);
          }

          // first upvote
          else if (userVote === null) {
            setUpvote((prev) => prev + 1);
          }

          setUserVote(1);
        }
        // DOWNVOTE
        if (value === -1) {
          // switching from upvote -> downvote
          if (userVote === 1) {
            setUpvote((prev) => prev - 1);

            setDownVote((prev) => prev + 1);
          }

          // first downvote
          else if (userVote === null) {
            setDownVote((prev) => prev + 1);
          }

          setUserVote(-1);
        }
      }

      if (!response.ok) {
        alert("Voting failed");
        console.error(data.message || "Failed to fetch posts");
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);
    }
  };
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/comment/create`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            postId: id,
            content: comment,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message);

        return;
      }

      setMessageType("success");
      setMessage(data.message);

      setComment("");
      setTimeout(() => {
        setShowCommentPopup(false);
        setMessage("");
      }, 2000);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div
        className="postCard bg-(--bg-secondary) flex flex-col"
        style={{ width: spread }}
      >
        <div className="postCardTop">
          <div className="userImage">
            <img
              src={authorAvatar ? authorAvatar : "/future.png"}
              alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
            />
          </div>
          <div className="details">
            <h1 className="font-bold text-[16px]">{title}</h1>
            <span className="text-[10px]">By {authorName}</span>
          </div>
        </div>
        <div className="postDescription">
          <p>{content}</p>
        </div>
        <div className="poster">
          <img
            src={poster ? poster : "/create_community.png"}
            alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
          />
        </div>
        <div className="votes flex gap-5 items-center">
          <div className="flex items-center gap-3 text-[18px] upvote">
            <BiSolidUpvote
              onClick={() => handleVoting(id, "up")}
              className={
                userVote === 1
                  ? "text-green-500 cursor-pointer"
                  : "cursor-pointer"
              }
            />
            <span className="font-bold">{upvote}</span>
          </div>
          <div className="flex items-center gap-3 text-[18px] downvote">
            <BiSolidDownvote
              onClick={() => handleVoting(id, "down")}
              className={
                userVote === -1
                  ? "text-red-500 cursor-pointer"
                  : "cursor-pointer"
              }
            />
            <span className="font-bold">{downVote}</span>
          </div>
          {/* COMMENT */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowCommentPopup(true)}
          >
            <FaRegCommentDots />
            {comments}
            <span>Comment</span>
          </div>
        </div>
      </div>
      {/* COMMENT POPUP */}
      {showCommentPopup && (
        <div className="commentPopupOverlay">
          <div className="commentPopup">
            <h2>Add Comment</h2>

            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
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
            <div className="commentButtons">
              <button onClick={handleCommentSubmit} className="bg-green-600">
                Submit
              </button>

              <button
                onClick={() => setShowCommentPopup(false)}
                className="bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
