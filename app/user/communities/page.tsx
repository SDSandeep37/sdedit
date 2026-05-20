"use client";
import CommunityCard from "@/app/Components/CommunityCard/CommunityCard";
import "./communityPage.css";
import CreateCommunityForm from "@/app/Components/CreateCommunityForm/CreateCommunityForm";
import { useEffect, useState } from "react";
const CommunitiesPage = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllCommunities = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/community`, {
        method: "GET",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        cache: "no-store", // prevents caching
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch communities");
      }

      return data;
    } catch (error: any) {
      console.error("Error fetching communities:", error.message);

      throw error;
    }
  };
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const data = await getAllCommunities();

        setCommunities(data.communities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="communityPage flex flex-col">
      <div className="communityPageHeading">
        <h1 className="font-bold text-3xl">Discover Communities</h1>
        <p className="text-gray-400">
          Join with groups that match your interests.
        </p>
      </div>
      <div className="communityCardsContainer flex gap-5 items-center justify-center flex-wrap">
        {communities &&
          communities.map((community: any) => (
            <CommunityCard
              key={community.id}
              id={community.id}
              creator={community.creatorId}
              name={community.name}
              description={community.description}
              members={community.memberCount}
              img={community.avatar}
              joined={community.joined}
            />
          ))}
      </div>

      <div className="createCommunityFormContainer flex flex-col justify-center items-center">
        <h2 className="font-bold text-[20px]">Create a New Community</h2>
        <p className="text-[14px] text-gray-400">
          Bulid a space for like-minded people to connect and share
        </p>
        <CreateCommunityForm />
      </div>
    </div>
  );
};

export default CommunitiesPage;
