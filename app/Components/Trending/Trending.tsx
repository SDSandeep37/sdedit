import "./trending.css";

const Trending = () => {
  return (
    <div
      className="flex flex-col bg-(--bg-primary)"
      style={{ marginRight: "20px", padding: "20px" }}
    >
      <h1 className="text-[16px] font-bold">Trending Topic</h1>
      <div className="trendingTopics flex items-center justify-center flex-wrap gap-4">
        <div className="topics ">
          <p>#WebDev</p>
        </div>
        <div className="topics">
          <p>#AI</p>
        </div>
        <div className="topics">
          <p>#ML</p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
