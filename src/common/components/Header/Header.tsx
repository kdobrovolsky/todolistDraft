import { changeThemeModeAC } from "@/app/app-reducer"
import { selectApp } from "@/app/app-selectors";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Brightness4, Brightness7, Menu } from "@mui/icons-material"
import { AppBar, Button, IconButton,Toolbar, Typography } from "@mui/material"

export const Header =() => {
    const dispatch = useAppDispatch();
   const themeMode = useAppSelector(selectApp)
    return(
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
            <Menu  />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoLists
          </Typography>
          
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
    )
}