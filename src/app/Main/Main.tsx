import { useAppDispatch } from "@/common/hooks/useAppDispatch";


import { Container, Grid } from "@mui/material";
import { Todolists } from "../../features/todolists/ui/Todolists/Todolists";
import { createTodolistAC } from "@/features/todolists/model/todolists-reducer";
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm";

export const Main = () => {
  const dispatch = useAppDispatch();

  const createItemForm = (title: string) => {
    dispatch(createTodolistAC(title));
  };
  return (
    <Container fixed>
      <Grid container sx={{ padding: 2 }}>
        <CreateItemForm createItemForm={createItemForm} />
      </Grid>
      <Grid container spacing={3}>
        <Todolists />
      </Grid>
    </Container>
  );
};
