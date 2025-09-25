import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${username}`)
      .then(res => setUser(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/posts/user/${username}`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, [username]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      {posts.map(post => (
        <div key={post._id}>
          <PostCard post={post} />
          <Link to={`/edit/${post._id}`} className="text-blue-600 underline">Edit</Link>
        </div>
      ))}
    </div>
  );
}
