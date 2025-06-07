import { useState } from "react";
import { Task, TodolistItem } from "./components/TodoListItem";
import { v1 } from "uuid";
import "./App.css";

export type TaskValues = "all" | "active" | "completed";
type TodolistType = {
  id: string;
  title: string;
  filter: TaskValues;
};

export const App = () => {
  //delete tasks
  const deleteTasks = (taskId: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter((t) => t.id !== taskId);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  //filter tasks
  const changeFilter = (value: TaskValues, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  };

  const createTasks = (taskTitle: string, todolistId: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    let tasks = tasksObj[todolistId];
    const newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  };

  let [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  return (
    <div>
      <input  /> <button>x</button>
      {todolists.map((tl) => {
        //todolist.map нужен для отрисовки нескольких тудулистов
        //Фильтрацию правильно сделать внутри мапа, снаружи нет смысла делать фильтр. т.к работа с каждым тудулистом происходит внутри мапа
        let filteredTasks = tasksObj[tl.id];
        if (tl.filter === "active") {
          filteredTasks = filteredTasks.filter((t) => !t.isDone);
        } else if (tl.filter === "completed") {
          filteredTasks = filteredTasks.filter((t) => t.isDone);
        }
        return (
          <TodolistItem
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            deleteTasks={deleteTasks}
            changeFilter={changeFilter}
            createTasks={createTasks}
            changeTaskStatus={changeTaskStatus}
            removeTodoList={removeTodolist}
          />
        );
      })}
    </div>
  );
};
