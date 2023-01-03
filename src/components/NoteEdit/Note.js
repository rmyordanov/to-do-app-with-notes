import styles from "./Note.module.css";

import { useState, useEffect } from "react";

import NoteEdit from "./NoteEdit";

const Note = ({ title, text, isClose, isEdit, taskId, noteId, update }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    isClose(isOpen);
  }, [isOpen]);

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const getIsOpen = isOpen => {
    setIsOpen(isOpen);
  };

  return isEdit ? (
    <NoteEdit
      taskId={taskId}
      noteId={noteId}
      title={title}
      text={text}
      update={update}
      isEditOpen={isOpen}
      getIsOpen={getIsOpen}
    />
  ) : (
    <div className={`${styles.note} ${styles["note-card"]}`}>
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className={styles["action-btns"]}>
        <a
          onClick={closeModalHandler}
          href="#"
          data-tippy="Close Note"
          data-tippy-pos="up"
          className={`close ${styles.close}`}>
          X
        </a>
      </div>
    </div>
  );
};

export default Note;
