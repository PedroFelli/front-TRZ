import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../../services/api';

import Loading from '../../components/Loading';

import './styles.css';

const SurvivorsList = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [survivors, setSurvivors] = useState([]);

  useEffect(() => {
    async function loadSurvivor() {
      await api
        .get(`survivors/`)
        .then((response) => {
          setSurvivors(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Error connecting to the server');
          history.push('/');
        });
    }

    loadSurvivor();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="main">
        <section>
          <legend>Survivors List</legend>
          <div className="">
            {survivors.map((survivor) => {
              return (
                <article key={survivor.id} className="survivor-item">
                  <header>
                    <p>
                      <strong>Name: </strong>
                      {survivor.name}
                    </p>
                    <p>
                      <strong>Identification:</strong>{' '}
                      <span> {survivor.id}</span>{' '}
                    </p>
                  </header>
                  <p>
                    <strong>Infected:</strong>{' '}
                    {survivor.infected ? <span>True</span> : <span>False</span>}
                  </p>
                  <footer>
                    <p>
                      <strong>Last Location(Long/Lat): </strong>
                      {survivor.lonlat}
                    </p>
                  </footer>
                </article>
              );
            })}

            <Link to="/">
              <button type="button" className="button-primary">
                Back
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SurvivorsList;
