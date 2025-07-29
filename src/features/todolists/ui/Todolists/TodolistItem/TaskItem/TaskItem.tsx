import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskType } from "../TodoListItem";
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";

import { ChangeEvent } from "react";
import { changeTaskStatusAC, deleteTasksAC } from "@/features/todolists/model/tasks-reducer";
import { changeTodolistTitleAC } from "@/features/todolists/model/todolists-reducer";


type TaskItemProps = {
  task: TaskType;
  todolistId: string;
};

export const TaskItem = ({ task, todolistId }: TaskItemProps) => {
  const { title, isDone } = task;
  const dispatch = useAppDispatch();
  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id: task.id, title: newTitle }));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    dispatch(
      changeTaskStatusAC({
        todolistId,
        taskId: task.id,
        isDone: newStatusValue,
      })
    );
  };

  const deleteTasksHandler = () => {
    dispatch(deleteTasksAC({ todolistId, taskId: task.id }));
  };
  return (
    <li key={task.id} className={isDone ? "is-done" : ""}>
      <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
      <EditableSpan title={title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={deleteTasksHandler}>
        <Delete />
      </IconButton>
    </li>
  );
};
