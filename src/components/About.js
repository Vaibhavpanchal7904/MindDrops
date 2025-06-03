import React from "react";

function About() {
  return (
    <div className="mt-5">

      {/* Hero Section */}
 <section className="py-5" style={{ backgroundColor: "#FFF3CD" }}>
  <div className="container">
    <div className="card shadow-sm mx-auto" style={{ maxWidth: "700px" }}>
      <div className="card-body text-dark text-center">
        <h1 className="display-4 fw-bold">About MindDrops</h1>
        <p className="lead">
          🚀 Welcome to <strong>MindDrops</strong> – my personal space dedicated to tech, coding, and creativity.
          Built with <strong>React</strong> and <strong>Firebase</strong>, I share real-world insights to help developers grow.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Mission & Vision */}
      <section className="py-5 bg-light text-dark">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5 mb-4">
              <div className="card shadow-sm h-100 text-center p-4">
                <div style={{ fontSize: "3rem" }}>🎯</div>
                <h3 className="fw-bold mt-3">My Mission</h3>
                <p>
                  To educate and inspire developers through easy-to-understand tutorials,
                  tips, and walkthroughs.
                </p>
              </div>
            </div>
            <div className="col-md-5 mb-4">
              <div className="card shadow-sm h-100 text-center p-4">
                <div style={{ fontSize: "3rem" }}>👁️‍🗨️</div>
                <h3 className="fw-bold mt-3">My Vision</h3>
                <p>
                  To build a global learning platform where tech knowledge is free and accessible to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Offer */}
      <section className="py-5" style={{ backgroundColor: "#FFF3CD" }}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What I Offer</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 text-center p-4">
                <div style={{ fontSize: "2.5rem" }}>📘</div>
                <h5 className="mt-3">In-Depth Articles</h5>
                <p>Guides on React, Firebase, web development, and more.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 text-center p-4">
                <div style={{ fontSize: "2.5rem" }}>💬</div>
                <h5 className="mt-3">Community Support</h5>
                <p>Ask questions, get feedback, and grow together.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 text-center p-4">
                <div style={{ fontSize: "2.5rem" }}>💻</div>
                <h5 className="mt-3">Project Tutorials</h5>
                <p>Hands-on coding examples and real projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggest Ideas & Contact Me */}
      <section className="py-5" style={{ backgroundColor: "#D1F0FF" }}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Got Ideas or Content Suggestions?</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card p-4 shadow-sm text-center">
                <div style={{ fontSize: "4rem" }}>💡</div>
                <h5 className="mt-3">Your Voice Matters!</h5>
                <p className="mb-4">
                  Have a brilliant idea, an interesting topic, or content you want to see here? 
                  I'm all ears! Let's build this community together — your suggestions can shape the future of <strong>MindDrops</strong>.
                </p>
                <p>
                  Reach out anytime. Whether it's a simple hello or a detailed proposal, <br />
                  I'm just one message away.
                </p>
                <a href="mailto:contact@minddrops.com" className="btn btn-primary mt-3">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-5 bg-light text-dark">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Get in Touch</h2>
          <p>📧 contact@minddrops.com</p>
          <p>🌐 <a href="https://minddrops.com" className="text-dark text-decoration-underline" target="_blank" rel="noopener noreferrer">Visit my website</a></p>
          <p>🐦 Twitter: @MindDrops</p>
          <p>📍 Based in India 🌏</p>
        </div>
      </section>

    </div>
  );
}

export default About;
