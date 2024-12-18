// src/app/event/[id]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const attendanceForm = ({ event, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [attendances, setAttendances] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    const initialAttendances = {};
    event.event_dates.forEach(date => {
      initialAttendances[date.id] = null;
    });
    setAttendances(initialAttendances);
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('名前を入力して下さい');
      return;
    }

    if (Object.values(attendances).some(status => status === null)) {
      alert('全ての日程で出欠を選択してください');
      return;
    }

    onSubmit({
      name,
      attendances: Object.entries(attendances).map(([dateId, status]) => ({
        event_date_id: dateId,
        status
      })),
      comment
    });
  };

  return(
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.attendanceForm}>
        <h3>出欠入力をする</h3>

        <div className={styles.inputGroup}>
          <label htmlFor="name">名前</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="名前を入力してください"
            required
            className={styles.nameInput}
          />
        </div>

        <div className={styles.datesContainer}>
          <h4>日程の検討</h4>
          {event.event_dates.map((date) => (
            <div key={date.id} className={styles.dateRow}>
              <span className={styles.dateLabel}>
                {new Date(date.date).toLocalString('ja-JP', {
                  month: 'numeric',
                  day: 'numeric',
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <div className={styles.statusButtons}>
                {[
                  { value: 0, label: '〇' },
                  { value: 1, label: '△' },
                  { value: 2, label: '×' },
                ].map(status => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setAttendances(prev => ({
                      ...prev,
                      [date.id]: status.value
                    }))}
                    className={`${styles.statusButton} ${
                      attendances[date.id] === status.value ? styles.selected : ''
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          ))}    
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="comment">コメント</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力してください（任意）"
            className={styles.commentInput}
          />  
        </div>

        <div className={styles.formButtons}>
          <button type="submit" className={styles.submitButton}>
            入力する
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

const EventPage = () => {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/events/${params.id}`
        );
        if (!response.ok) throw new Error('イベントの取得に失敗しました');
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleSubmitAttendance = async (FormData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/events/${params.id}/attendances`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ participant: formData }),
        }
      );

      if (!response.ok) throw new Error('出欠の登録に失敗しました');

      alert('出欠を登録しました');
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

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