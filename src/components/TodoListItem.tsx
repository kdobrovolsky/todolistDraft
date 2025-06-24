import { ChangeEvent,} from "react";
import { FilterValues } from "../App";
import { Button } from "./ui/Button";
import { CreateItemForm } from "./CreateItemForm";
import { EditableSpan } from "./EditableSpan";

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
  createTasks: (todolistID: string, title: string) => void;
  onChangeTaskStatus: (
    todolistID: string,
    taksId: string,
    isDone: boolean
  ) => void;
  deleteTodolist: (todolistID: string) => void;
  onChangeTaskTitle: (
    todolistID: string,
    taskId: string,
    newTitle: string
  ) => void;
  onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
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
  onChangeTaskTitle,
  deleteTodolist,
  onChangeTodolistTitle,
}: TodolistItemPropsType) => {
  const onAddItemForm = (title: string) => {
    createTasks(id, title);
  };

  const onChangeTodolistTitleHandler = (newTitle: string) => {
    onChangeTodolistTitle(id, newTitle)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/> <Button title={"X"} onClick={() => deleteTodolist(id)} />
      </h3>
      <CreateItemForm addItem={onAddItemForm} />

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
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />

                <EditableSpan
                  title={task.title}
                  onChange={changeTaskTitleHandler}
                />
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
          onClick={() => changeFilter(id, "all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title={"Active"}
          onClick={() => changeFilter(id, "active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title={"Completed"}
          onClick={() => changeFilter(id, "completed")}
        />
      </div>
    </div>
  );
};
