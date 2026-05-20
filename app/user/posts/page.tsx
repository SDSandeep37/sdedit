"use client";
import PostCard from "@/app/Components/PostCard/PostCard";
import React, { useEffect, useState } from "react";

const PostPage = () => {
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
    <div className="postsPage" style={{ padding: "20px" }}>
      <h1 className="font-bold text-2xl" style={{ margin: "10px 0px" }}>
        Posts
      </h1>
      <div className="postsCards flex flex-wrap gap-5 items-center justify-center">
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
                  spread="350px"
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
