import { FilterValues } from "@/app/App";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { AddItemForm } from "@/components/AddItemForm";
import { TaskType, TodolistItem } from "@/components/TodoListItem";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC } from "@/model/tasks-reducer";
import { selectTasks } from "@/model/tasks-selector";
import { changeTodolistFilterAC, changeTodolistTitleAC, createTodolistAC, deleteTodolistAC } from "@/model/todolists-reducer";
import { selectTodolists } from "@/model/todolists-selector";
import { Container, Grid, Paper } from "@mui/material";

export const Main = () => {
     const dispatch = useAppDispatch();
      const todolists = useAppSelector(selectTodolists); 
      const tasks = useAppSelector(selectTasks);

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
    
    return(
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
    )
}