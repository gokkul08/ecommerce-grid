import React from 'react';
import styles from '../styles/index.module.css';

const ContentRow = ({ content }) => {
    console.log(content);
  return (
    <div className={`${styles.contentRow} ${content.position}`}>
      <div dangerouslySetInnerHTML={{ __html: content.contents }} />
    </div>
  );
};

export default ContentRow;