import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "@/model/todolists-selector";
import {TodolistItem } from "@/components/TodoListItem";
import { Paper, Box } from "@mui/material";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists);
    return (
        <Box display="flex" flexWrap="wrap" gap={2}>
            {todolists.map((todolist) => {
                return (
                    <Paper key={todolist.id} elevation={3} sx={{ padding: 2, minWidth: 300 }}>
                        <TodolistItem
                            todolist={todolist}
                        />
                    </Paper>
                );
            })}
        </Box>
    );
};