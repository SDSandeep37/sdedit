"use client";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard/PostCard";
import RecentPost from "../Components/RecentPost/RecentPost";
import SuggestedCommunities from "../Components/SuggestedCommunities/SuggestedCommunities";
import Trending from "../Components/Trending/Trending";
import "./feed.css";
const DashboardPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const getAllPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/post`, {
        method: "GET",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        cache: "no-store", // prevents caching
      });

      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);

      throw error;
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <h1 className="font-bold text-3xl" style={{ margin: "20px 0px" }}>
        Feed
      </h1>
      <div className="feedPostAndOthersContainer flex gap-5">
        <div className="feedPost flex-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {posts &&
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    authorId={post.authorId}
                    authorName={post.authorName}
                    authorAvatar={post.authorAvatar}
                    communityId={post.communityId}
                    title={post.title}
                    poster={post.imageUrl}
                    content={post.content}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    id={post.id}
                    comments={post.comments}
                    spread="90%"
                  />
                ))}
            </>
          )}
        </div>
        <div className="others flex-1 flex flex-col gap-5">
          <Trending />
          <RecentPost />
          <SuggestedCommunities />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
