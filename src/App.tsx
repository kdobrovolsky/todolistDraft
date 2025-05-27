import { useState } from "react";
import "./App.css";
import { Task, TodoListItem } from "./components/TodoListItem";
import { v1 } from "uuid";

export type FilterValues = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValues>("all");

  let filteredTasks = tasks;
  {filter === "active"? (filteredTasks = tasks.filter((task) => task.isDone)): "";}
  {filter === "completed"? (filteredTasks = tasks.filter((task) => !task.isDone)): "";}
  //фильтрация таски
  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };
  // удаление таски
  const deleteTasks = (taskId: string) => {
    tasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(tasks);
  };

  const createTasks = (title: string) => {
    const newTask = { id: v1(), title: title, isDone: false }
    const newTasks = [newTask,...tasks]
    setTasks(newTasks)
  }

  return (
    <div className="app">
      <TodoListItem
        title={"TodoList"}
        tasks={filteredTasks}
        deleteTasks={deleteTasks}
        changeFilter={changeFilter}
        createTasks = {createTasks}
      />
    </div>
  );
}

export default App;
