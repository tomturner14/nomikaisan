"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

const AttendanceForm = ({ event, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [attendances, setAttendances] = useState({});
  const [comment, setComment] = useState('');

  useEffect(() => {
    // 初期化：各日程の出欠状況をnullで設定
    const initialAttendances = {};
    event.event_dates.forEach(date => {
      initialAttendances[date.id] = null;
    });
    setAttendances(initialAttendances);
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }

    if (Object.values(attendances).some(status => status === null)) {
      alert('すべての日程で出欠を選択してください');
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

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.attendanceForm}>
        <h3>出欠を入力する</h3>
        
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
                {new Date(date.date).toLocaleString('ja-JP', {
                  month: 'numeric',
                  day: 'numeric',
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <div className={styles.statusButtons}>
                {[
                  { value: 0, label: '○' },
                  { value: 1, label: '△' },
                  { value: 2, label: '×' }
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

  const handleSubmitAttendance = async (formData) => {
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

  if (loading) return <div>読み込み中...</div>;
  if (!event) return <div>イベントが見つかりません</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{event.name}</h2>
        <button className={styles.editButton}>イベント編集</button>
      </div>

      <div className={styles.content}>
        <h3>■日程候補</h3>
        <p className={styles.note}>
          ※各自の出欠状況を変更するには名前のリンクをクリックしてください。
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>日程</th>
                <th>○</th>
                <th>△</th>
                <th>×</th>
              </tr>
            </thead>
            <tbody>
              {event.event_dates.map((date) => (
                <tr key={date.id}>
                  <td>
                    {new Date(date.date).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              ))}
              <tr>
                <td>コメント</td>
                <td colSpan={3}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className={styles.attendanceButton}
          >
            出欠を入力する
          </button>
        ) : (
          <AttendanceForm
            event={event}
            onSubmit={handleSubmitAttendance}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EventPage;