import React from "react";

const NewPost = ({
  handleSubmit,
  postBody,
  setPostBody,
  postTitle,
  setPostTitle,
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="posttitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        ></input>
        <label htmlFor="postbody">Post:</label>
        <textarea
          id="postbody"
          required
          value={postBody}
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
        <button className="newPostButton" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
