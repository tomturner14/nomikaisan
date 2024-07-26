// src/complete/page.js

import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';

const CompletePage = () => {
  return (
    <div>
      <h1>イベント作成完了</h1>
      <p>参加者へ下記URLを共有し出欠を入力してもらいましょう！</p>
      <div>
        <input type="text" value="https://nomikainittei.com" readOnly/>
      </div>
      <div>
        <h2>
          <Link href="/EventPage">イベントページへ</Link>
        </h2>
      </div>
    </div>
  );
};

export default CompletePage;
