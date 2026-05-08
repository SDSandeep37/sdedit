import { MdOutlineHowToVote } from "react-icons/md";
import { FaRegCommentAlt } from "react-icons/fa";
import "./featurecard.css";
interface FeatureCardProps {
  id: number;
  img: string;
  heading: string;
  desc: string;
  comment: string;
  vote: string;
}
const FeatureCard = ({
  id,
  img,
  heading,
  desc,
  comment,
  vote,
}: FeatureCardProps) => {
  return (
    <div className="featureCard" key={id}>
      <div className="featureCardImageText">
        <div className="featureCardImage">
          <img
            src={img}
            alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
          />
        </div>
        <div className="featureCardText">
          <h3>{heading}</h3>
          <span>{desc}</span>
        </div>
      </div>

      <div className="featureCardCommentVote">
        <div className="featureCardComment">
          <FaRegCommentAlt />
          <span>{comment}</span>
        </div>
        <div className="featureCardVote">
          <MdOutlineHowToVote />
          <span>{vote}</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
