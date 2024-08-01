"use client";

import { usePathname } from "next/navigation";

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
      <div>
        <h2>{event.title}</h2>
        <p>{event.date}</p>
      </div>
      <div>
        <h3>参加者</h3>
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>
              <p>名前: {participant.name}</p>
              <p>出欠: {participant.attendance}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventPage;
