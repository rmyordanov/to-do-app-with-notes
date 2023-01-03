import { useEffect, useState } from "react";
import { updateTask } from "../../../api/data";
import styles from "./TaskTimer.module.css";

const TaskTimer = ({ task, totalTime, hour, min, getPause }) => {
  const [time, setTime] = useState(totalTime);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time / 3600) * 60 - hours * 60);
  const seconds = Math.floor(time % 60);

  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (time !== totalTime) {
      setTime(totalTime);
    }
  }, [totalTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pause) {
        setTime(prevState => {
          return prevState - 1;
        });
      }
    }, 1000);
    if (time === 0) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [pause]);

  const startTimer = e => {
    e.preventDefault();
    setPause(!pause);
    let clickStart = true;
    getPause(clickStart);
  };

  const stopTimer = e => {
    e.preventDefault();
    let clickStop = false;
    setPause(!pause);
    getPause(clickStop, e.target.className);

    updateTask(task._id, {
      durationH: hours,
      durationM: minutes,
      durationS: seconds,
    });
  };

  return (
    <div className={styles["task-duration"]}>
      <p>
        <span>Duration: </span>
        {`${hour ? `${hours < 10 ? `0${hours}` : hours}` : "00"}h : ${
          min ? `${minutes < 10 ? `0${minutes}` : minutes}` : "00"
        }min : ${seconds < 10 ? `0${seconds}` : seconds}sec`}
      </p>

      <div className={`${styles["action-btns"]} "play-and-stop-btns"`}>
        <a
          onClick={startTimer}
          href="#"
          data-tippy="Start Task"
          data-tippy-pos="up"
          className="play">
          <img src="/images/play-button (1).png" alt="" />
        </a>
        <a
          onClick={stopTimer}
          href="#"
          data-tippy="Stop Task"
          data-tippy-pos="up"
          className="stop">
          <img
            className={"stop-timer-btn"}
            src="/images/stop-button.png"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default TaskTimer;
