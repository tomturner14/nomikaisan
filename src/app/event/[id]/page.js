"use client";

import { usePathname } from "next/navigation";
import styles from './page.module.css';

const EventPage = () => {
  const pathname = usePathname();
  const eventId = pathname.split("/").pop();

  const event = {
    title: "イベントタイトル",
    date: "2024-07-30"
  };

  const participants = [
    { name: "高橋", attendance: "〇" },
    { name: "佐藤", attendance: "×" },
    { name: "田中", attendance: "△" }
  ];

  return (
    <div>
      <div className={styles.information}>
        <h2>{event.title}</h2>
        <p>{event.date}</p>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>参加者</th>
              <th>出欠</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr key={index}>
                <td>{participant.name}</td>
                <td>出欠: {participant.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventPage;
