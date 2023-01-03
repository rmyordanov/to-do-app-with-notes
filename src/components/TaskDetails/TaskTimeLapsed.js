import { useEffect, useState } from "react";
import { updateTask } from "../../api/data";

const TaskTimeLapsed = ({ clicked, task, totalTime, targetClicked }) => {
  const [timeElapsed, setTimeElapsed] = useState(totalTime);

  let hours = Math.floor(timeElapsed / 3600);
  let minutes = Math.floor((timeElapsed / 3600) * 60 - hours * 60);
  let seconds = Math.floor(timeElapsed % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (clicked) {
        setTimeElapsed(prevState => {
          return prevState + 1;
        });
      }
    }, 1000);
    if (clicked == false) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [clicked]);

  if (clicked == false && targetClicked) {
    updateTask(task._id, {
      timeLapsedH: hours,
      timeLapsedM: minutes,
      timeLapsedS: seconds,
    });
  }
  return (
    <p>
      <span>Overall Duration:</span>
      {` ${hours < 10 ? `0${hours}` : hours}h : ${
        minutes < 10 ? `0${minutes}` : minutes
      }min : ${seconds < 10 ? `0${seconds}` : seconds}sec`}
    </p>
  );
};

export default TaskTimeLapsed;
