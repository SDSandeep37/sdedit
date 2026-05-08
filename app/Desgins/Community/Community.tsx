import SmallCard from "@/app/Components/SmallCard/SmallCard";
import "./community.css";

const Community = () => {
  const cardDetails = [
    {
      id: 1,
      img: "/create_community.png",
      heading: "Create Communities",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aut.",
    },
    {
      id: 2,
      img: "/post_vote.png",
      heading: "Post & Vote",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aut.",
    },
    {
      id: 3,
      img: "/comment_discus.png",
      heading: "Create Communities",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, aut.",
    },
  ];
  return (
    <div className="communtiy">
      <h1>
        Explore Your{" "}
        <strong className="text-(--accent-orange)">Communities</strong>
      </h1>
      <p>Connect, share, and engage in your favorite topics.</p>
      <div className="communityCards">
        {cardDetails &&
          cardDetails.map((detail) => (
            <SmallCard
              key={detail.id + detail.heading}
              id={detail.id}
              img={detail.img}
              heading={detail.heading}
              description={detail.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Community;
