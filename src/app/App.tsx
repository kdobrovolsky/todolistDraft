
import { AddItemForm } from "../components/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  createTheme,
  CssBaseline,

  Grid,

  IconButton,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material";
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
import { TaskType, TodolistItem } from "../components/TodoListItem";
import { selectApp } from "./app-selectors";
import { changeThemeModeAC } from "./app-reducer";



export type FilterValues = "all" | "active" | "completed";
export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};
export const App = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists); 
  const tasks = useAppSelector(selectTasks);
  const themeMode = useAppSelector(selectApp)
 
  // const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#087EA4',
      },
    },
  })

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              TodoLists
            </Typography>
            
            {/* Добавленный переключатель темы */}
            <IconButton 
              color="inherit"
              onClick={() => dispatch(changeThemeModeAC({themeMode:themeMode === 'light' ? 'dark' : 'light'}))}
              sx={{ mr: 2 }}
            >
              {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
  
        <Container fixed>
          <Grid container sx={{ padding: 2 }}>
            <AddItemForm addItem={addTodolistItem} />
          </Grid>
  
          <Grid container spacing={3}>
            {todolists.map((td) => {
              let tasksForTodolist = tasks[td.id];
              if (td.filter === "active") {
                tasksForTodolist = tasks[td.id].filter((t: TaskType) => !t.isDone);
              }
              if (td.filter === "completed") {
                tasksForTodolist = tasks[td.id].filter((t: TaskType) => t.isDone);
              }
              return (
           
                  <Paper elevation={3} style={{ padding: "20px" }}>
                    <TodolistItem
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
    </ThemeProvider>
  )};