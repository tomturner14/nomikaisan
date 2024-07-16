"use client"
import Image from "next/image";
import styles from "./page.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import PropTypes from "prop-types"

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
      <div className="step1">
        <h4>STEP 1</h4>
        <h2>イベント名</h2>
        <input></input>
      </div>
      <div>
        <h4>STEP 2</h4>
        <h2>候補日</h2>
      </div>
      <div className="calendar">
        <>
          <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
            <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
          </nav>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="grid grid-cols-10">
              <div className="col-span-8">
                <FullCalendar
                  plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                  ]}
                  headerToolbar={{
                    left: 'prev, next today',
                    center: 'title',
                    right: 'resourceTimelineWook, dayGridMonth, timeGridWeek'
                  }}
                />
              </div>
            </div>
          </main>
        </>
      </div>
    </div>
  )
}

