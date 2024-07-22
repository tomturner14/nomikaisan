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
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { TextField } from "@mui/material";
import { Duplex } from "stream";

function Event(prop) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>All day event? {props.allday ? "Yes" : "No"}</p>
      <p>Starts on: {props.start.toString()}</p>
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
  const [value, setValue] = useState(dayjs());

  return (
    <div>
      <div className="steps">
        <div className="step1">
          <h4>STEP 1</h4>
          <h2>イベント名</h2>
          <input type="text" className="event-name"/>
        </div>
        <div className="step2">
          <h4>STEP 2</h4>
          <h2>候補日</h2>
        </div>
        <div className="date-section">
          <div className="calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="input-section">
            <div className="selected_date">
              <input type="text" className="selected-date-input"/>
            </div>
            <div className="memo">
              <input type="text" className="memo-input"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

