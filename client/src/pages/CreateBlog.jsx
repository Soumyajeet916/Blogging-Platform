import { useState } from "react";
import axios from "axios";

export default function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/posts", form);
      alert("Post created successfully");
    } catch  {
      alert("Post creation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
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
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Publish</button>
    </form>
  );
}