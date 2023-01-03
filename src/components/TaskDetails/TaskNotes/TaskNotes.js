import { useState } from "react";
import { deleteNote } from "../../../api/data";
import Modal from "../../Modal/Modal";
import Note from "../../NoteEdit/Note";
import styles from "./TaskNotes.module.css";

const TaskNotes = ({
  note,
  title,
  text,
  isCompleted,
  taskId,
  noteId,
  update,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);
  const [deletedNote, setDeletedNote] = useState(false);

  const exerpt = () => {
    if (text.length > 100) {
      text = text.substring(0, 100) + "...";
    }

    return text;
  };

  const updateNote = updatedData => {
    setUpdatedNote(updatedData);
    setIsUpdated(true);
  };

  const modalEditHandler = isOpen => {
    setIsOpenModal(isOpen);
  };

  const clickHandler = e => {
    e.preventDefault();

    if (e.target.className === "edit-note-img") {
      setIsEdit(true);
      setIsOpenModal(true);
    } else {
      setIsEdit(false);
    }

    if (e.target.className === "delete-note-img") {
      const choice = window.confirm(
        "Are you sure you want to delete this note?"
      );
      if (choice) {
        deleteNote(taskId, noteId);
        setDeletedNote(true);
      } else {
        return;
      }
    }

    setIsOpenModal(true);
  };

  update(isUpdated, updatedNote, deletedNote);

  return (
    <>
      <Modal open={isOpenModal}>
        <Note
          title={title}
          text={text}
          isClose={modalEditHandler}
          isEdit={isEdit}
          taskId={taskId}
          noteId={noteId}
          update={updateNote}
        />
      </Modal>

      <div
        onClick={clickHandler}
        className={
          isCompleted
            ? `${styles.overlay} ${styles.note} ${styles["note-card"]}`
            : `${styles.note} ${styles["note-card"]}`
        }>
        <div className={styles.text}>
          <h3>{title}</h3>
          <p>{exerpt()}</p>
        </div>
        <div className={styles["action-btns"]}>
          <a
            href="#"
            data-tippy="Edit Note"
            data-tippy-pos="up"
            className={`edit ${styles.edit}`}>
            <img
              className={"edit-note-img"}
              src="/images/edit (1).png"
              alt=""
            />
          </a>
          <a
            href="#"
            data-tippy="Delete Note"
            data-tippy-pos="up"
            className={`delete ${styles.delete}`}>
            <img
              className={"delete-note-img"}
              src="/images/trash-bin.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default TaskNotes;
