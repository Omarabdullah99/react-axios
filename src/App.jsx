import { useEffect, useState } from "react";
import Posts from "./Posts";
import initialData from "./data/data";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
      const finalPost = {
        id: id.toString(),
        ...newPost,
      };

      const response = await axios.post(
        "http://localhost:3001/posts",
        finalPost
      );
      console.log("get", response);

      setPosts([...posts, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async (updatedPost) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/posts/${updatedPost.id}`,
        updatedPost
      );

      const updatedPosts = posts.map((post) =>
        post.id === response.data.id ? response.data : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      const filteredData = posts.filter((post) => post.id !== id);
      setPosts(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  //* getAllData
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3001/posts");
      setPosts(response.data);
    };

    getData();
  }, []);

  return (
    <div>
      <div>
        <h1>API Request with Axios</h1>
        <hr />
        <div>
          <Posts
            posts={posts}
            onDelete={handleDeletePost}
            onEditClick={setPost}
          />
          <hr />
          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost onEditPost={handleEditPost} post={post} />
          )}
        </div>
      </div>
    </div>
  );
}
