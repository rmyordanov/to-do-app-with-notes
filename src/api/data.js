import { remove, set, update, get } from "firebase/database";
import { rdb } from "./api-firebase-config";
import { ref } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

import { auth } from "./api-firebase-config";

import { v4 as uuidv4 } from "uuid";

//--------------CATEGORIES---------------
export async function getAllCategories(userId) {
  // const path = ref(rdb, "categories");
  const path = ref(rdb, `users/${userId}/categories`);
  let categories;
  // onValue(
  //   ref(path, snapshot => {
  //     const data = snapshot.val();
  //     categories = data;
  //   })
  // );
  const snapshot = await get(path);
  categories = snapshot.val();
  return categories;
}

export function createCategory(userId, category, data) {
  const id = uuidv4();
  // const path = ref(rdb, "categories/" + category);
  const path = ref(rdb, `users/${userId}/categories/${category}`);
  set(path, { ...data, _id: id });
}

export function deleteCategory(userId, categoryId) {
  // const path = ref(rdb, "categories/" + categoryId);
  const path = ref(rdb, `users/${userId}/categories/${categoryId}`);
  remove(path);
}

//--------------TASKS--------------------
export async function getAllTasks(userId) {
  // const path = ref(rdb, "tasks");
  const path = ref(rdb, `users/${userId}/tasks`);
  let tasks;
  // onValue(
  //   ref(path, snapshot => {
  //     const data = snapshot.val();
  //     tasks = data;
  //   })
  // );

  const snapshot = await get(path);
  tasks = snapshot.val();

  return tasks;
}

export async function getOneTask(userId, id) {
  // const path = ref(rdb, `tasks/${id}`);
  const path = ref(rdb, `users/${userId}/tasks/${id}`);
  let task;
  // onValue(
  //   ref(path, snapshot => {
  //     const data = snapshot.val();
  //     task = data;
  //   })
  // );
  const snapshot = await get(path);
  task = snapshot.val();

  return task;
}

export function createTask(userId, data) {
  const id = uuidv4();
  // const path = ref(rdb, "tasks/" + id);
  const path = ref(rdb, `users/${userId}/tasks/${id}`);
  set(path, { ...data, _id: id });
}

export function updateTask(userId, id, data) {
  // const path = ref(rdb, "tasks/" + id);
  const path = ref(rdb, `users/${userId}/tasks/${id}`);
  update(path, data);
}

export function deleteTask(userId, id) {
  // const path = ref(rdb, "tasks/" + id);
  const path = ref(rdb, `users/${userId}/tasks/${id}`);
  remove(path);
}

//--------------NOTES---------------
export async function getAllNotes(userId, taskId) {
  // const path = ref(rdb, `tasks/${taskId}/notes`);
  const path = ref(rdb, `users/${userId}/tasks/${taskId}/notes`);
  let notes;
  // onValue(
  //   ref(path, snapshot => {
  //     const data = snapshot.val();
  //     notes = data;
  //   })
  // );

  const snapshot = await get(path);
  notes = snapshot.val();

  return notes;
}

export async function getOneNote(userId, taskId, noteId) {
  // const path = ref(rdb, `tasks/${taskId}/${noteId}`);
  const path = ref(rdb, `users/${userId}/tasks/${taskId}/notes/${noteId}`);
  let note;
  // onValue(
  //   ref(path, snapshot => {
  //     const data = snapshot.val();
  //     note = data;
  //   })
  // );

  const snapshot = await get(path);
  note = snapshot.val();

  return note;
}

export function createNote(userId, taskId, data) {
  const id = uuidv4();
  // const path = ref(rdb, `tasks/${taskId}/notes/${id}`);
  const path = ref(rdb, `users/${userId}/tasks/${taskId}/notes/${id}`);
  set(path, { ...data, _id: id });
}

export function updateNote(userId, taskId, noteId, data) {
  // const path = ref(rdb, `tasks/${taskId}/notes/${noteId}`);
  const path = ref(rdb, `users/${userId}/tasks/${taskId}/notes/${noteId}`);
  update(path, data);
}

export function deleteNote(userId, taskId, noteId) {
  // const path = ref(rdb, `tasks/${taskId}/notes/${noteId}`);
  const path = ref(rdb, `users/${userId}/tasks/${taskId}/notes/${noteId}`);
  remove(path);
}

//---------LOGIN/REGISTER/LOGOUT-----------------
export async function login(email, password) {
  const authL = getAuth();
  try {
    const user = await signInWithEmailAndPassword(authL, email, password);

    return user;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export async function register(email, password, repass) {
  try {
    // if (email == "" || password == "") {
    //   throw new Error("No Empty Fields");
    // }
    // if (password != repass) {
    //   throw new Error("Password don't match");
    // }
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export async function logout() {
  await signOut(auth);
  sessionStorage.removeItem("userData");
}

//-------USERDATA---------
export function getUserData() {
  return JSON.parse(sessionStorage.getItem("userData"));
}

export function setUserData(user) {
  return sessionStorage.setItem("userData", JSON.stringify(user));
}

export function clearUserData() {
  return sessionStorage.removeItem("userData");
}

//----------SEARCH-------------
// export async function search(queryText, taskId) {
//   const path = query(
//     ref(rdb, `tasks/${taskId}/notes`),
//     orderByChild("note"),
//     // equalTo(queryText)
//     startAt(queryText.toUpperCase()),
//     endAt(queryText.toLowerCase() + "\uf8ff")
//   );
//   let result;
//   const snapshot = await get(path);
//   result = snapshot.val();

//   return result;
// }
