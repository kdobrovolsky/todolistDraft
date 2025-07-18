import { ChangeEvent } from "react";
import { FilterValues } from "../app/App";

import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import { CheckBox, Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  filter: FilterValues;
  deleteTasks: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, filter: FilterValues) => void;
  AddTask: (todolistID: string, title: string) => void;
  onChangeTaskStatus: (
    todolistID: string,
    taksId: string,
    isDone: boolean
  ) => void;
  deleteTodolist: (todolistId: string) => void;
  onChangeTaskTitle: (
    todolistID: string,
    taksId: string,
    newTitle: string
  ) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const TodolistItem = ({
  title,
  id,
  filter,
  tasks,
  AddTask,
  deleteTasks,
  changeFilter,
  onChangeTaskStatus,
  onChangeTaskTitle,
  changeTodolistTitle,
  deleteTodolist,
}: TodolistItemPropsType) => {
  const addTaskForm = (title: string) => {
    AddTask(id, title);
  };

  const changeTodolistTitile = (newTitle: string) => {
    changeTodolistTitle(id, newTitle);
  };
  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitile} />
        <IconButton onClick={() => deleteTodolist(id)}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTaskForm} />
      {!tasks || tasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTasksHandler = () => {
              deleteTasks(id, task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              onChangeTaskStatus(id, task.id, newStatusValue);
            };

            const changeTaskTitleHandler = (newTitle: string) => {
              onChangeTaskTitle(id, task.id, newTitle);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
                <IconButton onClick={deleteTasksHandler}>
                  <Delete />
                </IconButton>
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
        variant={filter === "all" ? "contained" : "text"}
          onClick={() => changeFilter(id, "all")}
        >All</Button>
        <Button
          color="primary"
          variant={filter === "active" ? "contained" : "text"}
          onClick={() => changeFilter(id, "active")}
        >Active</Button>
        <Button
          color="secondary"
          variant={filter === "completed" ? "contained" : "text"}
          onClick={() => changeFilter(id, "completed")}
        >Completed</Button>
      </div>
    </div>
  );
};
