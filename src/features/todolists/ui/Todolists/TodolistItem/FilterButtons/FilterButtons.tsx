import { Box, Button } from "@mui/material";

import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";
import { FilterValues, TodolistsType } from "../../../../../../app/App";
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-reducer";

type FilterButtonsProps = {
  todolist: TodolistsType;
};

export const FilterButtons = ({ todolist }: FilterButtonsProps) => {
  const { id, filter } = todolist;
  const dispatch = useAppDispatch();
  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id, filter }));
  };

  return (
    <Box>
      <Button
        variant={filter === "all" ? "contained" : "text"}
        onClick={() => changeFilter("all")}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={filter === "active" ? "contained" : "text"}
        onClick={() => changeFilter("active")}
      >
        Active
      </Button>
      <Button
        color="secondary"
        variant={filter === "completed" ? "contained" : "text"}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </Button>
    </Box>
  );
};
