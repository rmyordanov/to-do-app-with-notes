import { updateNote, getOneNote, getUserData } from "../../api/data";
import styles from "./NoteEdit.module.css";
import { useState } from "react";

const NoteEdit = ({
  taskId,
  noteId,
  title,
  text,
  update,
  isEditOpen,
  getIsOpen,
}) => {
  const userData = getUserData();
  const [isOpen, setIsOpen] = useState(isEditOpen);

  const submitHandler = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const note = formData.get("title");
    const noteText = formData.get("noteText");

    try {
      if (note === "" || noteText === "") {
        throw new Error("No Empty Fileds");
      }

      updateNote(userData.uid, taskId, noteId, { note, noteText });

      const updateNoteData = await getOneNote(userData.uid, noteId);
      update(updateNoteData);
      e.target.reset();

      setIsOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  getIsOpen(isOpen);

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
              defaultValue={title}
            />
          </div>
          <div className={styles["edit-text"]}>
            <label>Note Text: </label>
            <div className={`${styles["text-area"]}`}>
              <textarea name="noteText" type="text" defaultValue={text} />
            </div>
          </div>
          <input
            className={`btn ${styles.editBtn}`}
            type="submit"
            value="Edit Note"
          />
        </form>
      </div>
    </div>
  );
};

export default NoteEdit;
