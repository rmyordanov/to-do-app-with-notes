import styles from "./CreateToDo.module.css";

import { createTask, getAllCategories, getUserData } from "../../api/data";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/database";
import { useEffect, useState } from "react";

const CreateToDo = () => {
  const [categories, setCategories] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const timeIs = `${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;

  const today = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;

  const navigate = useNavigate();
  const userData = getUserData();
  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title").trim();
    const category = formData.get("category");
    const priority = formData.get("priority");
    const startTime = formData.get("time").trim();
    const startDate = formData.get("date").trim();
    let durationH = formData.get("h").trim();
    let durationM = formData.get("m").trim();
    let durationS = formData.get("s").trim();

    const data = {
      title,
      category,
      priority,
      startDate,
      startTime,
      durationH,
      durationM,
      durationS,
      craetedAt: serverTimestamp(),
      complete: false,
      _ownerId: userData.uid,
    };

    try {
      if (
        title === "" ||
        category === "" ||
        priority === "" ||
        startTime === "" ||
        startDate === ""
      ) {
        throw new Error("No Empty Fields!");
      }
      createTask(data);
      e.target.reset();
      navigate("/my-tasks");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories();
      setCategories(Object.keys(data));
    };
    getCategories();
  }, []);
  return (
    <>
      <div className={styles.create}>
        {/* <!--Title--> */}
        <div className="title">
          <h1>To Do's</h1>
        </div>

        {/* <!--Add Todo Form--> */}
        <div className="form">
          <form onSubmit={submitHandler}>
            <div className="addToDo">
              <input
                className="add"
                type="text"
                name="title"
                placeholder="Add to do..."
              />
              <input className="btn submitBtn" type="submit" value="Add" />
            </div>

            <div className={`${"actions"} ${styles.options}`}>
              <div className="actions">
                <label>Select Category</label>
                <div>
                  <select name="category" id="categories">
                    {categories.map(c => (
                      <option key={c} defaultValue={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="actions">
                <label>Select Priority: </label>
                <div>
                  <select name="priority" id="priorities">
                    <option defaultValue={"urgent"}>Urgent</option>
                    <option defaultValue={"high"}>High</option>
                    <option defaultValue={"medium"}>Medium</option>
                    <option defaultValue={"low"}>Low</option>
                  </select>
                </div>
              </div>

              <div className={styles.actions}>
                <label>Select Date:</label>
                <div>
                  <input
                    className={styles["duration-input"]}
                    type="date"
                    name="date"
                    defaultValue={today}
                    placeholder="Start Task at..."
                  />
                </div>
              </div>

              <div className={styles.actions}>
                <label>Select Time:</label>
                <div>
                  <input
                    className={styles["duration-input"]}
                    type="time"
                    name="time"
                    defaultValue={timeIs}
                    placeholder="Start Task at..."
                  />
                </div>
              </div>

              <div className={styles.actions}>
                <label>Duration:</label>
                <div
                  className={`${styles.duration} ${styles["duration-input"]}`}>
                  <input
                    id="h"
                    name="h"
                    type="number"
                    min="0"
                    max="24"
                    defaultValue={0}
                  />
                  <label htmlFor="h">h</label>
                  <input
                    id="m"
                    name="m"
                    type="number"
                    min="0"
                    max="59"
                    defaultValue={0}
                  />
                  <label htmlFor="m">min</label>
                  <input
                    id="s"
                    name="s"
                    type="number"
                    min="0"
                    max="59"
                    defaultValue={0}
                  />
                  <label htmlFor="s">sec</label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* // <!--NO TASKS CONTENT--> */}
        <div className={styles["no-tasks"]}>
          <h2>NO TASKS YET.</h2>
          <p>START YOUR FIRST ONE</p>
        </div>
      </div>
    </>
  );
};

export default CreateToDo;
