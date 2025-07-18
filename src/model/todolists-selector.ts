import { TodolistsType } from "../app/App";
import { RootState } from "../app/store";

export const selectTodolists = (state:RootState):TodolistsType[] => state.todolists