import styles from "./CategoryCard.module.css";

import TaskCard from "../TaskCard/TaskCard";

import { useRef } from "react";

import { useDrop } from "react-dnd";
import { ItemTypes } from "../../../util";
import { updateTask } from "../../../api/data";

const CategoryCard = ({
  id,
  moveItem,
  tasks,
  openTask,
  children,
  isCompleted,
  deleteCategory,
}) => {
  const categoryCard = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: item => {
      updateTask(item.id, { category: categoryCard.current.id });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  });

  moveItem(isOver);

  const deleteCategoryHandler = e => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to delete this category and all tasks in this category?"
    );
    let isDeleted;
    if (confirm) {
      isDeleted = true;
      deleteCategory(isDeleted, categoryCard.current.id);
      console.log(isDeleted);
    } else {
      isDeleted = false;
    }
  };

  return (
    <div
      ref={drop(categoryCard)}
      id={id}
      className={
        isOver
          ? `${styles["category-card"]}  ${styles.over}`
          : `${styles["category-card"]} ${styles.home}`
      }>
      <button onClick={deleteCategoryHandler} className={styles.deleteBtn}>
        X
      </button>
      <label>{children}</label>

      {tasks.map(task => {
        if (task.category.toLowerCase() === children.toLowerCase()) {
          return (
            <TaskCard
              key={task._id}
              id={task._id}
              task={task}
              openTask={openTask}
              isCompleted={isCompleted}
              priority={task.priority}
            />
          );
        }
      })}
    </div>
  );
};

export default CategoryCard;
