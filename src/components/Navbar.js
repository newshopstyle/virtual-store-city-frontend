import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
      <li><Link to="/">Главная</Link></li>
        <li><Link to="/login">Вход</Link></li>
        <li><Link to="/register">Регистрация</Link></li>
        <li><Link to="/create-store">Создать Магазин</Link></li>
        <li><Link to="/add-product">Добавить Товар</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
