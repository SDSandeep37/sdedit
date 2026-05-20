const RecentPost = () => {
  return (
    <div
      className="flex flex-col bg-(--bg-primary)"
      style={{ marginRight: "20px", padding: "20px" }}
    >
      <h1 className="text-[16px] font-bold">Recent Posts</h1>
      <div className="recentPosts flex flex-col justify-center gap-4">
        <div className="post">
          <img src="/future.png" alt="post" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div className="post">
          <img src="/future.png" alt="post" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
        <div className="post">
          <img src="/future.png" alt="post" />
          <p>Lorem ipsum dolor sit.</p>
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
