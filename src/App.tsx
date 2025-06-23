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

  const deleteTasks = (todolistID: string,taskId: string) => {
    // const deleteTask = tasks.filter((t) => t.id !== taskId);
    setTasks({...tasks, [todolistID]:tasks[todolistID].filter(t=> t.id !== taskId)});
  };

  const createTasks = (todolistID: string,title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    // const newTasks = [newTask, ...tasks];
    setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]});
  };

  const onChangeTaskStatus = (todolistID: string,taskId: string, isDone: boolean) => {
    // setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone } : t)));
    setTasks({...tasks, [todolistID]: tasks[todolistID].map(t=> t.id === taskId ? {...t, isDone}: t)})
  };

  const deleteTodolist = (todolistID:string) => {
    setTodolists(todolists.filter(t=> t.id !== todolistID))
  }

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
            deleteTodolist = {deleteTodolist}
          />
        );
      })}
    </div>
  );
};
