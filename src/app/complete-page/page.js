// src/app/complete-page/page.js

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const CompletePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>イベント作成完了</h1>
      <p className={styles.description}>参加者へ下記URLを共有し出欠を入力してもらいましょう！</p>
      <div className={styles.inputContainer}>
        <input type="text" value="https://nomikainittei.com" readOnly className={styles.input}/>
      </div>
      <div className={styles.linkContainer}>
        <h2 className={styles.link}>
          <Link href="/EventPage">イベントページへ</Link>
        </h2>
      </div>
    </div>
  );
};

export default CompletePage;
