"use client";

import { usePathname } from "next/navigation";

const EventPage = () => {
  const pathname = usePathname();

  const data = [
    { title: "イベントタイトル", date: "2024-07-30" },
    { title: "イベントタイトル", date: "2024-07-30" },
    { title: "イベントタイトル", date: "2024-07-30" },
  ];

  return (
    <div>
      <h1>イベントページ</h1>
      <p>{pathname}</p>
    </div>
  );
};

export default EventPage
