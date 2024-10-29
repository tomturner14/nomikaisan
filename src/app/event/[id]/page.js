"use client";

import { usePathname } from "next/navigation";
import { useState } from 'react';
import styles from './page.module.css';

const EventPage = () => {
  const pathname = usePathname();
  const eventId = pathname.split("/").pop();
  const [showForm, setShowForm] = useState(false);
  const [eventData, setEventData] = useState(null);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const eventDates = [
    "2024-07-30",
    "2024-08-05",
    "2024-08-12"
  ];

  const participants = [
    { name: "高橋", attendance: "〇" },
    { name: "佐藤", attendance: "×" },
    { name: "田中", attendance: "△" }
  ];

  const createEvent = async () => {
    const eventData = {
      event: {
        name: "イベント名",
        memo: "イベント詳細",
        url_id: "new-event"
      }
    };

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
      });
      const data = await response.json();
      console.log("Event created:", data);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const updateEvent = async () => {
    const updatedData = {
      event: {
        name: "更新されたイベント名",
        memo: "更新されたイベント詳細"
      }
    };

    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      console.log("Event updated:", data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = async () => {
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE"
      });
      console.log("Event deleted");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  }

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
