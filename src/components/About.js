// About.js
import React from "react";

function About() {
  return (
    <div className="mt-5">

      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">About MyBlog</h1>
          <p className="lead">
            🚀 Welcome to <strong>MyBlog</strong> – your hub for everything tech, coding, and creativity.
            Built with <strong>React</strong> and <strong>Firebase</strong>, we help developers grow by sharing real-world insights.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-light text-dark">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100 text-dark">
                <div style={{ fontSize: "3rem" }}>🎯</div>
                <h3 className="fw-bold">Our Mission</h3>
                <p>
                  To educate and inspire developers through easy-to-understand tutorials,
                  tips, and walkthroughs.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100 text-dark">
                <div style={{ fontSize: "3rem" }}>👁️‍🗨️</div>
                <h3 className="fw-bold">Our Vision</h3>
                <p>
                  Build a global learning platform where tech knowledge is free and accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-5 text-dark" style={{ backgroundColor: "#FFF3CD" }}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What We Offer</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded bg-white shadow-sm h-100 text-dark">
                <div style={{ fontSize: "2.5rem" }}>📘</div>
                <h5>In-Depth Articles</h5>
                <p>Guides on React, Firebase, web development and more.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded bg-white shadow-sm h-100 text-dark">
                <div style={{ fontSize: "2.5rem" }}>💬</div>
                <h5>Community Support</h5>
                <p>Ask questions, get feedback, and grow together.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 rounded bg-white shadow-sm h-100 text-dark">
                <div style={{ fontSize: "2.5rem" }}>💻</div>
                <h5>Project Tutorials</h5>
                <p>Hands-on coding examples and real projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggest Ideas & Contact Me */}
      <section className="py-5 text-dark" style={{ backgroundColor: "#D1F0FF" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Got Ideas or Content Suggestions?</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="bg-white rounded p-4 shadow-sm text-center text-dark">
                <div style={{ fontSize: "4rem" }}>💡</div>
                <h5 className="mt-3">Your Voice Matters!</h5>
                <p className="mb-4">
                  Have a brilliant idea, an interesting topic, or content you want to see here? 
                  I'm all ears! Let's build this community together — your suggestions can shape the future of <strong>MyBlog</strong>.
                </p>
                <p>
                  Reach out anytime. Whether it's a simple hello or a detailed proposal, <br />
                  I'm just one message away.
                </p>
                <a href="mailto:contact@myblog.com" className="btn btn-primary mt-3">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Get in Touch</h2>
          <p>📧 contact@myblog.com</p>
          <p>🌐 <a href="https://myblog.com" className="text-white text-decoration-underline">Visit our website</a></p>
          <p>🐦 Twitter: @MyBlog</p>
          <p>📍 Based in India 🌏</p>
        </div>
      </section>

    </div>
  );
}

export default About;
