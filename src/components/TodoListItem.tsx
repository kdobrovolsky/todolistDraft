import { ChangeEvent,} from "react";
import { TaskValues } from "../App";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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

  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;

  changeTodolistTitle: (id: string,newTitle: string,) => void;
  
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
  changeTodolistTitle,
  changeTaskTitle,
  
}: TodolistProps) => {

  const removeTodolist = () => {
    removeTodoList(id);
  };

  const addTask = (title:string) => {
    createTasks(title,id)
  } 

  const onChangeTodolistTitle = (newTitle: string) => {
    changeTodolistTitle(id,newTitle)
  };

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeTodolistTitle}/> <Button title={"X"} onClick={removeTodolist} />
      </h3>

      <AddItemForm addItem={addTask} />
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

            const onChangeTitleHandler = (newValue: string) => {
             changeTaskTitle(task.id,newValue, id)
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={onChangeCheckedHandler}
                />{" "}
                <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
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
