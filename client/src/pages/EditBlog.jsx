import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setForm({ title: res.data.title, content: res.data.content }))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, form);
      alert("Post updated successfully");
      navigate(`/post/${id}`);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 mb-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="w-full border p-2 mb-2 h-40"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
