import { TaskType, TodolistItem } from "../components/TodoListItem";
import { AddItemForm } from "../components/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
} from "../model/todolists-reducer";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  deleteTasksAC,
} from "../model/tasks-reducer";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { selectTodolists } from "../model/todolists-selector";
import { selectTasks } from "../model/tasks-selector";

export type FilterValues = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};
export const AppWithRedux = () => {
  const dispatch = useAppDispatch();
  const todolits = useAppSelector(selectTodolists); 
  const tasks = useAppSelector(selectTasks);
  //useSelector достает данные из store и подписывается на их изменения
  //1.Особенности useCallback: Ре-рендер только при изменении данных
  // Компонент перерисовывается только если возвращаемое значение селектора изменилось (по сравнению с предыдущим вызовом).

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
  };

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC({id:todolistId}));
  };

  const addTodolistItem = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  const changeTodolistTitle = (taskId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC({ id: taskId, title: newTitle }));
  };

  const deleteTasks = (todolistId: string, taskId: string) => {
    dispatch(deleteTasksAC({ todolistId, taskId }));
  };

  const AddTask = (todolistId: string, title: string) => { 
    dispatch(createTaskAC({ todolistId, title }));
  };

  const onChangeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
  };

  const onChangeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
  };

  return (
    <div style={{ width: "100vw" }}>
      <AppBar
        position="static"
        sx={{
          width: "100%",
          borderRadius: 0,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodolistItem} />
        </Grid>

        <Grid container spacing={3}>
          {todolits.map((td) => {
            let tasksForTodolist = tasks[td.id];
            if (td.filter === "active") {
              tasksForTodolist = tasks[td.id].filter((t) => t.isDone === false);
            }
            if (td.filter === "completed") {
              tasksForTodolist = tasks[td.id].filter((t) => t.isDone === true);
            }
            return (
              <Paper style={{ padding: "10px" }}>
                <TodolistItem
                  key={td.id}
                  id={td.id}
                  title={td.title}
                  filter={td.filter}
                  tasks={tasksForTodolist}
                  deleteTasks={deleteTasks}
                  changeFilter={changeFilter}
                  AddTask={AddTask}
                  onChangeTaskStatus={onChangeTaskStatus}
                  deleteTodolist={deleteTodolist}
                  onChangeTaskTitle={onChangeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
