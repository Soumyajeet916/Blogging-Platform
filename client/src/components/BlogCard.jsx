export default function BlogCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
      <p className="text-sm text-gray-400">By {post.author}</p>
    </div>
  );
}
