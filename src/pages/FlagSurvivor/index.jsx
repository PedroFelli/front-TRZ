import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import api from '../../services/api';
import ErrorMessage from '../../components/errorMessage';
import Select from '../../components/Select';

import './styles.css';

const UpdateLocation = () => {
  const { id } = useParams();
  const { register, handleSubmit, errors, setValue } = useForm();
  const history = useHistory();

  const [survivors, setSurvivors] = useState([]);

  useEffect(() => {
    async function loadSurvivor() {
      await api
        .get(`survivors/`)
        .then((response) => {
          setSurvivors(response.data);
        })
        .catch((error) => {
          toast.success('Error to load survivors');
          toast.error(error.response.data);
        });
    }

    loadSurvivor();
  }, []);

  async function onSubmit(data) {
    await api
      .post(`report/${id}`, data)
      .then(() => {
        history.push(`/dashboard/${id}`);
        toast.success('Survivor has been flagged');
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  function handleChangeSelect(name) {
    const findSurvivor = survivors.find((survivor) => {
      if (survivor.name === name) return true;
    });

    setValue('infected_id', findSurvivor.id);
  }

  const options = [
    'Select..',
    ...survivors.map((survivor) => {
      return survivor.name;
    }),
  ];

  return (
    <div className="container">
      <div className="main">
        <section>
          <div className="buttonsContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-block">
                <label htmlFor="name">Find survivor</label>
                <Select
                  name="gender"
                  onChange={(e) => handleChangeSelect(e.target.value)}
                  register={register({ required: true })}
                  options={options}
                />
              </div>
              <ErrorMessage error={errors.gender} />

              <div className="input-block">
                <label htmlFor="name">Report user</label>
                <input
                  type="text"
                  name="infected_id"
                  placeholder="User you wanna flag"
                  ref={register({ required: true })}
                />
              </div>
              <ErrorMessage error={errors.infected_id} />

              <button type="submit" className="button-primary">
                Flag Survivor
              </button>
            </form>
            <Link to={`/dashboard/${id}/`}>
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

export default UpdateLocation;
