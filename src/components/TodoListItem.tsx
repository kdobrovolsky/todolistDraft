import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValue } from "../App";
import { Button } from "./ui/Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistItemPropsType = {
  title: string;
  tasks: TaskType[];
  filter: string;
  deleteTasks: (taskId: string) => void;
  changeFilter: (filter: FilterValue) => void;
  createTasks: (title: string) => void;
  onChangeTaskStatus: (taksId: string, isDone: boolean) => void;
};

export const TodolistItem = ({
  title,
  filter,
  tasks,
  createTasks,
  deleteTasks,
  changeFilter,
  onChangeTaskStatus,
}: TodolistItemPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onCreateTaskHandler = () => {
    if (taskTitle !== "") {
      createTasks(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setTaskTitle(inputValue);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && taskTitle !== "") {
      createTasks(taskTitle.trim());
      setTaskTitle("");
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />

        <Button title={"+"} onClick={onCreateTaskHandler} />
      </div>
      {error && <div className={"error-message"}>{error}</div>}
      {tasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTasksHandler = () => {
              deleteTasks(task.id);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              onChangeTaskStatus(task.id, newStatusValue);
            };

            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />{" "}
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
          onClick={() => changeFilter("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilter("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilter("completed")}
        />
      </div>
    </div>
  );
};
