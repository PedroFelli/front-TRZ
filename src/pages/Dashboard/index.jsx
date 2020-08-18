import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Loading from '../../components/Loading';

import './styles.css';

const UpdateLocation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [survivor, setSurvivor] = useState('');
  const [items, setItems] = useState('');

  useEffect(() => {
    async function loadSurvivor() {
      await api
        .get(`survivors/${id}`)
        .then((response) => {
          setSurvivor(response.data);
        })
        .catch((error) => {
          toast.error(
            error.response?.data ? error.response.data : 'Error try again!'
          );
          setLoading(false);
        });
    }

    async function loadItems() {
      await api
        .get(`survivors/${id}/properties`)
        .then((response) => {
          setItems(response.data);

          setLoading(false);
        })
        .catch((error) => {
          toast.error(
            error.response?.data
              ? error.response.data
              : 'Error try again later.'
          );
          setLoading(false);
        });
    }

    loadItems();
    loadSurvivor();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="main">
        <section>
          <legend>Welcome {survivor.name}!</legend>
          <p>
            <strong>Status</strong>:{' '}
            {survivor.infected ? <span>Infected</span> : <span>Clear</span>}
          </p>
          <p>
            <strong>Last Location</strong>: {survivor.lonlat}
          </p>
          <legend>Resources</legend>
          <div className="items-container">
            {items.map((item) => {
              return (
                <p>
                  <strong>Item:</strong>
                  {item.Item.name} <strong>Quantity:</strong> {item.quantity}
                </p>
              );
            })}
          </div>
          <div className="items-container">
            <Link to={`/update-information/${id}`}>
              <button type="button" className="button-primary action-button">
                Update Information
              </button>
            </Link>
            <Link to={`/survivor/${id}/report`}>
              <button type="button" className="button-primary action-button">
                Flag survivor
              </button>
            </Link>
            <Link to="/">
              <button type="button" className="button-primary action-button">
                Trade items
              </button>
            </Link>
          </div>
          <Link to="/">
            <button type="button" className="button-primary">
              Back
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default UpdateLocation;
