import React from "react";
import { useSelector } from "react-redux";

export function PostList() {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      <ul className="post-list">
        {posts.slice().reverse().map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
