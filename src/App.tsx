import { useState } from "react";
import { TaskType, TodolistItem } from "./components/TodoListItem";
import { v1 } from "uuid";
import "./App.css";

export type FilterValue = "all" | "active" | "completed";

export const App = () => {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredTask = (): TaskType[] => {
    let filteredTasks = tasks;
    if (filter === "active") {
      filteredTasks = tasks.filter((t) => !t.isDone);
    }
    if (filter === "completed") {
      filteredTasks = tasks.filter((t) => t.isDone);
    }
    return filteredTasks;
  };

  const changeFilter = (filter: FilterValue) => {
    setFilter(filter);
  };

  const deleteTasks = (taskId: string) => {
    const deleteTask = tasks.filter((t) => t.id !== taskId);
    setTasks(deleteTask);
  };

  const createTasks = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone } : t)));
  };

  return (
    <TodolistItem
      title={"Todolist"}
      filter={filter}
      tasks={filteredTask()}
      deleteTasks={deleteTasks}
      changeFilter={changeFilter}
      createTasks={createTasks}
      onChangeTaskStatus={onChangeTaskStatus}
    />
  );
};
