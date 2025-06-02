import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext";

function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    imageUrl: "",
  });

  // Check admin status
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

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            title: data.title || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            category: data.category || "",
            tags: data.tags ? data.tags.join(", ") : "",
            imageUrl: data.imageUrl || "",
          });
        } else {
          alert("Post not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id, navigate]);

  if (!user) return <p className="text-center mt-5">Please log in to edit posts.</p>;

  if (!isAdmin) return <p className="text-center mt-5 text-danger">You do not have permission to edit posts.</p>;

  if (loading) return <p className="text-center mt-5">Loading post data...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        updatedAt: Timestamp.now(),
      });

      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Edit Post</h2>
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
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
            required
            className="form-control"
            rows={6}
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
        <div className="mb-3">
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
