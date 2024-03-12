import React from 'react';
import styles from '../styles/index.module.css';

const ProductCard = ({ product, openModal }) => {
    console.log(product);
  return (
    <div className={styles.productCard} onClick={openModal}>
      <img src={product.image} alt={product.title} />
      <p>{product.title}</p>
    </div>
  );
};

export default ProductCard;