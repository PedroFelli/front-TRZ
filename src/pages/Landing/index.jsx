import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Landing = () => {
  return (
    <div className="container">
      <div className="main">
        <section>
          <h1>What you wanna do:</h1>
          <div className="buttonsContainer">
            <Link to="/register">
              <button type="button" className="button-primary">
                Register
              </button>
            </Link>

            <Link to="/signin">
              <button type="button" className="button-primary">
                Login
              </button>
            </Link>

            <Link to="/survivor/list">
              <button type="button" className="button-primary">
                Check people status
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
