import { TodolistsType } from "../app/App";
import { AddItemForm } from "./AddItemForm";
import { useSelector } from "react-redux";
import { selectTasks } from "@/model/tasks-selector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { createTaskAC } from "@/model/tasks-reducer";
import { FilterButtons } from "@/FilterButtons";
import { TodolistTitle } from "@/TodolistTitle";
import { TaskItem } from "@/TaskItem";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TodolistItemPropsType = {
  todolist: TodolistsType;
};

export const TodolistItem = ({ todolist }: TodolistItemPropsType) => {
  const { id,filter } = todolist;

  const dispatch = useAppDispatch();
  const addTaskForm = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }));
  };

  const tasks = useSelector(selectTasks);

  const filteredTasks =
    tasks[id]?.filter((t: TaskType) =>
      filter === "active" ? !t.isDone : filter === "completed" ? t.isDone : true
    ) || [];
  return (
    <div>
      <TodolistTitle
        todolist={todolist}
      />

      <AddItemForm addItem={addTaskForm} />
      {!filteredTasks || filteredTasks.length === 0 ? (
        <p>no tasks</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                todolistId={id}
              />
            );
          })}
        </ul>
      )}
      <FilterButtons
        todolist={todolist}
      />
    </div>
  );
};
