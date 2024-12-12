// src/app/complete-page/page.js
"use client";

import { useSearchParams} from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

const CompletePage = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('event_id');
  const eventUrl = `https://nomikaisan.com/event/${eventId}`;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>イベント作成完了</h1>
      <p className={styles.description}>
        参加者へ下記URLを共有し出欠を入力してもらいましょう！
      </p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={eventUrl}
          readOnly
          className={styles.input}
        />
      </div>
      <div className={styles.linkContainer}>
        <Link href={`/event/${eventId}`} className={styles.link}>
          イベントページへ
        </Link>
      </div>
    </div>
  );
};

export default CompletePage;
