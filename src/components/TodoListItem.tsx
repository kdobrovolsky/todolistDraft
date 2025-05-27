import { ChangeEvent, KeyboardEvent, useState } from "react";
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
  createTasks: (title: string) => void;
  changeTaskStatus: (taskId:string, isDone: boolean) => void
};

export const TodoListItem = ({
  title,
  tasks,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
}: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  
  
  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
  if(trimmedTitle.trim() !== ''){
    createTasks(trimmedTitle);
    setTaskTitle("");
}
  };
 
  
  const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  //Функция отправки таски оп нажатию enter
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? createTaskHandler() : "";
 
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeTaskTitleHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
      </div>
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = ()=>{
                deleteTasks(task.id)
            }

            const onChangeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                const newTaskValue = e.currentTarget.checked
                changeTaskStatus(task.id, newTaskValue)
            }
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
                <span>{task.title}</span>
                <Button
                  title={"X"}
                  onClick={deleteTaskHandler}
                />
              </li>
            );})}
        </ul>
      )}
      <div>
        <Button title={"All"} onClick={() => changeFilter("all")} />
        <Button title={"Active"} onClick={() => changeFilter("active")} />
        <Button title={"Completed"} onClick={() => changeFilter("completed")} />
        <div>
  <div>Many intresting information</div>
        </div>
      </div>
    </div>
  );
};
