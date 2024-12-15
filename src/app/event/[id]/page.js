// src/app/event/[id]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const EventPage = () => {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const statusMap = {
    0: '〇',
    1: '△',
    2: '×'
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/events/${params.id}`
        );

        if (!response.ok) {
          throw new Error('イベントの取得に失敗しました');
        }

        const data = await response.json();
        console.log('取得したデータ:', data);
        setEvent(data);
      } catch (error) {
        console.error('Error:', error);
        alert('イベントデータ取得中に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [params.id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!event) {
    return <div>イベントが見つかりません</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.information}>
        <h2 className={styles.eventTitle}>{event?.name}</h2>
        <button className={styles.eventEdit}>イベント編集</button>
      </div>

      <h2 className={styles.scheduleTitle}>■日程候補</h2>
      <p className={styles.scheduleNote}>
        ※各自の出欠状況を変更するには名前のリンクをクリックしてください。
      </p>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>日程</th>
              <th>〇</th>
              <th>△</th>
              <th>×</th>
            </tr>
          </thead>
          <tbody>
            {event?.event_dates.map((date, index) => (
              <tr key={index}>
                <td className={styles.dateCell}>
                  {new Date(date.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    weekday: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} ～
                </td>
                <td className={styles.countCell}>0</td>
                <td className={styles.countCell}>0</td>
                <td className={styles.countCell}>0</td>
              </tr>
            ))}
            <tr>
              <td>コメント</td>
              <td colSpan="3"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        className={styles.attendanceButton}
        onClick={() => setShowForm(!showForm)}
      >
        出欠入力をする
      </button>
    </div>
  );
};

export default EventPage;