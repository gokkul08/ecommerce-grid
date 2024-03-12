import React from 'react';
import styles from '../styles/index.module.css';

const Modal = ({ imageUrl, closeModal }) => {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent}>
        <img src={imageUrl} alt="Large Product" />
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;