import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Landing() {
  return (
    <div className="container">
      <div className="main">
        <section>
          <h1>What you gonna do:</h1>
          <div className="buttonsContainer">
            <Link to="/register">
              <button type="button" className="button-primary">
                Register
              </button>
            </Link>

            <Link to="/update-information/7c11d177-29cb-4abd-8ecb-3319f01acbf1">
              <button type="button" className="button-primary">
                Update location
              </button>
            </Link>

            <Link to="/survivor/7c11d177-29cb-4abd-8ecb-3319f01acbf1/report">
              <button type="button" className="button-primary">
                Flag survivor
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Landing;
