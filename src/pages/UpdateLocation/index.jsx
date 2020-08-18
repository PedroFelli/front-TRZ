import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import splitString from '../../util/replaceGeoPoint';

import ErrorMessage from '../../components/errorMessage';
import api from '../../services/api';

import './styles.css';

const UpdateLocation = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    async function loadSurvivor() {
      const response = await api.get(`survivors/${id}`);

      setValue('identification', response.data.id);
      setValue('name', response.data.name);
      setValue('age', response.data.age);
      setValue('gender', response.data.gender);

      const lonlat = splitString(response.data.lonlat);

      setValue('latitude', lonlat[1]);
      setValue('longitude', lonlat[0]);
    }
    loadSurvivor();
  }, []);

  async function onSubmit(data) {
    try {
      await api.put(`survivors/${id}`, data);
      toast.success('Profile updated successfully.');
      history.push(`/dashboard/${id}`);
    } catch (err) {
      toast.error('Error trying again.');
    }
  }

  return (
    <div className="container">
      <div className="main">
        <section>
          <h1>Update Information</h1>
          <div className="input-block">
            <label htmlFor="">Identification</label>
            <input
              type="text"
              name="identification"
              disabled
              ref={register()}
            />
          </div>

          <div className="input-block">
            <label htmlFor="">Name</label>
            <input type="text" name="name" disabled ref={register()} />
          </div>

          <div className="input-block">
            <label htmlFor="age">Age</label>
            <input type="number" name="age" disabled ref={register()} />
          </div>
          <div className="input-block">
            <label htmlFor="gender">Gender</label>
            <input type="text" name="gender" disabled ref={register()} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="resourcesGrid">
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input
                  placeholder="00.0000"
                  type="number"
                  name="longitude"
                  step="any"
                  ref={register({ required: true })}
                />
                <ErrorMessage error={errors.latitude} />
              </div>
              <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input
                  placeholder="00.0000"
                  type="number"
                  name="latitude"
                  step="any"
                  ref={register({ required: true })}
                />
                <ErrorMessage error={errors.latitude} />
              </div>
            </div>
            <button type="submit" className="button-primary">
              Save
            </button>

            <Link to={`/dashboard/${id}/`}>
              <button type="button" className="button-primary">
                Back
              </button>
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default UpdateLocation;
