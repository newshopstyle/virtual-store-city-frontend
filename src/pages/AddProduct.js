import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    store: '',
  });

  const [stores, setStores] = useState([]);

  const navigate = useNavigate();

  const { name, description, price, imageUrl, store } = formData;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/stores');
        setStores(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStores();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Пожалуйста, войдите в систему');
      return;
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      store,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate(`/store/${res.data.store}`);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg || 'Ошибка при добавлении товара');
    }
  };

  return (
    <div>
      <h2>Добавить Товар</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Название товара:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Описание:</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div>
          <label>Цена:</label>
          <input type="number" step="0.01" name="price" value={price} onChange={onChange} required />
        </div>
        <div>
          <label>URL изображения:</label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={onChange} />
        </div>
        <div>
          <label>Магазин:</label>
          <select name="store" value={store} onChange={onChange} required>
            <option value="">Выберите магазин</option>
            {stores.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Добавить Товар</button>
      </form>
    </div>
  );
}

export default AddProduct;
