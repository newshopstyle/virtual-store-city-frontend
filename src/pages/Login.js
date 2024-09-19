import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.msg || 'Ошибка при входе');
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
