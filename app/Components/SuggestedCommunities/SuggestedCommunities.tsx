import "./style.css";

const SuggestedCommunities = () => {
  return (
    <div
      className="flex flex-col bg-(--bg-primary)"
      style={{ marginRight: "20px", padding: "20px" }}
    >
      <h1 className="text-[16px] font-bold">Recent Posts</h1>
      <div className="recentCommunities flex flex-col justify-center gap-4">
        <div className="recentCommunity">
          <img src="/future.png" alt="community" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div className="recentCommunity">
          <img src="/future.png" alt="community" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div className="recentCommunity">
          <img src="/future.png" alt="community" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestedCommunities;
