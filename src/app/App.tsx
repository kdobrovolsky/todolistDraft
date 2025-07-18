import { useState } from "react";
import { TaskType, TodolistItem } from "../components/TodoListItem";
import { AddItemForm } from "../components/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { nanoid } from "@reduxjs/toolkit";

export type FilterValues = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksStateType = {
  [key: string]: TaskType[]
}

export const App = () => {
  let todolistID1 = nanoid();
  let todolistID2 = nanoid();

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todolistID1, title: "Todolist1", filter: "all" },
    { id: todolistID2, title: "Todolist2", filter: "all" },
  ]);

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: nanoid(), title: "HTML&CSS", isDone: true },
      { id: nanoid(), title: "JS", isDone: true },
      { id: nanoid(), title: "ReactJS", isDone: false },
      { id: nanoid(), title: "Rest API", isDone: false },
      { id: nanoid(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: nanoid(), title: "HTML&CSS2", isDone: true },
      { id: nanoid(), title: "JS2", isDone: true },
      { id: nanoid(), title: "ReactJS2", isDone: false },
      { id: nanoid(), title: "Rest API2", isDone: false },
      { id: nanoid(), title: "GraphQL2", isDone: false },
    ],
  });

  const changeFilter = (todolistID: string, filter: FilterValues) => {
    setTodolists(
      todolists.map((tl) =>
        tl.id === todolistID ? { ...tl, filter: filter } : tl
      )
    );
  };

  const deleteTasks = (todolistID: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((t) => t.id !== taskId),
    });
  };

  const AddTask = (todolistID: string, title: string) => {
    const newTask = { id:nanoid(), title, isDone: false };
    setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] });
  };

  const onChangeTaskStatus = (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((t) =>
        t.id === taskId ? { ...t, isDone } : t
      ),
    });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((t) => t.id !== todolistId));
  };

  const addTodolistItem = (title: string) => {
    const todolist: TodolistsType = { id: nanoid(), title, filter: "all" };
    setTodolists([todolist, ...todolists]);

    setTasks({ ...tasks, [todolist.id]: [] });
  };

  const onChangeTaskTitle = (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((t) =>
        t.id === taskId ? { ...t, title: newTitle } : t
      ),
    });
  };

  const changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.map((tl) =>
      tl.id === id ? { ...tl, title: newTitle } : tl
    );
    setTodolists(todolist);
  };

  return (
    <div style={{ width: '100vw' }}>
       <AppBar 
        position="static"
        sx={{ 
          width: '100%',
          borderRadius: 0 // Убирает скруглённые углы (если есть)
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed >
        <Grid container>
        <AddItemForm addItem={addTodolistItem} />
        </Grid>

        <Grid container spacing={3}>
      
        {todolists.map((td) => {
          let tasksForTodolist = tasks[td.id];
          if (td.filter === "active") {
            tasksForTodolist = tasks[td.id].filter((t) => t.isDone === false);
          }
          if (td.filter === "completed") {
            tasksForTodolist = tasks[td.id].filter((t) => t.isDone === true);
          }
          return (
            <Paper style={{padding:"10px"}}>
            <TodolistItem
              id={td.id}
              key={td.id}
              title={td.title}
              filter={td.filter}
              tasks={tasksForTodolist}
              deleteTasks={deleteTasks}
              changeFilter={changeFilter}
              AddTask={AddTask}
              onChangeTaskStatus={onChangeTaskStatus}
              deleteTodolist={deleteTodolist}
              onChangeTaskTitle={onChangeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
            />
             </Paper>
          );
          
        })}
       
        </Grid>
      </Container>
    </div>
  );
};
