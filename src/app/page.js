"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import PropTypes from "prop-types"
import "./globals.css";
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import updateLocale from 'dayjs/plugin/updateLocale';
import { TextField } from "@mui/material";
import { Duplex } from "stream";
import Link from "next/link";
import { isUndefined } from "util";

dayjs.extend(updateLocale);

dayjs.updateLocale('ja', {
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
});

function Event(prop) {
  return (
    <div>
      <h2>{prop.title}</h2>
      <p>All day event? {prop.allday ? "Yes" : "No"}</p>
      <p>Starts on: {prop.start.toString()}</p>
    </div>
  );
}

Event.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
  ]).isRequired,
  allday: PropTypes.bool
};

Event.defaultProps = {
  allday: false
}

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState(dayjs().locale('ja'));
  const [selectedDates, setSelectedDates] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [eventName, setEventName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateClick = (newValue) => {
    setValue(newValue);
    const formattedDate = newValue.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    if (!selectedDates.includes(formattedDate)) {
      const newSelectedDates = [...selectedDates, formattedDate];
      setSelectedDates(newSelectedDates);
      setInputValue(newSelectedDates.map(date =>
        dayjs(date).format('M月D日 (ddd)')
      ).join('\n'));
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSelectedDates(newValue.split('\n').filter(date => date.trim() !== ''));
  };

  const createEvent = async () => {
    if (!eventName || selectedDates.length === 0) {
      alert('イベント名と候補日を入力してください。');
      return;
    }

    setIsSubmitting(true);

    try {
      const eventData = {
        event: {
          name: eventName,
          url_id: crypto.randomUUID().slice(0, 8),  //ここでユニークURLを作ってる
          memo: "",
          event_dates_attributes: selectedDates.map(dateStr => ({
            date: dateStr
          }))
        }
      };

      console.log('Sending data:', eventData);

      const response = await fetch("http://localhost:3001/api/v1/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
      });

      console.log('response:', response.json());

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      router.push(`/complete-page?event_id=${data.event.url_id}`);

    } catch (error) {
      console.error("イベント作成中にエラーが発生しました", error);
      alert('イベントの作成に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="steps">
        <div className="step-container step1">
         <h4 className="step-number">STEP 1</h4>
         <div className="step-content">
          <h2>イベント名</h2>
          <input
            type="text"
            className="event-name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
      </div>
      <div className="step-container step2">
        <div className="step-header">
          <h4 className="step-number">STEP 2</h4>
          <h2 className="step-title">候補日</h2>
        </div>
        <div className="step-content">
          <div className="date-section">
            <div className="calendar">
              <LocalizationProvider dateAdapter={AdapterDayjs} locale="ja">
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={value}
                  onChange={(newValue) => handleDateClick(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  renderDay={(day, _value, DayComponentProps) => {
                    return (
                      <div onClick={() => handleDateClick(day)}>
                        <PickersDay {...DayComponentProps} />
                      </div>
                    );
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="date-input-section">
              <div className="selected_date">
                <h3>選択済み候補日</h3>
                <textarea
                  className="selected-date-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="候補日がここに表示されます"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="generate-section">
      <button
        className="generate-button"
        onClick={createEvent}
        disabled={isSubmitting}
        >
          {isSubmitting ? '作成中...' : '出欠表作成'}
        </button>
    </div>
  </div>
  );
}
