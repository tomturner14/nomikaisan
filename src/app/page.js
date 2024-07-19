"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import PropTypes from "prop-types"
import "./globals.css";

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
  return (
    <div>
      <div className="steps">
        <div className="step1">
          <h4>STEP 1</h4>
          <h2>イベント名</h2>
          <input></input>
        </div>
        <div className="step2">
          <h4>STEP 2</h4>
          <h2>候補日</h2>
        </div>
      </div>
      <div className="calendar">
        <>
          <main className="main-content">
            <div className="calendar-grid">
              <div className="calendar">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                  ]}
                  headerToolbar={{
                    left: 'prev, next',
                    center: 'title'
                  }}
                  contentHeight="auto"
                  contentWidth="auto"

                />
              </div>
            </div>
          </main>
        </>
      </div>
      <div>
        <input className="date-input"></input>
      </div>
      <div>
        <input className="memo-input"></input>
      </div>
      <div className="generate">
        <button className="generate-event">出欠表作成</button>
      </div>
    </div>
  )
}

