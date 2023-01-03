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
} from "../../api/data";

import Calendar from "../Calendar/Calendar";
import CategoryCard from "./CategoryCard/CategoryCard";
import TaskDetails from "../TaskDetails/TaskDetails";

const MyTasks = ({ data, actions }) => {
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
      createCategory(category);
      e.target.reset();
      getData();
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
      deleteTask(id);
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
      deleteCategory(category);
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const cData = await getAllCategories();
    const tData = await getAllTasks();

    setCategories(Object.keys(cData));
    setTasks(Object.values(tData));

    return cData, tData;
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

      <div className={`relative flex items-center px-10`}>
        <IoIosArrowDropleftCircle
          onClick={() => sliderAction.scrollLeftArrow("slider")}
          className="text-[#233cc1] cursor-pointer hover:text-lightpurple mr-5"
          size={40}
        />
        <div
          id="slider"
          className={`w-full h-full overflow-hidden whitespace-nowrap scroll-smooth`}>
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
          className="text-darkblue cursor-pointer hover:text-lightpurple ml-5"
          size={40}
        />
      </div>

      {/* <!--CATEGORY (KANBAN) CARDS--> */}

      <div className="kanban-container relative flex items-center px-10">
        <SlArrowLeft
          size={50}
          onClick={() => sliderAction.scrollLeftArrow("kanban-cards")}
          onDragOver={() => sliderAction.scrollLeftArrow("kanban-cards")}
          className="text-[#233cc1] cursor-pointer hover:text-lightpurple mr-5"
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
              <img className={"add-img-btn"} src="/images/plus.png" alt="" />
            </a>
          </div>
        </div>

        <SlArrowRight
          size={50}
          onClick={() => sliderAction.scrollRightArrow("kanban-cards")}
          onDragOver={() => sliderAction.scrollRightArrow("kanban-cards")}
          className="text-[#233cc1] cursor-pointer hover:text-lightpurple ml-5"
        />
      </div>
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
