import React from 'react';
/*import { useSelector } from 'react-redux';*/

export function Timeline  () {
  /*const posts = useSelector(state => state.posts); */// 仮に "posts" というステートを想定

  return (
    <div className="timeline">
      <p>TL</p>
    </div>
  );
};

export default Timeline;
/*
{posts.map(post => (
        <div className="post" key={post.id}>
          <p className="post-text">{post.text}</p>
          <p className="post-time">{post.timestamp}</p>
        </div>
      ))}
      */
