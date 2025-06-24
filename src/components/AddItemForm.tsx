import { ChangeEvent, useState,KeyboardEvent } from 'react';
import {IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';



export type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}:AddItemForm) => {
      const [taskTitle, setTaskTitle] = useState("");
      const [error, setError] = useState<string | null>(null);
    
      const onCreateTaskHandler = () => {
        if (taskTitle !== "") {
          addItem(taskTitle.trim());
          setTaskTitle("");
        } else {
          setError("Title is required");
        }
      };
    
      const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        setTaskTitle(inputValue);
        setError(null);
      };
    
      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle.trim() !== "") {
          addItem(taskTitle.trim());
          setTaskTitle("");
        }else{
          setError("Title is required");
        }
        
      };
    return (

        <div>
        <TextField
          value={taskTitle}
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
          label = 'type value'
          error = {!!error}
          helperText = {error}
          id="standard-basic"  variant="outlined" 
        />

        <IconButton onClick={onCreateTaskHandler} color={'primary'}>
          <ControlPoint/>
        </IconButton>
      </div>
      
  
  );
};
