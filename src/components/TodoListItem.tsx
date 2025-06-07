import { ChangeEvent, useState, KeyboardEvent } from "react";
import { TaskValues } from "../App";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistProps = {
  title: string;
  tasks: Task[];
  filter: string;
  id: string;
  deleteTasks: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: TaskValues, todolistId: string) => void;
  createTasks: (taskTitle: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  removeTodoList: (todolistId: string) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  filter,
  id,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
  removeTodoList,
}: TodolistProps) => {
  const removeTodolist = () => {
    removeTodoList(id);
  };

  return (
    <div>
      <h3>
        {title} <Button title={"X"} onClick={removeTodolist} />
      </h3>

      <AddItemForm id={id} createTasks={createTasks} />
      {tasks.length === 0 ? (
        <p>No tasts</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const onChangeCheckedHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, id);
            };
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeCheckedHandler}
                />{" "}
                <span>{task.title}</span>
                <Button title="X" onClick={() => deleteTasks(task.id, id)} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title="All"
          onClick={() => changeFilter("all", id)}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title="Active"
          onClick={() => changeFilter("active", id)}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title="Completed"
          onClick={() => changeFilter("completed", id)}
        />
      </div>
    </div>
  );
};
