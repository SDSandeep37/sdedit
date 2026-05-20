import Link from "next/link";
import "./joinus.css";

const JoinUs = () => {
  return (
    <div className="joinUs">
      <h1>
        Ready to Join <span className="text-(--hover-orange)">SD</span>
        <span className="text-(--accent-orange)">EDIT</span>?
      </h1>
      <p>Sign up now to be a part of conversation!</p>
      <div className="joinButton">
        <button>
          <Link href="/login">Get Started</Link>
        </button>
        <button className="joinNow">
          <Link href="/register">Join Now</Link>
        </button>
      </div>
    </div>
  );
};

export default JoinUs;
