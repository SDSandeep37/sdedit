"use client";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner flex items-center justify-center">
      <div className="bannerContent flex-1 flex flex-col items-center justify-center">
        <div className="content flex flex-col justify-center gap-5">
          <div className="contentText">
            <p className="text-3xl tracking-wide font-extrabold">
              Join the Conversation.
            </p>
            <p className="text-3xl text-(--accent-orange) tracking-wide font-extrabold">
              Share the Trends.
            </p>
          </div>

          <h1 className="tracking-wider">
            Dive into <strong className="text-(--accent-orange)">SDEDIT</strong>{" "}
            communities, post, vote, and discuss what's trending
          </h1>
          <div className="bannerButtons flex gap-4">
            <button className="bannerGetStarted bg-(--accent-orange)">
              Get Started
            </button>
            <button className="bannerLearnMore  bg-(--bg-primary)">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="bannerImage flex-1">
        <img
          src="/banner.png"
          alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
        />
      </div>
    </div>
  );
};

export default Banner;
