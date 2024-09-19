import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer',
  });

  const navigate = useNavigate();

  const { username, email, password, role } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg || 'Ошибка при регистрации');
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Имя пользователя:</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <div>
          <label>Роль:</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="buyer">Покупатель</option>
            <option value="seller">Продавец</option>
          </select>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
