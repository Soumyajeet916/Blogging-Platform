import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul className="bg-white shadow rounded-lg p-4">
          {users.map(user => (
            <li key={user._id} className="flex justify-between border-b py-2">
              <span>{user.username} ({user.email})</span>
              <button onClick={() => deleteUser(user._id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <ul className="bg-white shadow rounded-lg p-4">
          {posts.map(post => (
            <li key={post._id} className="flex justify-between border-b py-2">
              <span>{post.title}</span>
              <button onClick={() => deletePost(post._id)} className="text-red-600">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
