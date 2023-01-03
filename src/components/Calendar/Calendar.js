import { useState, useEffect } from "react";

import styles from "./Calendar.module.css";

const Calendar = ({ day, dayName, currentDay }) => {
  return (
    <div
      className={
        day !== currentDay
          ? `${styles.date} inline-block p-2 ease-in-out duration-300`
          : `${styles.date} ${styles.active} inline-block p-2 ease-in-out duration-300`
      }>
      <p>{day}</p>
      <p>{dayName}</p>
    </div>
  );
};

export default Calendar;
