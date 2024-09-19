import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateStore() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longitude: '',
    latitude: '',
  });

  const navigate = useNavigate();

  const { name, description, longitude, latitude } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    const storeData = {
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/stores', storeData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate(`/store/${res.data._id}`);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg || 'Ошибка при создании магазина');
    }
  };

  return (
    <div>
      <h2>Создать Магазин</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Название магазина:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Описание:</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Долгота:</label>
          <input type="number" step="0.0001" name="longitude" value={longitude} onChange={onChange} required />
        </div>
        <div>
          <label>Широта:</label>
          <input type="number" step="0.0001" name="latitude" value={latitude} onChange={onChange} required />
        </div>
        <button type="submit">Создать Магазин</button>
      </form>
    </div>
  );
}

export default CreateStore;
