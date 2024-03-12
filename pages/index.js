import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import styles from '../styles/index.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [contents, setContents] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingContents, setLoadingContents] = useState(true);

  useEffect(() => {
    // Fetch product data
    axios.get('https://cx-interview-api.dev.ecmapps.com/products?page=hello-world')
      .then(response => {
        console.log('Products API Response:', response.data);

        // Check if response.data.products is an array or can be converted to an array
        const productsArray = Array.isArray(response.data.products)
          ? response.data.products
          : [response.data.products];
        setProducts(productsArray);
      })
      .catch(error => console.error('Error fetching products:', error))
      .finally(() => setLoadingProducts(false));

    // Fetch content data
    axios.get('https://cx-interview-api.dev.ecmapps.com/content?page=hello-world')
      .then(response => {
        console.log('Content API Response:', response.data);

        // Check if response.data.data is an array or can be converted to an array
        const contentsArray = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
          contentsArray.sort((a, b) => {
            const positionA = parseInt(a.position.split('-')[1]);
            const positionB = parseInt(b.position.split('-')[1]);
          
            return positionA - positionB;
          });  
        setContents(contentsArray);
      })
      .catch(error => console.error('Error fetching content:', error))
      .finally(() => setLoadingContents(false));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Render only when both products and contents are valid arrays
  if (loadingProducts || loadingContents) {
    return <p>Loading...</p>;
  }


  const combinedData = [];

  products.forEach((product) => {
    combinedData.push(
      <ProductCard
          key={`product-${product.product_id}`}
          product={product}
          openModal={() => openModal(product)}
        />
    )
  });

  contents.forEach((content) => {
    const element = (
      <div key={`content-${content.position}`} className={styles.fullRow}>
          <ContentRow content={content} />
        </div>
    )
    combinedData.splice((parseInt(content.position.split('-')[1]) - 1), 0, element)
  });

  console.log(combinedData);

  return (
    <div>
      <header>
        <h1>Products</h1>
      </header>

      <div className={styles.productGrid}>
        {combinedData}
      </div>

      {selectedProduct && (
        <Modal
          imageUrl={selectedProduct.image}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
