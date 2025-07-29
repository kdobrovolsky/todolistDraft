import { IconButton } from "@mui/material";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";

import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";

import { TodolistsType } from "../../../../../../app/App";
import Delete from "@mui/icons-material/Delete";
import { changeTodolistTitleAC, deleteTodolistAC } from "@/features/todolists/model/todolists-reducer";

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
