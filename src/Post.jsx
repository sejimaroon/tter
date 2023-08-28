import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "./slices/postSlice";

export function Post() {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");


  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 151) {
      setPostText(newText)
    }
  };

  const handlePostSubmit = () => {
    if (postText.trim() !== "") {
      const postId = new Date().getTime();
      dispatch(createPost({ id: postId, text: postText }));
      setPostText("");
    }
  };

  return (
    <div>
      <div className="post-menu">
        <textarea
          value={postText}
          onChange={handleTextChange}
          style={{width:"100%", height:"88%"}}
          required
        />
        <button 
          onClick={handlePostSubmit}
          className="post-btn">
            投稿
        </button>
      </div>
    </div>
  );
}
export default Post;
/*
<ul className="post-option">
          <li>
            <button 
              onClick={handlePostSubmit}
              className="post-btn">
                投稿
            </button>
          </li>
        </ul>
*/