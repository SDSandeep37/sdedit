import "./smallCard.css";

interface SmallCardProps {
  img: string;
  heading: string;
  description: string;
  id: number;
}
const SmallCard = ({ img, heading, description, id }: SmallCardProps) => {
  return (
    <div className="smallCard" key={id}>
      <div className="smallCardImage">
        <img
          src={img}
          alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
        />
      </div>
      <div className="smallCardContent">
        <h3>{heading}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SmallCard;
