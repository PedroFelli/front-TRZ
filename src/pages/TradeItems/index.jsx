import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import ErrorMessage from '../../components/errorMessage';
import Select from '../../components/Select';
import Loading from '../../components/Loading';

import api from '../../services/api';

import './styles.css';

const TradeItems = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [survivor, setSurvivor] = useState('');

  const [survivors, setSurvivors] = useState([]);
  const { register, handleSubmit, errors, setValue } = useForm();
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
    async function loadSurvivors() {
      await api
        .get(`survivors/`)
        .then((response) => {
          setSurvivors(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.success('Error to load survivors');
          toast.error(error.response.data);
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

    loadSurvivors();
    loadItems();
    loadSurvivor();
  }, [id]);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="main">
        <section>
          <legend>
            Trade Item! <br />
            Payment:
          </legend>

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
          <legend>Recivers</legend>
          <div className="input-block">
            <label htmlFor="name">Find survivor</label>
            <Select
              name="gender"
              onChange={(e) => handleChangeSelect(e.target.value)}
              register={register({ required: true })}
              options={options}
            />
          </div>
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
          <div className="items-container">
            <Link to={`/survivor/${id}/report`}>
              <button type="button" className="button-primary action-button">
                Trade
              </button>
            </Link>
            <Link to="/">
              <button type="button" className="button-primary action-button">
                Back
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TradeItems;
