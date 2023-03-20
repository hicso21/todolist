import axios from "axios";

export const fetchTodoAPI = axios.create({
    baseURL: "http://localhost:3000/todo",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
})