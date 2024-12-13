"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const EventPage = () => {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/${eventId}`);
        if (!response.ok) {
          throw new Error('イベントの取得に失敗しました');
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error:', error);
        alert('イベントデータ取得中に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!event) {
    return <div>イベントが見つかりません</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{event.name}</h1>
      <div className={styles.dates}>
        {event.event_dates.map((date, index) => (
          <div key={index} className={styles.dateItem}>
            {new Date(date.date).toLocalDateString('ja-JP')}
          </div>
        ))}
      </div>
    </div>

  return (
    <div className={styles.body}>
      <div className={styles.information}>
        <h2 className={styles.eventTitle}>{eventTitles.title}</h2>
        <button className={styles.eventEdit}>イベント編集</button>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>日程</th>
              <th>参加者</th>
              <th>出欠</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{eventDates[index]}</td>
                <td>{participant.name}</td>
                <td>{participant.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className={styles.attendanceButton} onClick={toggleForm}>
          {showForm ? '閉じる' : '出欠入力を行う'}
        </button>
      </div>
      {showForm && (
        <div className={styles.attendanceForm}>
          <input type="text" placeholder="名前" className={styles.nameInput} />
          {eventDates.map((date, index) => (
            <div key={index} className={styles.dateOption}>
              <span>{date}</span>
              <button className={styles.attendanceOption}>〇</button>
              <button className={styles.attendanceOption}>△</button>
              <button className={styles.attendanceOption}>×</button>
            </div>
          ))}
          <textarea placeholder="コメント" className={styles.commentInput}></textarea>
          <button className={styles.submitButton}>入力する</button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
