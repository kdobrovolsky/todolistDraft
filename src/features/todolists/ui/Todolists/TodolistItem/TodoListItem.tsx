import { TodolistsType } from "../../../../../app/App";

import { useSelector } from "react-redux";

import { useAppDispatch } from "@/common/hooks/useAppDispatch";

import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons";
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistsTitle/TodolistTitle";
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/TaskItem/TaskItem";
import { createTaskAC } from "@/features/todolists/model/tasks-reducer";
import { selectTasks } from "@/features/todolists/model/tasks-selector";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";

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
  const createItemForm = (title: string) => {
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

      <CreateItemForm createItemForm={createItemForm} />
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
