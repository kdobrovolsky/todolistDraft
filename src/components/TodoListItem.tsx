import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValues } from "../App";
import { Button } from "./Button";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string
  tasks: Task[]
  filter: FilterValues
  deleteTasks: (taskId: string) => void
  changeFilter: (filted: FilterValues) => void
  createTasks: (title: string) => void
  changeTaskStatus: (taskId:string, isDone: boolean) => void
};

export const TodoListItem = ({
  title,
  tasks,
  filter,
  deleteTasks,
  changeFilter,
  createTasks,
  changeTaskStatus,
}: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string|null>(null)
  
  
  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
  if(trimmedTitle.trim() !== ''){
    createTasks(trimmedTitle);
    setTaskTitle("");
}else{
  setError('Title is requared')
}
  };
 
  
  const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null)
  };

  //Функция отправки таски оп нажатию enter
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>
    event.key === "Enter" ? createTaskHandler() : "";
 
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
        className={error?'error':''}
          value={taskTitle}
          onChange={onChangeTaskTitleHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={'error-message'}>{error}</div>}
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
              <li key={task.id} className={task.isDone?'is-done':''}>
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
        <Button className={filter === 'all'? 'active-filter': ''} title={"All"} onClick={() => changeFilter("all")} />
        <Button className={filter === 'active'? 'active-filter': ''} title={"Active"} onClick={() => changeFilter("active")} />
        <Button className={filter === 'completed'? 'active-filter': ''} title={"Completed"} onClick={() => changeFilter("completed")} />
        <div>
         <div>Many intresting information</div>
        </div>
      </div>
    </div>
  );
};
