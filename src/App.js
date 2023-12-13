import { Route, Routes, Link, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Missing from "./Missing";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Nav from "./Nav";
import Home from "./Home";
import Post from "./Post";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { DataContext } from "./Context/DataContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResut] = useState([]);
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filterResult = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLocaleLowerCase()) ||
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResut(filterResult.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.filter((post) => (post.id === id ? { ...response.data } : post))
      );
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postItem = posts.filter((post) => post.id !== id);
      setPosts(postItem);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title="Posty! social media app" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResult}
              fetchError={fetchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                setPostBody={setPostBody}
                setPostTitle={setPostTitle}
                postBody={postBody}
                postTitle={postTitle}
              />
            }
          />
          <Route
            path=":id"
            element={
              <PostPage posts={posts} handleDelete={(id) => handleDelete(id)} />
            }
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              editTitle={editTitle}
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
            />
          }
        />

        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
