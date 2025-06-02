import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import useComments from "./useComments";

function UserIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      fill="#1976d2"
      style={{ marginRight: 6 }}
    >
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      fill="#666"
      style={{ marginRight: 4 }}
    >
      <path d="M12 4a8 8 0 108 8 8.01 8.01 0 00-8-8zm.75 4.5h-1.5v5.25l4.5 2.7.75-1.23-3.75-2.25z" />
    </svg>
  );
}

function DeleteIcon({ onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      fill="#d32f2f"
      style={{ cursor: "pointer", marginLeft: 10 }}
      title="Delete comment"
    >
      <path d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1z" />
    </svg>
  );
}

function CommentsSection() {
  const { id: postId } = useParams();
  const { user, isAdmin } = useAuth();
  const comments = useComments(postId);
  const [commentText, setCommentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (comments.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 4000); // 4 seconds per comment

    return () => clearInterval(interval);
  }, [comments]);

  const handleAddComment = async () => {
    if (!user) return alert("Login to comment.");
    if (!commentText.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      userId: user.uid,
      userEmail: user.email,
      content: commentText.trim(),
      createdAt: serverTimestamp(),
    });

    setCommentText("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!isAdmin) {
      alert("Only admins can delete comments.");
      return;
    }

    const commentRef = doc(db, "posts", postId, "comments", commentId);

    try {
      await deleteDoc(commentRef);
      if (currentIndex >= comments.length - 1) {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
      alert("Failed to delete comment.");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h5 style={{ marginBottom: 16, fontWeight: "600", color: "#333" }}>
        Comments
      </h5>

      {user && (
        <div style={{ marginBottom: 24 }}>
          <textarea
            className="form-control"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{
              resize: "none",
              borderRadius: 6,
              borderColor: "#ccc",
              padding: 10,
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={handleAddComment}
            disabled={!commentText.trim()}
            style={{
              marginTop: 12,
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: commentText.trim() ? "pointer" : "not-allowed",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (commentText.trim()) e.target.style.backgroundColor = "#115293";
            }}
            onMouseLeave={(e) => {
              if (commentText.trim()) e.target.style.backgroundColor = "#1976d2";
            }}
          >
            Post Comment
          </button>
        </div>
      )}

      {comments.length === 0 ? (
        <p style={{ color: "#777", fontStyle: "italic" }}>No comments yet.</p>
      ) : (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            padding: 20,
            maxWidth: 600,
            backgroundColor: "#fafafa",
            userSelect: "none",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <UserIcon />
            <span
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "#1976d2",
                userSelect: "text",
              }}
            >
              {comments[currentIndex].userEmail}
            </span>

            {/* Show delete button if user is admin */}
            {isAdmin && (
              <DeleteIcon
                onClick={() => handleDeleteComment(comments[currentIndex].id)}
              />
            )}
          </div>
          <p
            style={{
              fontSize: 15,
              lineHeight: "1.4",
              color: "#333",
              marginBottom: 10,
              whiteSpace: "pre-wrap",
            }}
          >
            {comments[currentIndex].content}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#666",
              fontSize: 13,
              fontWeight: "500",
            }}
          >
            <ClockIcon />
            <span>
              {comments[currentIndex].createdAt
                ? comments[currentIndex].createdAt.toDate().toLocaleString()
                : "Just now"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentsSection;
