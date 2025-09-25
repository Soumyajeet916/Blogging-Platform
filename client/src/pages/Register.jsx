import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("User registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full border p-2 mb-2"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 mb-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 mb-2"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
