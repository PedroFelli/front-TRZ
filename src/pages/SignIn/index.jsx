import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import api from '../../services/api';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/errorMessage';

import './styles.css';

const Dashboard = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    setLoading(true);

    await api
      .get(`survivors/${data.id}`)
      .then(() => {
        history.push(`/dashboard/${data.id}`);
        toast.success('You are logged!');
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          error.response?.data ? error.response.data : 'Error try again!'
        );
        setLoading(false);
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="main">
        <section>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-block">
                <label className="text-strong" htmlFor="name">
                  Survivor ID:
                </label>
                <input
                  type="text"
                  name="id"
                  placeholder="Your identification.."
                  ref={register({ required: true })}
                />
              </div>
              <ErrorMessage error={errors.id} />

              <button type="submit" className="button-primary">
                Login
              </button>
            </form>
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

export default Dashboard;
