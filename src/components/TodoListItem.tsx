import { ChangeEvent } from "react";
import { TodolistsType } from "../app/App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectTasks } from "@/model/tasks-selector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { changeTaskStatusAC, createTaskAC, deleteTasksAC } from "@/model/tasks-reducer";
import { changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC } from "@/model/todolists-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TodolistItemPropsType = {
  todolist: TodolistsType
};

export const TodolistItem = ({
  todolist,
}: TodolistItemPropsType) => {

  const { id, title, filter } = todolist;

  const dispatch = useAppDispatch();
  const addTaskForm = (title: string) => {
     dispatch(createTaskAC({ todolistId: todolist.id, title }));
  };
  const changeTodolistTitile = (newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id , title: newTitle }));
  };

  const tasks = useSelector(selectTasks)

  const filteredTasks = tasks[id]?.filter((t: TaskType) => 
    filter === "active" ? !t.isDone : 
    filter === "completed" ? t.isDone : true
) || [];
  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitile} />
        <IconButton onClick={() => dispatch(deleteTodolistAC({ id:id }))}>
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
             dispatch(deleteTasksAC({ todolistId:id, taskId: task.id }));;
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
               dispatch(changeTaskStatusAC({ todolistId:id, taskId:task.id, isDone:newStatusValue }));
            };

            const changeTaskTitleHandler = (newTitle: string) => {
             dispatch(changeTodolistTitleAC({ id:task.id, title: newTitle }));
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
          onClick={() =>  dispatch(changeTodolistFilterAC({ id: todolist.id, filter:'all' }))}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={filter === "active" ? "contained" : "text"}
          onClick={() =>  dispatch(changeTodolistFilterAC({ id: todolist.id, filter:'active' }))}
        >
          Active
        </Button>
        <Button
          color="secondary"
          variant={filter === "completed" ? "contained" : "text"}
          onClick={() => dispatch(changeTodolistFilterAC({ id: todolist.id, filter:'completed' }))}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
