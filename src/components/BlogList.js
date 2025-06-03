import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { user } = useAuth();

  const [showSearch, setShowSearch] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const snapshot = await getDocs(collection(db, "posts"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);

      if (user) {
        const liked = new Set(
          data.filter(post => post.likes?.includes(user.uid)).map(post => post.id)
        );
        setLikedPosts(liked);
      }
    }

    async function checkAdmin() {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const adminDoc = await getDoc(doc(db, "admins", user.uid));
      setIsAdmin(adminDoc.exists());
    }

    fetchPosts();
    checkAdmin();
  }, [user]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", postId));
    setPosts(posts.filter(post => post.id !== postId));
  };
const handleShare = async (postId) => {
  const postUrl = `${window.location.origin}/post/${postId}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out this blog post",
        text: "I found this interesting blog post:",
        url: postUrl,
      });
      // Optionally no alert needed — user knows they shared
    } catch (error) {
      alert("Share canceled or failed.");
    }
  } else if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(postUrl);
      alert("Post link copied to clipboard!");
    } catch (error) {
      alert("Failed to copy link.");
    }
  } else {
    // Fallback: prompt with the URL so user can copy manually
    prompt("Copy this link:", postUrl);
  }
};

  const handleLike = async (postId, alreadyLiked) => {
    if (!user) {
      alert("Please log in to like posts.");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      if (alreadyLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
      }

      // Refresh posts
      const updatedSnapshot = await getDocs(collection(db, "posts"));
      const updatedData = updatedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(updatedData);

      const updatedLiked = new Set();
      updatedData.forEach(post => {
        if (post.likes?.includes(user.uid)) updatedLiked.add(post.id);
      });
      setLikedPosts(updatedLiked);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? post.category === selectedCategory : true)
  );

  const featuredPost = filteredPosts[0];
  const editorPicks = filteredPosts.slice(1, 11);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Personal Blog</h1>

<div className="row mb-4">
  <div className="d-flex flex-wrap gap-2 justify-content-center">
    {/* Search Toggle */}
    <div className="flex-grow-1" style={{ minWidth: "150px" }}>
      {!showSearch ? (
        <button
          className="btn btn-outline-primary w-100"
          onClick={() => setShowSearch(true)}
        >
          🔍 Search
        </button>
      ) : (
        <SearchBar setSearchTerm={setSearchTerm} />
      )}
    </div>

    {/* Category Toggle */}
    <div className="flex-grow-1" style={{ minWidth: "150px" }}>
      {!showCategory ? (
        <button
          className="btn btn-outline-secondary w-100"
          onClick={() => setShowCategory(true)}
        >
          📂 Categories
        </button>
      ) : (
        <CategoryFilter posts={posts} setSelectedCategory={setSelectedCategory} />
      )}
    </div>
  </div>
</div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-5">
          <h3>Featured Post</h3>
          <div className="card mb-3 shadow">
            <div className="row g-0">
              <div className="col-md-6">
                {featuredPost.imageUrl && (
                  <img
                    src={featuredPost.imageUrl}
                    className="img-fluid rounded-start"
                    alt={featuredPost.title}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center p-3">
                <h4>
                  <Link to={`/post/${featuredPost.id}`}>{featuredPost.title}</Link>
                </h4>
                <p>{featuredPost.excerpt}</p>
                <p className="text-muted">
                  <small>
                    Published:{" "}
                    {new Date(featuredPost.publishedAt?.seconds * 1000).toDateString()}
                  </small>
                </p>
<div className="text-start">  {/* <-- aligns content left */}
  <button
    className="btn btn-sm me-2"
    onClick={() => handleLike(featuredPost.id, likedPosts.has(featuredPost.id))}
    style={{ fontSize: "1.3rem", color: likedPosts.has(featuredPost.id) ? "red" : "gray" }}
  >
    {likedPosts.has(featuredPost.id) ? "♥" : "♡"} {featuredPost.likes?.length || 0}
  </button>
   <button
    className="btn btn-sm btn-outline-secondary"
    onClick={() => handleShare(featuredPost.id)}
    title="Share post link"
  >
    🔗 Share
  </button>
  {isAdmin && (
    <button
      className="btn btn-danger"
      onClick={() => handleDelete(featuredPost.id)}
    >
      Delete
    </button>
  )}
</div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor's Picks */}
      <h4>Editor's Picks</h4>
      <div className="row">
        {editorPicks.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm" style={{ width: "100%", height: "180px", overflow: "hidden" }}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="card-img-top"
                  style={{ width: "100%", height: "180px", objectFit: "contain" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <span className="badge bg-info mb-2">{post.category || "General"}</span>
                <h6>
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h6>
                <p className="text-muted mt-auto">
                  <small>
                    Published: {new Date(post.publishedAt?.seconds * 1000).toDateString()}
                  </small>
                </p>

              <div className="text-start">  {/* <-- aligns content left */}
 <button
  className="btn btn-sm me-2"
  onClick={() => handleLike(post.id, likedPosts.has(post.id))}
  style={{ fontSize: "1.3rem", color: likedPosts.has(post.id) ? "red" : "gray" }}
>
  {likedPosts.has(post.id) ? "♥" : "♡"} {post.likes?.length || 0}
</button>
 <button
    className="btn btn-sm btn-outline-secondary"
    onClick={() => handleShare(featuredPost.id)}
    title="Share post link"
  >
    🔗 Share
  </button>
  {isAdmin && (
    <button
      className="btn btn-danger"
      onClick={() => handleDelete(featuredPost.id)}
    >
      Delete
    </button>
  )}
</div>



                {isAdmin && (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
