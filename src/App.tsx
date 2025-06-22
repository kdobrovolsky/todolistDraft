import { useState } from "react";
import {TodolistItem } from "./components/TodoListItem";
import { v1 } from "uuid";
import "./App.css";

export type FilterValues = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValues;
};



export const App = () => {
  // let [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: "HTML&CSS", isDone: true },
  //   { id: v1(), title: "JS", isDone: true },
  //   { id: v1(), title: "ReactJS", isDone: false },
  //   { id: v1(), title: "Redux", isDone: false },
  // ]);

  // const [filter, setFilter] = useState("all");
  let todolistID1 = v1()
  let todolistID2 = v1()


  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistID1, title: "Todolist1", filter: "all" },
    { id: todolistID2, title: "Todolist2", filter: "all" },
  ]);


  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

 

  const changeFilter = (todolistID: string,filter: FilterValues) => {
    setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl,filter: filter}:tl));
  };

  const deleteTasks = (taskId: string) => {
    // const deleteTask = tasks.filter((t) => t.id !== taskId);
    // setTasks(deleteTask);
  };

  const createTasks = (title: string) => {
    // const newTask = { id: v1(), title, isDone: false };
    // const newTasks = [newTask, ...tasks];
    // setTasks(newTasks);
  };

  const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
    // setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone } : t)));
  };

  return (
    <div className="app">
      {todolists.map((td) => {

       let tasksForTodolist = tasks[td.id];
       if (td.filter === "active") {
         tasksForTodolist = tasks[td.id].filter((t) => t.isDone === false);
       }
       if (td.filter === "completed") {
         tasksForTodolist = tasks[td.id].filter((t) => t.isDone === true);
       }

        return (
          <TodolistItem
            id = {td.id}
            key={td.id}
            title={td.title}
            filter={td.filter}
            tasks={tasksForTodolist}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            createTasks={createTasks}
            onChangeTaskStatus={onChangeTaskStatus}
          />
        );
      })}
    </div>
  );
};
