import { ChangeEvent } from "react";
import { FilterValues, TodolistsType } from "../app/App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectTasks } from "@/model/tasks-selector";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  id: string;
  todolist: TodolistsType
  title: string;
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
  todolist,
  id,
  filter,
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

  const tasks = useSelector(selectTasks)

  const filteredTasks = tasks[todolist.id]?.filter((t: TaskType) => 
    todolist.filter === "active" ? !t.isDone : 
  todolist.filter === "completed" ? t.isDone : true
) || [];


  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitile} />
        <IconButton onClick={() => deleteTodolist(id)}>
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTaskForm} />
      {!filteredTasks || filteredTasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => {
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
                <Checkbox
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChange={changeTaskTitleHandler}
                />
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
        >
          All
        </Button>
        <Button
          color="primary"
          variant={filter === "active" ? "contained" : "text"}
          onClick={() => changeFilter(id, "active")}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={filter === "completed" ? "contained" : "text"}
          onClick={() => changeFilter(id, "completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
