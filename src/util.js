import { getUserData } from "./api/data.js";

//Create Calendar
export const calendar = () => {
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getDayName = (year, month, day) => {
    let newDay;
    if (day < 10) {
      newDay = "0" + day;
    } else {
      newDay = day;
    }
    const date = year + "-" + month + "-" + newDay;

    return new Date(date).toLocaleString("defaut", {
      weekday: "short",
    });
  };

  const createCalendar = () => {
    const date = new Date();
    const monthName = date.toLocaleString("default", { month: "long" });

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    return {
      daysInCurrentMonth,
      currentDay,
      monthName,
      currentYear,
      currentMonth,
    };
  };

  const data = createCalendar();

  let days = [];

  for (let i = 1; i <= data.daysInCurrentMonth; i++) {
    const getDay = getDayName(data.currentYear, data.currentMonth, i);
    days.push([i, getDay]);
  }

  return {
    days,
    currentMonth: data.currentDay,
    monthName: data.monthName,
    currentDay: data.currentDay,
    currentYear: data.currentYear,
  };
};

//Scroll left and right with arrow buttons
export const scrollEffect = () => {
  const scrollLeftArrow = id => {
    let element = document.getElementById(id);
    element.scrollLeft = element.scrollLeft - 500;
  };

  const scrollRightArrow = id => {
    let element = document.getElementById(id);
    element.scrollLeft = element.scrollLeft + 500;
  };

  let scrolling = {
    scrollLeftArrow,
    scrollRightArrow,
  };
  return scrolling;
};

//Update user nav

export const updateUserNav = () => {
  const userData = getUserData();
  if (userData) {
    document.querySelector(".user").style.display = "inline-block";
    document.querySelector(".guest").style.display = "none";
    document.querySelector(
      ".welcome-msg span"
    ).textContent = `Welcome, ${userData.email}`;
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "inline-block";
    document.querySelector(".welcome-msg span").textContent = "";
  }
};

export const ItemTypes = {
  CARD: "card",
};

//Crate Data
export const createDate = timestamp => {
  const date = new Date(timestamp);
  const createdDate = `${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;

  return createdDate;
};
