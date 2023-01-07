import styles from "./TaskCard.module.css";

import { ItemTypes } from "../../../util";

import { useDrag } from "react-dnd";
import { getOneTask, getUserData, deleteTask } from "../../../api/data";

import { useEffect, useState } from "react";

const TaskCard = ({
  categoryCardId,
  id,
  task,
  openTask,
  isCompleted,
  priority,
  deletedTaskCard,
}) => {
  const userData = getUserData();
  const [taskId, setTaskId] = useState(id);
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    const getTaskData = async () => {
      const data = await getOneTask(userData.uid, taskId);
      setUpdatedTask(data);
    };
    getTaskData();
  }, [isCompleted]);

  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      id: id,
      categoryId: categoryCardId,
    },
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getTask = async () => {
    const taskData = await getOneTask(userData.uid, id);

    if (taskData !== null) {
      return taskData;
    } else {
      return updatedTask;
    }
  };

  const clickHandler = e => {
    e.preventDefault();
    let isOpen;

    if (e.target.className === "delete-img") {
      isOpen = false;

      let isDeleted;
      const choice = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (choice) {
        deleteTask(userData.uid, taskId);
        isDeleted = true;
      } else {
        isDeleted = false;
      }

      deletedTaskCard(isDeleted, taskId);
    } else {
      isOpen = true;
      openTask(isOpen, taskId, getTask());
    }

    setTaskId(id);
  };

  return (
    <div
      onClick={clickHandler}
      ref={drag}
      draggable={true}
      className={
        updatedTask.complete
          ? `${styles["task-card"]} ${styles.completed}`
          : `${styles["task-card"]} ${styles[priority.toLowerCase()]}`
      }
      style={{
        opacity: isDragging ? 0 : 1,
        fontSize: 16,
        fontWeight: "bold",
        cursor: "pointer",
      }}>
      <div
        className={`"drag-and-drop-action" ${styles["drag-and-drop-action"]}`}>
        <a
          href="#"
          data-tippy="Drag & Drop"
          data-tippy-pos="up"
          className="drag-btn">
          <img
            className={"drag-btn"}
            src="/react-firebase-to-do-app/images/drag.png"
            alt=""
          />
        </a>
        <h3>{`${task.title.charAt(0).toUpperCase()}${task.title.slice(1)}`}</h3>
        <a
          href="#"
          data-tippy="Delete Task"
          data-tippy-pos="up"
          className="delete">
          <img
            className="delete-img"
            src="/react-firebase-to-do-app/images/trash-bin.png"
            alt=""
          />
        </a>
      </div>
      <div className={styles["bottom-part"]}>
        <label className={styles.label}>{task.priority}</label>
        <label className={styles.label}>
          {task.startDate.split("-").reverse().join("-")}
        </label>
        <label className={styles.label}>{task.startTime}</label>
      </div>
    </div>
  );
};
export default TaskCard;
