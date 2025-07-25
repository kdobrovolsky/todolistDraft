import { RootState } from "../app/store";
import { ThemeMode } from "./app-reducer";

export const selectApp = (state:RootState):ThemeMode => state.app.themeMode