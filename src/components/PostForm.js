import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";  // No need for storage import
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostForm() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    imageUrl: "",   // ✅ Add imageUrl field
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function checkAdmin() {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      setIsAdmin(adminDoc.exists());
    }
    checkAdmin();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("You are not authorized to create posts.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        publishedAt: Timestamp.now(),
      });

      alert("Post added!");
      setForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        imageUrl: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to publish post. Please try again.");
    }
  };

  if (!user) {
    return <p className="text-center mt-5">Please log in to create a post.</p>;
  }

  if (!isAdmin) {
    return <p className="text-center mt-5 text-danger">You do not have permission to create posts.</p>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            name="excerpt"
            placeholder="Excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <ReactQuill
  value={form.content}
  onChange={(value) => setForm({ ...form, content: value })}
  theme="snow"
  placeholder="Write your post content here..."
  style={{ height: "300px", marginBottom: "3rem" }}
/>

        </div>
        <div className="mb-3">
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            name="tags"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* ✅ Input field for direct image URL */}
        <div className="mb-3">
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </form>
    </div>
  );
}

export default PostForm;
