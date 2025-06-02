import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BlogList from "./components/BlogList";
import PostDetails from "./components/PostDetails";
import PostForm from "./components/PostForm";
import Login from "./components/Login";
import { useAuth } from "./components/AuthContext";
import EditPost from "./components/EditPost"; 
import About from "./components/About";
import NavBar from"./components/NavBar";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/admin/new" element={
          <PrivateRoute>
            <PostForm />
          </PrivateRoute>
        } />

         <Route
          path="/edit-post/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
      <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
