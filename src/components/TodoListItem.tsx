import { KeyboardEvent, useState } from "react";
import { FilterValues } from "../App";
import { Button } from "./Button";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: Task[];
  deleteTasks: (taskId: string) => void;
  changeFilter: (filted: FilterValues) => void;
  createTasks: (title: string) => void
};

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
  createTasks,
}: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const createTaskHandler = () => {
        createTasks(taskTitle)
        setTaskTitle('')
      }
      
      const onKeyDownHandler =(event:KeyboardEvent<HTMLInputElement>) => (event.key === 'Enter')?createTaskHandler():''

    return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskTitle} onChange={event => setTaskTitle(event.currentTarget.value)}  onKeyDown={onKeyDownHandler}/>
        <Button title={"+"} onClick={createTaskHandler}/>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <Button
                title={"X"}
                onClick={() => {
                  deleteTasks(task.id);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => changeFilter("all")} />
        <Button title={"Active"} onClick={() => changeFilter("active")} />
        <Button title={"Completed"} onClick={() => changeFilter("completed")} />
      </div>
    </div>
  );
};
