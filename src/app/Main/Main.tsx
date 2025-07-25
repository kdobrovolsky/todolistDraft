import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { AddItemForm } from "@/components/AddItemForm";
import { createTodolistAC } from "@/model/todolists-reducer";
import { Container, Grid } from "@mui/material";
import { Todolists } from "../Todolists";

export const Main = () => {
  const dispatch = useAppDispatch();

  const addTodolistItem = (title: string) => {
    dispatch(createTodolistAC(title));
  };
  return (
    <Container fixed>
      <Grid container sx={{ padding: 2 }}>
        <AddItemForm addItem={addTodolistItem} />
      </Grid>
      <Grid container spacing={3}>
        <Todolists />
      </Grid>
    </Container>
  );
};
