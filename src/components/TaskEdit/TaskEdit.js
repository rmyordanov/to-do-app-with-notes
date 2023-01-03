import { useEffect, useState } from "react";

import { getOneTask, updateTask } from "../../api/data";
import styles from "./TaskEdit.module.css";

const TaskEdit = ({ task, isClose, update }) => {
  const [isOpen, setIsOpen] = useState(true);

  const submitHandler = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const durationH = formData.get("h");
    const durationM = formData.get("m");
    const durationS = formData.get("s");

    try {
      if (
        title === "" ||
        durationH === "" ||
        durationM === "" ||
        durationS === ""
      ) {
        throw new Error("No Empty Fileds");
      }

      updateTask(task._id, { title, durationH, durationM, durationS });

      const updateTaskData = await getOneTask(task._id);
      update(updateTaskData);
      e.target.reset();

      setIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    isClose(isOpen);
  }, [isOpen]);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className="close-btn">
        <a
          onClick={closeModalHandler}
          data-tippy="Close Task"
          data-tippy-pos="up"
          href="#"
          className={styles["close-btn"]}>
          X
        </a>
      </div>
      <div className={styles["to-do-title"]}>
        <form onSubmit={submitHandler} className={styles["edit-form"]}>
          <div className={styles["edit-text"]}>
            <label>Task Title:</label>
            <input
              className="add"
              type="text"
              name="title"
              defaultValue={task.title}
            />
          </div>
          <div className={styles["edit-text"]}>
            <label>Duration: </label>
            <div className={`${styles.duration} ${styles["duration-input"]}`}>
              <input
                id="h"
                name="h"
                type="number"
                min="0"
                max="24"
                defaultValue={task.durationH}
              />
              <label htmlFor="h">h</label>
              <input
                id="m"
                name="m"
                type="number"
                min="0"
                max="59"
                defaultValue={task.durationM}
              />
              <label htmlFor="m">min</label>
              <input
                id="s"
                name="s"
                type="number"
                min="0"
                max="59"
                defaultValue={task.durationS}
              />
              <label htmlFor="s">sec</label>
            </div>
          </div>
          <input
            className={`btn ${styles.editBtn}`}
            type="submit"
            value="Edit Task"
          />
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;
