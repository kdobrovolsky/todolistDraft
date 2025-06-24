import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValues } from "../App";
import { Button } from "./ui/Button";
import { CreateItemForm } from "./CreateItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  id: string
  title: string;
  tasks: TaskType[];
  filter: FilterValues;
  deleteTasks: (todolistID: string,taskId: string) => void;
  changeFilter: (todolistID: string,filter: FilterValues) => void;
  createTasks: (todolistID: string,title: string) => void;
  onChangeTaskStatus: (todolistID: string,taksId: string, isDone: boolean) => void;
  deleteTodolist: (todolistID: string) =>  void
};

export const TodolistItem = ({
  title,
  id,
  filter,
  tasks,
  createTasks,
  deleteTasks,
  changeFilter,
  onChangeTaskStatus,
  deleteTodolist,
}: TodolistItemPropsType) => {
  
  const onAddItemForm = (title: string) => {
    createTasks(id,title)
  } 

  return (
    <div>
      <h3>{title} <Button title={"X"} onClick={()=>deleteTodolist(id)}/></h3>
      <CreateItemForm addItem={onAddItemForm}/>

      {!tasks || tasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTasksHandler = () => {
              deleteTasks(id,task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              onChangeTaskStatus(id,task.id, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title={"X"} onClick={deleteTasksHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title={"All"}
          onClick={() => changeFilter(id,"all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilter(id,"active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilter(id,"completed")}
        />
      </div>
    </div>
  );
};
