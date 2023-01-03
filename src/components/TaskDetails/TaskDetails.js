import React, { useEffect, useState } from "react";

import styles from "./TaskDetails.module.css";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { scrollEffect, createDate } from "../../util";
import { serverTimestamp } from "firebase/database";

import {
  createNote,
  deleteTask,
  getAllNotes,
  getOneTask,
  updateTask as update,
} from "../../api/data";

import TaskNotes from "./TaskNotes/TaskNotes";
import TaskTimer from "./TaskTimer/TaskTimer";
import TaskTimeLapsed from "./TaskTimeLapsed";
import Modal from "../Modal/Modal";
import TaskEdit from "../TaskEdit/TaskEdit";

export const TaskContext = React.createContext();

const TaskDetails = ({ id, task, getUpdatedTask }) => {
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [targetClicked, setTargetClicked] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const getPause = (click, clickedTarget) => {
    setClicked(click);
    setTargetClicked(clickedTarget);
  };

  const updateTask = updatedData => {
    setUpdatedTask(updatedData);
    setIsUpdated(true);
  };

  getUpdatedTask(isUpdated, isCompleted, isDeleted, updatedTask._id, isClosed);

  const completeTaskHandler = e => {
    e.preventDefault();

    if (e.target.className === `${styles.check}`) {
      setIsCompleted(true);
      update(updatedTask._id, {
        complete: true,
        completedAt: serverTimestamp(),
      });
    }
    if (e.target.className === `${styles.uncheck}`) {
      setIsCompleted(false);
      update(updatedTask._id, { complete: false, completedAt: "In Progress" });
    }

    const getUpdateTaskAfterComplete = async () => {
      const a = await getOneTask(updatedTask._id);
      setUpdatedTask(a);
    };

    getUpdateTaskAfterComplete();
  };

  const getNotes = async () => {
    const nData = await getAllNotes(task._id);
    if (nData === null || nData === undefined) {
      setNotes([]);
      return;
    }
    setNotes(Object.values(nData));
  };

  useEffect(() => {
    if (updatedTask.complete) {
      setIsCompleted(true);
    }

    getNotes();
  }, [
    task._id,
    task.durationH,
    task.durationM,
    task.durationS,
    clicked,
    isOpenModal,
    updatedTask,
  ]);

  const sliderAction = scrollEffect();

  const addNoteHandler = e => {
    e.preventDefault();

    setAddNote(true);
  };
  const cancelAddNoteHandler = e => {
    e.preventDefault();

    setAddNote(false);
  };

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const note = formData.get("note").trim();
    const noteText = formData.get("note-text").trim();

    try {
      if (note === "" || noteText === "") {
        throw new Error("No Empty Fields!");
      }
      createNote(id, { note, noteText });
      e.target.reset();
      getNotes();
    } catch (error) {
      alert(error.message);
    }
    e.target.reset();
  };

  const modalEditHandler = isOpen => {
    setIsOpenModal(isOpen);
  };

  const updateNotesHandler = (isUpdated, updatedNote, deletedNote) => {
    if (isUpdated) {
      getNotes();
    }

    if (deletedNote) {
      getNotes();
    }
  };

  const searchSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const queryText = formData.get("addNote");

    if (queryText === "") {
      return;
    }

    let searchResult = [];
    notes.forEach(note => {
      if (note.note.toLowerCase().includes(queryText.toLowerCase())) {
        searchResult.push(note);
      }
    });

    setNotes(Object.values(searchResult));
    setIsSearching(true);
    e.target.reset();
  };

  const closeSearchResultHandler = () => {
    setIsSearching(false);
    getNotes();
  };

  const deleteHandler = e => {
    e.preventDefault();
    const choice = window.confirm("Are you sure you want to delete this task?");
    if (choice) {
      setIsDeleted(true);
      console.log(updatedTask);
    }
  };

  return (
    <>
      <Modal key={updatedTask._id} open={isOpenModal}>
        <TaskEdit
          key={updatedTask._id}
          task={updatedTask}
          isClose={modalEditHandler}
          update={updateTask}
        />
      </Modal>
      {/* <!--TO DO CARD FOLDED--> */}

      <div
        className={
          isCompleted ? `${styles.card} ${styles.overlay}` : `${styles.card}`
        }>
        <div className={styles["top-part"]}>
          <div className="close-btn">
            <a
              onClick={() => setIsClosed(true)}
              data-tippy="Close Task"
              data-tippy-pos="up"
              href="#"
              className="close-btn font-bold">
              X
            </a>
          </div>
          <div className={styles["action-btns"]} onClick={completeTaskHandler}>
            <a
              href="#"
              data-tippy="Complete Task"
              data-tippy-pos="up"
              className={`check ${styles.check}`}>
              <img
                className={isCompleted ? styles.uncheck : styles.check}
                src="/images/checked.png"
                alt=""
              />
            </a>
            <a
              onClick={() => {
                setIsOpenModal(true);
              }}
              href="#"
              data-tippy="Edit Task"
              data-tippy-pos="up"
              className="edit">
              <img src="/images/edit (1).png" alt="" />
            </a>
            <a
              onClick={deleteHandler}
              href="#"
              data-tippy="Delete Task"
              data-tippy-pos="up"
              className={`delete ${styles.delete}`}>
              <img
                className={`delete-note-img" ${styles.delete}`}
                src="/images/trash-bin.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className={styles["to-do-title"]}>
          <h2>
            {updatedTask.title
              ? `${updatedTask.title
                  .charAt(0)
                  .toUpperCase()}${updatedTask.title.slice(1)}`
              : ""}
          </h2>
        </div>

        {updatedTask.durationH || updatedTask.durationM ? (
          <TaskTimer
            task={updatedTask}
            key={updatedTask._id}
            totalTime={
              updatedTask.durationS
                ? Math.floor(
                    (+updatedTask.durationH * 60 + +updatedTask.durationM) * 60
                  ) + +updatedTask.durationS
                : Math.floor(
                    (+updatedTask.durationH * 60 + +updatedTask.durationM) * 60
                  )
            }
            hour={updatedTask.durationH}
            min={updatedTask.durationM}
            getPause={getPause}
          />
        ) : (
          ""
        )}

        {notes.length !== 0 ? (
          <div className={styles["note-cards"]}>
            <SlArrowLeft
              size={50}
              onClick={() => sliderAction.scrollLeftArrow("notes-slider")}
              className="text-[#233cc1] cursor-pointer hover:text-lightpurple mr-5"
            />
            <div
              onClick={e => {
                if (e.target.className === "add-img-btn") {
                  addNoteHandler(e);
                } else if (
                  e.target.tagName !== "INPUT" &&
                  e.target.tagName !== "TEXTAREA"
                ) {
                  cancelAddNoteHandler(e);
                }
              }}
              id="notes-slider"
              className={`${styles["notes-slider"]} w-full h-full overflow-hidden scroll-smooth`}>
              {isSearching ? (
                <div className="search-result">
                  <div className="search-result-top-part">
                    <h3>Search Results:</h3>
                    <button
                      onClick={closeSearchResultHandler}
                      className={"btn"}>
                      Back
                    </button>
                  </div>
                  <div className={styles["search-notes"]}>
                    {notes.map(note => (
                      <TaskNotes
                        key={note._id}
                        title={note.note}
                        text={note.noteText}
                        isCompleted={isCompleted}
                        taskId={updatedTask._id}
                        noteId={note._id}
                        note={note}
                        update={updateNotesHandler}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                notes.map(note => (
                  <TaskNotes
                    key={note._id}
                    title={note.note}
                    text={note.noteText}
                    isCompleted={isCompleted}
                    taskId={updatedTask._id}
                    noteId={note._id}
                    note={note}
                    update={updateNotesHandler}
                  />
                ))
              )}

              {isSearching ? (
                ""
              ) : (
                <div
                  className={`${styles["add-plus-note-btn"]} add-category-btn flex items-center m-auto`}>
                  <form
                    onSubmit={submitHandler}
                    className={
                      addNote
                        ? `${styles["fade-in"]} ${styles.show}`
                        : `${styles["fade-in"]}`
                    }>
                    <h3>Add Note</h3>
                    <input
                      className={styles.addNoteInput}
                      type="text"
                      placeholder="Note Title"
                      name="note"
                    />

                    <textarea
                      className={styles.addNoteInput}
                      rows="5"
                      cols="33"
                      placeholder="Note Details..."
                      name="note-text"
                    />

                    <div className={styles.btns}>
                      <input
                        className={"btn"}
                        type="submit"
                        value="Create Note"
                      />
                      <button
                        onClick={e => cancelAddNoteHandler(e)}
                        className={"btn"}>
                        Cancel
                      </button>
                    </div>
                  </form>

                  <a
                    data-tippy="Add Note"
                    data-tippy-pos="up"
                    href=""
                    className={
                      !addNote
                        ? `add-plus-btn ${styles["fade-in"]} ${styles.show}`
                        : `add-plus-btn ${styles["fade-in"]}`
                    }>
                    <img
                      className={"add-img-btn"}
                      src="/images/plus.png"
                      alt=""
                    />
                  </a>
                </div>
              )}
            </div>
            <SlArrowRight
              size={50}
              onClick={() => sliderAction.scrollRightArrow("notes-slider")}
              className="text-[#233cc1] cursor-pointer hover:text-lightpurple ml-5"
            />
          </div>
        ) : (
          <div className={`flex justify-center w-1/2 m-auto`}>
            <form onSubmit={submitHandler}>
              <input
                className={styles.addNoteInput}
                type="text"
                placeholder="Note Title"
                name="note"
              />

              <textarea
                className={styles.addNoteInput}
                rows="5"
                cols="33"
                placeholder="Note Details..."
                name="note-text"
              />

              <input className={"btn"} type="submit" value="Create Note" />
            </form>
          </div>
        )}

        <form onSubmit={searchSubmitHandler} className={styles.search}>
          <div className={`search ${styles.addNote}`}>
            <input
              className="add"
              type="text"
              name="addNote"
              placeholder="Search Notes..."
            />

            <input className="btn submitBtn" type="submit" value="Search" />
          </div>
        </form>

        <div className={styles["overall-task-duration"]}>
          <p>
            <span>Task Created:</span> {createDate(updatedTask.craetedAt)}
          </p>
          <TaskTimeLapsed
            key={task._id}
            clicked={clicked}
            targetClicked={targetClicked}
            task={task}
            totalTime={
              task.timeLapsedH || task.timeLapsedM || task.timeLapsedS
                ? Math.floor(
                    (+task.timeLapsedH * 60 + +task.timeLapsedM) * 60
                  ) + +task.timeLapsedS
                : 0
            }
          />
          <p>
            <span>Task Completed:</span>{" "}
            {updatedTask.completedAt &&
            updatedTask.completedAt !== "In Progress"
              ? createDate(updatedTask.completedAt)
              : "In Progress"}
          </p>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
