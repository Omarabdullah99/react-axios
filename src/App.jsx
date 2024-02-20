import { useState } from "react";
import Posts from "./Posts";
import initialData from "./data/data";
import AddPost from "./AddPost";
import EditPost from "./EditPost";

export default function App() {
  const [posts, setPosts] = useState(initialData);
  const [post, setPost] = useState(null);

  const handleAddPost = (newPost) => {
    const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
    setPosts([
      ...posts,
      {
        id,
        ...newPost

      }
    ]);
  };

  const handleEditPost = (updatedPost) => {
    console.log('updat',updatedPost)
    setPosts([
      ...posts,
      {
        ...updatedPost
      }
    ])

  };

  const handleDeletePost=(id)=>{
    // console.log('deleteid',id)
    const filteredData= posts.filter((post)=> post.id !==id)
    setPosts(filteredData)
  }

  return (
    <div>
      <div>
        <h1>API Request with Axios</h1>
        <hr />
        <div>
          <Posts posts={posts} onDelete={handleDeletePost} onEditClick={setPost}/>
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
