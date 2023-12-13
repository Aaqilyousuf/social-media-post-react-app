import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EditPost = ({
  posts,
  editBody,
  editTitle,
  setEditTitle,
  setEditBody,
  handleEdit,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={handleEdit}>
            <label htmlFor="edittitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            ></input>
            <label htmlFor="editbody">Post:</label>
            <textarea
              id="postbody"
              required
              value={editBody}
              onChange={(e) => {
                setEditBody(e.target.value);
              }}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Update Post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, That's Disaopinting</p>
          <p>
            <Link to="/">Go to our home page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
