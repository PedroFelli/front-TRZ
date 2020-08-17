import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ErrorMessage from '../../components/errorMessage';
import api from '../../services/api';

import './styles.css';

const Register = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    const items = [
      {
        item_id: 1,
        quantity: data.water,
      },
      {
        item_id: 2,
        quantity: data.campbellSoup,
      },
      {
        item_id: 3,
        quantity: data.firstAidPouch,
      },
      {
        item_id: 4,
        quantity: data.ak47,
      },
    ];

    data = { items, ...data };

    await api
      .post('survivors', data)
      .then((response) => {
        toast.success('Survivor successfully registered!');
        history.push('/');
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  }

  return (
    <div className="container">
      <div className="registerContainer">
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend>Register</legend>
            <div className="input-block">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                ref={register({ required: true, minLength: 5 })}
                placeholder="Name..."
              />
            </div>
            <ErrorMessage error={errors.name} />

            <div className="input-block">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age..."
                ref={register({ required: true, min: 18 })}
              />
            </div>
            <ErrorMessage error={errors.age} />
            <div className="input-block">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                ref={register({ required: true })}
              >
                <option value="" disabled defaultValue="selected">
                  Select your gender
                </option>
                <option value="1">Man</option>
                <option value="1">Woman</option>
              </select>
            </div>
            <ErrorMessage error={errors.gender} />
            <legend>Location</legend>
            <div className="resourcesGrid">
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
              <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input
                  placeholder="00.0000"
                  type="number"
                  name="longitude"
                  step="any"
                  ref={register({ required: true })}
                />
                <ErrorMessage error={errors.longitude} />
              </div>
            </div>

            <legend>Resources</legend>
            <div className="resourcesGrid">
              <div className="input-block">
                <label htmlFor="water">Fiji water</label>
                <input
                  type="number"
                  name="water"
                  defaultValue="0"
                  placeholder="0"
                  ref={register()}
                />
              </div>
              <div className="input-block">
                <label htmlFor="campbellSoup">Campbell soup</label>
                <input
                  type="number"
                  name="campbellSoup"
                  defaultValue="0"
                  placeholder="0"
                  ref={register()}
                />
              </div>
            </div>
            <div className="resourcesGrid">
              <div className="input-block">
                <label htmlFor="firstAidPouch">First aid pouch</label>
                <input
                  type="number"
                  name="firstAidPouch"
                  defaultValue="0"
                  placeholder="0"
                  ref={register()}
                />
              </div>
              <div className="input-block">
                <label htmlFor="ak47">AK47</label>
                <input
                  type="number"
                  name="ak47"
                  defaultValue="0"
                  placeholder="0"
                  ref={register()}
                />
              </div>
            </div>
            <button type="submit" className="button-primary">
              Register
            </button>
            <Link to="/">
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

export default Register;
