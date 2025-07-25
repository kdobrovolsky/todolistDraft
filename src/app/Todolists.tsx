import { useAppSelector } from "@/common/hooks/useAppSelector";
import { changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC } from "@/model/todolists-reducer";
import { selectTodolists } from "@/model/todolists-selector";
import { FilterValues } from "./App";
import { changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC } from "@/model/tasks-reducer";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import {TodolistItem } from "@/components/TodoListItem";
import { Paper, Box } from "@mui/material";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists);
    const dispatch = useAppDispatch();

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({ id: todolistId, filter }));
    };

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({ id: todolistId }));
    };

    const changeTodolistTitle = (taskId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC({ id: taskId, title: newTitle }));
    };

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTasksAC({ todolistId, taskId }));
    };

    const addTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({ todolistId, title }));
    };

    const onChangeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({ todolistId, taskId, isDone }));
    };

    const onChangeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({ todolistId, taskId, title }));
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={2}>
            {todolists.map((todolist) => {
               
                return (
                    <Paper key={todolist.id} elevation={3} sx={{ padding: 2, minWidth: 300 }}>
                        <TodolistItem
                            id={todolist.id}
                            todolist={todolist}
                            title={todolist.title}
                            filter={todolist.filter}
                            deleteTasks={deleteTask}
                            changeFilter={changeFilter}
                            AddTask={addTask}
                            onChangeTaskStatus={onChangeTaskStatus}
                            deleteTodolist={deleteTodolist}
                            onChangeTaskTitle={onChangeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                );
            })}
        </Box>
    );
};