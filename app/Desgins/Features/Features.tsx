import FeatureCard from "@/app/Components/FeatureCard/FeatureCard";
import "./features.css";

const Features = () => {
  const featureCardDetails = [
    {
      id: 1,
      img: "/future.png",
      heading: "The Future of Web Development",
      description: "Lorem ipsum adipisicing elit.",
      comment: 234,
      vote: 24,
    },
    {
      id: 2,
      img: "/sunset.png",
      heading: "Amazing Sunset View",
      description: "Lorem ipsum adipisicing elit.",
      comment: 65,
      vote: 11,
    },
    {
      id: 3,
      img: "/tech.png",
      heading: "Latest Tech Gadgets",
      description: "Lorem ipsum adipisicing elit.",
      comment: 655,
      vote: 10,
    },
  ];
  return (
    <div className="features">
      <div className="featuresCard flex-1">
        <h2>Featured Posts</h2>
        {featureCardDetails &&
          featureCardDetails.map((detail) => (
            <FeatureCard
              key={detail.id + detail.heading}
              id={detail.id}
              img={detail.img}
              heading={detail.heading}
              desc={detail.description}
              comment={String(detail.comment)}
              vote={String(detail.vote)}
            />
          ))}
      </div>
      <div className="featuresImage flex-1">
        <img
          src="/feature.png"
          alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
        />
      </div>
    </div>
  );
};

export default Features;
