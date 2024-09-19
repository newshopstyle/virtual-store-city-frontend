import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Store() {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
        setStore(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/store/${id}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStore();
    fetchProducts();
  }, [id]);

  if (!store) return <div>Загрузка магазина...</div>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.description}</p>
      <h3>Товары:</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Цена: ${product.price}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} width="100" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Store;
