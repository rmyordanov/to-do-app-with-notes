import { Route, Routes } from "react-router-dom";

import "./App.css";
import { calendar, scrollEffect } from "./util.js";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CreateToDo from "./components/CreateToDo/CreateToDo";
import MyTasks from "./components/MyTasks/MyTasks";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateToDo />} />
        <Route
          path="/my-tasks"
          element={<MyTasks data={calendar()} actions={scrollEffect} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
