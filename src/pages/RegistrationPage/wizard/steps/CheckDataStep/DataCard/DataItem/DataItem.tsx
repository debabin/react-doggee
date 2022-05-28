import React from 'react';

import styles from './DataItem.module.css';

interface DataItemProps {
  data: string;
  label: string;
}

export const DataItem: React.FC<DataItemProps> = ({ label, data }) => (
  <div className={styles.data_body_item}>
    <div className={styles.data_body_item_label}>{label}</div>
    <div className={styles.data_body_item_content}>{data}</div>
  </div>
);
