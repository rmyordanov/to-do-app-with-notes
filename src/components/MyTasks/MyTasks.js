import { v4 as uuidv4 } from "uuid";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { useEffect, useState } from "react";

import styles from "./MyTasks.module.css";
import {
  createCategory,
  getAllCategories,
  getAllTasks,
  deleteTask,
  deleteCategory,
  getUserData,
} from "../../api/data";

import Calendar from "../Calendar/Calendar";
import CategoryCard from "./CategoryCard/CategoryCard";
import TaskDetails from "../TaskDetails/TaskDetails";
import { Link } from "react-router-dom";

const MyTasks = ({ data, actions }) => {
  const userData = getUserData();
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [taskDetailsData, setTaskDetailsData] = useState({});
  const [taskId, setTaskId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const sliderAction = actions();

  const addCategoryHandler = e => {
    e.preventDefault();

    setAddCategory(true);
  };
  const cancelAddCategoryHandler = e => {
    e.preventDefault();

    setAddCategory(false);
  };

  const submitHandler = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const category = formData.get("category").trim();

    try {
      if (category == "") {
        throw new Error("No Empty Fields!");
      }

      if (userData.uid) {
        createCategory(userData.uid, category);
        e.target.reset();
        getData();
      } else {
        throw new Error("You need to login or register");
      }
    } catch (error) {
      alert(error.message);
    }
    e.target.reset();
  };

  const moveItem = isOver => {
    if (isOver) {
      getData();
    }
  };

  const getUpdatedTask = (isUpdated, isCompleted, isDeleted, id, isCLosed) => {
    if (isUpdated) {
      getData();
    }

    if (isCompleted) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }

    if (isDeleted) {
      deleteTask(userData.uid, id);
      setShowTaskDetails(false);
      getData();
    }

    if (isCLosed) {
      setShowTaskDetails(false);
    }
  };

  const openTaskDetailsHandler = async (isOpen, id, clickedTask) => {
    if (isOpen) {
      setShowTaskDetails(true);
    } else {
      setShowTaskDetails(false);
    }

    const taskData = await clickedTask;
    setTaskDetailsData(taskData);

    setTaskId(id);
  };

  const deleteCategoryHandler = (isDeleted, category) => {
    if (isDeleted) {
      deleteCategory(userData.uid, category);
      const tasks = async () => {
        const tasks = await getData();
        const deleteTasks = Object.values(tasks).filter(
          task => task.category === category
        );
        deleteTasks.forEach(task => {
          deleteTask(task._id);
        });
      };
      tasks();

      setShowTaskDetails(false);
      getData();
    }
  };

  const deletedTaskCard = (isDeleted, deletedTask) => {
    if (isDeleted) {
      if (deletedTask === taskId) {
        setShowTaskDetails(false);
      }

      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (userData.uid) {
      const cData = await getAllCategories(userData.uid);
      const tData = await getAllTasks(userData.uid);

      if (cData && tData) {
        setCategories(Object.keys(cData));
        setTasks(Object.values(tData));

        return cData, tData;
      }
    } else {
      return;
    }
  };

  return (
    <>
      {/* <!--CALENDAR--> */}
      <div className={styles.monthName}>
        <h3
          className={`text-sm bg-darkblue w-[250px] m-auto text-white p-1 rounded-2xl my-10 font-semibold`}>
          {data.monthName} {data.currentYear}
        </h3>
      </div>

      <div className={`${styles["calendar-arrow"]} relative flex items-center`}>
        <IoIosArrowDropleftCircle
          onClick={() => sliderAction.scrollLeftArrow("slider")}
          className="text-[#233cc1] cursor-pointer hover:text-lightpurple mr-2.5"
          size={40}
        />
        <div
          id="slider"
          className={`${styles["calendar-slider"]} w-full h-full overflow-hidden whitespace-nowrap scroll-smooth`}>
          {data.days.map(day => (
            <Calendar
              key={uuidv4()}
              day={day[0]}
              dayName={day[1]}
              currentDay={data.currentDay}
            />
          ))}
        </div>
        <IoIosArrowDroprightCircle
          onClick={() => sliderAction.scrollRightArrow("slider")}
          className="text-darkblue cursor-pointer hover:text-lightpurple ml-2.5"
          size={40}
        />
      </div>

      {/* <!--CATEGORY (KANBAN) CARDS--> */}

      {categories.length > 0 ? (
        <div
          className={`${styles["kanban-container"]} relative flex items-center`}>
          <SlArrowLeft
            size={30}
            onClick={() => sliderAction.scrollLeftArrow("kanban-cards")}
            onDragOver={() => sliderAction.scrollLeftArrow("kanban-cards")}
            className={`text-[#233cc1] cursor-pointer hover:text-lightpurple mr-2.5 ${styles["card-arrow"]}`}
          />

          <div
            id="kanban-cards"
            onClick={e => {
              if (e.target.className === "add-img-btn") {
                addCategoryHandler(e);
              } else if (e.target.tagName !== "INPUT") {
                cancelAddCategoryHandler(e);
              }
            }}
            onDrop={moveItem}
            className={`${styles["category-cards"]} w-full h-full overflow-hidden scroll-smooth`}>
            {categories.map(c => (
              <CategoryCard
                key={c}
                id={c}
                tasks={tasks}
                moveItem={moveItem}
                openTask={openTaskDetailsHandler}
                deleteCategory={deleteCategoryHandler}
                deletedTaskCard={deletedTaskCard}
                isCompleted={isCompleted}>
                {`${c.charAt(0).toUpperCase()}${c.slice(1)}`}
              </CategoryCard>
            ))}

            <div className={`${styles["add-category-btn"]} flex`}>
              <form
                onSubmit={submitHandler}
                className={
                  addCategory
                    ? `${styles["fade-in"]} ${styles.show}`
                    : `${styles["fade-in"]}`
                }>
                <h3>Add Category</h3>
                <input
                  className={styles.addCategoryInput}
                  type="text"
                  name="category"
                />
                <div className={styles.btns}>
                  <input
                    className={"btn"}
                    type="submit"
                    value="Create Category"
                  />
                  <button
                    onClick={e => cancelAddCategoryHandler(e)}
                    className={"btn"}>
                    Cancel
                  </button>
                </div>
              </form>

              <a
                data-tippy="Add Category"
                data-tippy-pos="up"
                href=""
                className={
                  !addCategory
                    ? `add-plus-btn ${styles["fade-in"]} ${styles.show}`
                    : `add-plus-btn ${styles["fade-in"]}`
                }>
                <img
                  className={"add-img-btn"}
                  src="/react-firebase-to-do-app/images/plus.png"
                  alt=""
                />
              </a>
            </div>
          </div>

          <SlArrowRight
            size={30}
            onClick={() => sliderAction.scrollRightArrow("kanban-cards")}
            onDragOver={() => sliderAction.scrollRightArrow("kanban-cards")}
            className={`text-[#233cc1] cursor-pointer hover:text-lightpurple ml-2.5 ${styles["card-arrow"]}`}
          />
        </div>
      ) : (
        <div className={styles["no-tasks"]}>
          <h2>NO TASKS YET.</h2>
          <Link to="/create">
            <button className="btn">CREATE YOUR FIRST ONE</button>
          </Link>
        </div>
      )}
      {showTaskDetails ? (
        <TaskDetails
          key={taskId}
          id={taskId}
          task={taskDetailsData}
          getUpdatedTask={getUpdatedTask}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyTasks;
