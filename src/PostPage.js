import { useParams, Link } from "react-router-dom";
const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="PostDate">{post.datetime}</p>
            <p className="PostBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button
                className="editButton"
                // onClick={() => handleDelete(post.id)}
              >
                Edit
              </button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, That's Disaopinting</p>
            <p>
              <Link to="/">Go to our home page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
