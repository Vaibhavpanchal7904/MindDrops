import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import CommentsSection from "./CommentSection";
import "./PostDetails.css";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPost({ id: docSnap.id, ...docSnap.data() });
    }
    fetchPost();
  }, [id]);

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

  if (!post) return <p className="text-center mt-5">Loading...</p>;

  const handleEditClick = () => {
    navigate(`/edit-post/${id}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">{post.title}</h1>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />
      )}
      <p className="text-muted fst-italic">
        {new Date(
          post.publishedAt?.seconds
            ? post.publishedAt.seconds * 1000
            : post.publishedAt
        ).toDateString()}
      </p>
 <div
  className="mb-4"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

     <p>
  <strong>Category:</strong>{" "}
  {post.category ? (
    <span className="badge bg-primary" style={{ fontSize: "0.9em" }}>
      {post.category}
    </span>
  ) : (
    "Uncategorized"
  )}
</p>

    <p>
  <strong>Tags:</strong>{" "}
  {post.tags && post.tags.length > 0 ? (
    post.tags.map((tag, index) => (
      <span
        key={index}
        className="badge bg-secondary me-1"
        style={{ fontSize: "0.9em" }}
      >
        {tag}
      </span>
    ))
  ) : (
    "None"
  )}
</p>

      {isAdmin && (
        <button
          onClick={handleEditClick}
          className="btn btn-warning mt-3"
          style={{ fontWeight: "600" }}
        >
          Edit Post
        </button>
      )}

            <CommentsSection />

    </div>
  );
}

export default PostDetails;
