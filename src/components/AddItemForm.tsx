import React, { ChangeEvent, useState,KeyboardEvent } from 'react';
import { Button } from './ui/Button';

export type AddItemForm = {
    
}

export const AddItemForm = () => {
      const [taskTitle, setTaskTitle] = useState("");
      const [error, setError] = useState<string | null>(null);
    
      const onCreateTaskHandler = () => {
        if (taskTitle !== "") {
          createTasks(taskTitle.trim());
          setTaskTitle("");
        } else {
          setError("Title is required");
        }
      };
    
      const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
        setTaskTitle(inputValue);
      };
    
      const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && taskTitle.trim() !== "") {
          createTasks(taskTitle.trim());
          setTaskTitle("");
        }else{
          setError("Title is required");
        }
        
      };
    return (

        <div>
        <input
          value={taskTitle}
          onChange={onChangeInputHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />

        <Button title={"+"} onClick={onCreateTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      
  
  );
};
