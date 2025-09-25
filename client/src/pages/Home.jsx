import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
