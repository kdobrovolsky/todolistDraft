import { IconButton } from "@mui/material";
import { EditableSpan } from "./components/EditableSpan";

import { useAppDispatch } from "./common/hooks/useAppDispatch";
import {
  changeTodolistTitleAC,
  deleteTodolistAC,
} from "./model/todolists-reducer";
import { TodolistsType } from "./app/App";
import Delete from "@mui/icons-material/Delete";

type TodolistTitleProps = {
  todolist: TodolistsType;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const { title, id } = todolist;
  const dispatch = useAppDispatch();
  const changeTodolistTitile = (newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id, title: newTitle }));
  };
  return (
    <>
      <h3>
        <EditableSpan title={title} onChange={changeTodolistTitile} />
        <IconButton onClick={() => dispatch(deleteTodolistAC({ id: id }))}>
          <Delete />
        </IconButton>
      </h3>
    </>
  );
};
