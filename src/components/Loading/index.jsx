import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Loading() {
  return (
    <div className="container">
      <div className="main">
        <div className="loading">
          <legend>
            Loading ... <div className="loader" />
          </legend>

          <Link to="/">
            <button type="button" className="button-primary">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Loading;
