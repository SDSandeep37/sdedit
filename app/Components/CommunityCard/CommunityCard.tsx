// import { useContext, useState } from "react";
// import "./communityCard.css";
// import { UserAuthContext } from "@/Contexts/AuthContext";

// type CommunityCardProps = {
//   id: string;
//   creator: string;
//   name: string;
//   description: string;
//   members: string | number;
//   img: string;
// };
// const CommunityCard = ({
//   id,
//   creator,
//   name,
//   description,
//   members,
//   img,
// }: CommunityCardProps) => {
//   const auth = useContext(UserAuthContext);
//   const [buttonId, setButtonId] = useState("");
//   const [buttonMessage, setButtonMessage] = useState("");
//   if (!auth) return null;

//   const { user, loading } = auth;
//   const handleClick = (id: string) => {
//     console.log(id);
//     setButtonMessage("joinin");
//   };
//   return (
//     <div className="communityCard" key={id}>
//       <div className="communityImgAndHeading">
//         <img src={img ? img : "/tech.png"} alt="community avatar" />
//         <div className="commHeading">
//           <h2>{name}</h2>
//           <span className="text-gray-400">{description}</span>
//         </div>
//       </div>
//       <div className="communityMemberAndJoinButton">
//         <span className="text-gray-300">{members} Members</span>
//         {creator === user?.id ? (
//           <button
//             className="communityJoinButton communityDetailsButton"
//             id={id}
//           >
//             Details
//           </button>
//         ) : (
//           <button
//             className="communityJoinButton"
//             onClick={(e) => handleClick(id)}
//           >
//             {buttonId === id ? buttonMessage : "Join Now"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommunityCard;

"use client";

import { useContext, useState } from "react";
import "./communityCard.css";
import { UserAuthContext } from "@/Contexts/AuthContext";
import Link from "next/link";

type CommunityCardProps = {
  id: string;
  creator: string;
  name: string;
  description: string;
  members: string | number;
  img: string;
  joined: boolean;
};

const CommunityCard = ({
  id,
  creator,
  name,
  description,
  members,
  img,
  joined,
}: CommunityCardProps) => {
  const auth = useContext(UserAuthContext);

  const [joiningCommunity, setJoiningCommunity] = useState<string | null>(null);

  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([]);

  if (!auth) return null;

  const { user } = auth;

  const handleClick = async (communityId: string) => {
    try {
      setJoiningCommunity(communityId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/community-member/create`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            communityId,
          }),
        },
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to join community");
      }

      setJoinedCommunities((prev) => [...prev, communityId]);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setJoiningCommunity(null);
    }
  };
  const isJoining = joiningCommunity === id;

  const isJoined = joinedCommunities.includes(id);

  return (
    <div className="communityCard">
      <div className="communityImgAndHeading">
        <img src={img ? img : "/tech.png"} alt="community avatar" />

        <div className="commHeading">
          <h2>{name}</h2>

          <span className="text-gray-400">{description}</span>
        </div>
      </div>

      {/* <div className="communityMemberAndJoinButton">
        <span className="text-gray-300">{members} Members</span>

        {creator === user?.id ? (
          <button className="communityJoinButton communityDetailsButton">
            Details
          </button>
        ) : (
          <button
            className={`communityJoinButton
              ${isJoining ? "joiningButton" : ""}
              ${isJoined ? "joinedButton" : ""}
              ${joined ? "joinedButton" : ""}
            `}
            onClick={() => handleClick(id)}
            disabled={isJoining || isJoined}
          >
           
            {isJoining ? "Joining..." : joined ? "Joined" : "Join Now"}
          </button>
        )}
      </div> */}
      <div className="communityMemberAndJoinButton">
        <span className="text-gray-300">{members} Members</span>

        {creator === user?.id ? (
          // <button className="communityJoinButton communityDetailsButton">
          //   Details
          // </button>
          <Link href={`/user/communities/${id}/create-post`}>
            <button className="communityJoinButton joinedButton">Post</button>
          </Link>
        ) : isJoining ? (
          <button className="communityJoinButton joiningButton" disabled>
            Joining...
          </button>
        ) : joined ? (
          <Link href={`/user/communities/${id}/create-post`}>
            <button className="communityJoinButton joinedButton">Post</button>
          </Link>
        ) : (
          <button
            className="communityJoinButton"
            onClick={() => handleClick(id)}
          >
            Join Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
