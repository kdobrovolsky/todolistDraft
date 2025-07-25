import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { TaskType } from "../components/TodoListItem";
import { selectApp } from "./app-selectors";
import { getTheme } from "@/common/theme/theme";
import { Header } from "@/common/components/Header/Header";
import { Main } from "@/app/Main/Main";

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
  const themeMode = useAppSelector(selectApp)
  const theme = getTheme(themeMode)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ width: "100vw" }}>
      <Header/>
      <Main/>    
      </div>
    </ThemeProvider>
  )};