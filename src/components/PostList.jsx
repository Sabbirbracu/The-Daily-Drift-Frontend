// src/components/PostList.jsx
import React, { useState } from "react";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../features/api/postApi";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId).unwrap();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div>
      <h1>Post List</h1>
      {posts?.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
