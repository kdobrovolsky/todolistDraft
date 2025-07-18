import { useReducer, useState } from "react";
import { TaskType, TodolistItem } from "../components/TodoListItem";

import "./App.css";
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
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, todolistsReducer } from "../model/todolists-reducer";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC, tasksReducer } from "../model/tasks-reducer";
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

export const AppWithReducer = () => {
  let todolistID1 = nanoid();
  let todolistID2 = nanoid();

  const [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
    { id: todolistID1, title: "Todolist1", filter: "all" },
    { id: todolistID2, title: "Todolist2", filter: "all" },
  ]);

  let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatchTodolists(changeTodolistFilterAC({id:todolistId,filter}))
  };

  const deleteTodolist = (todolistId: string) => {
    dispatchTodolists(deleteTodolistAC(todolistId))
    delete tasks[todolistId];
    dispatchTasks(deleteTodolistAC(todolistId))
  };

  const addTodolistItem = (title: string) => {
    const actionCreateTodo = createTodolistAC(title)
    dispatchTodolists(actionCreateTodo)
    dispatchTasks(actionCreateTodo)
  };

  const changeTodolistTitle = (taskId: string, newTitle: string) => {
    dispatchTodolists(changeTodolistTitleAC({id: taskId, title: newTitle}))
  };


  const deleteTasks = (todolistId: string, taskId: string) => {
    dispatchTasks(deleteTasksAC({todolistId,taskId}))
  };

  const AddTask = (todolistId: string, title: string) => {
    dispatchTasks(createTaskAC({todolistId,title}))
  };

  const onChangeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatchTasks(changeTaskStatusAC({todolistId,taskId,isDone}));
  };
  
  const onChangeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatchTasks(changeTaskTitleAC({todolistId,taskId,title}))
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
            <TodolistItem key={td.id}
              id={td.id}
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
