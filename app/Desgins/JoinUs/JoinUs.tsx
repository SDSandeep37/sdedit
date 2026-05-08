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
        <button>Get Started</button>
        <button className="joinNow">Join Now</button>
      </div>
    </div>
  );
};

export default JoinUs;
