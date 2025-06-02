import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        
        
        <div className="text-center small">
          © {new Date().getFullYear()} My Personal Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
