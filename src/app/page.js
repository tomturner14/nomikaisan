"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect, useState } from 'react';
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
  const [value, setValue] = useState(dayjs().locale('ja'));
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateClick = (newValue) => {
    setValue(newValue);
    const formattedDate = newValue.locale('ja').format('M月D日 (ddd)');
    if (!selectedDates.includes(formattedDate)) {
      setSelectedDates([...selectedDates, formattedDate]);
    }
  };

  return (
    <div>
      <div className="steps">
        <div className="step-container step1">
         <h4 className="step-number">STEP 1</h4>
         <div className="step-content">
          <h2>イベント名</h2>
          <input type="text" className="event-name"/>
        </div>
      </div>
      <div className="step-container step2">
        <h4 className="step-number">STEP 2</h4>
        <div className="step-content">
          <h2>候補日</h2>
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
                <textarea className="selected-date-input" value={selectedDates.join('\n')} readOnly/>
              </div>
            </div>
          </div>
        </div>
          <div className="generate-section">
            <h2 className="generate-button">
              <Link href="/complete-page">出欠表作成</Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
