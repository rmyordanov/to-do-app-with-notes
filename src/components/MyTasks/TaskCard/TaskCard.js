import styles from "./TaskCard.module.css";

import { ItemTypes } from "../../../util";

import { useDrag } from "react-dnd";
import { getOneTask } from "../../../api/data";

import { useEffect, useState } from "react";

const TaskCard = ({
  categoryCardId,
  id,
  task,
  openTask,
  isCompleted,
  priority,
}) => {
  const [taskId, setTaskId] = useState(id);
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    const getTaskData = async () => {
      const data = await getOneTask(taskId);
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
    const taskData = await getOneTask(id);

    return taskData;
  };

  const clickHandler = e => {
    e.preventDefault();
    const isOpen = true;

    openTask(isOpen, taskId, getTask());
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
          <img className={"drag-btn"} src="/images/drag.png" alt="" />
        </a>
        <h3>{`${task.title.charAt(0).toUpperCase()}${task.title.slice(1)}`}</h3>
        <a
          href="#"
          data-tippy="Delete Task"
          data-tippy-pos="up"
          className="delete">
          <img src="/images/trash-bin.png" alt="" />
        </a>
      </div>
      <div className={styles["bottom-part"]}>
        <label>{task.priority}</label>
        <label>{task.startDate.split("-").reverse().join("-")}</label>
        <label>{task.startTime}</label>
      </div>
    </div>
  );
};
export default TaskCard;
