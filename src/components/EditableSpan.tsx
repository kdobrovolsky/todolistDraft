import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

export type EditableSpanPropsType = {
title: string
onChange: (newTitle: string) => void
}

export const EditableSpan = ({title,onChange}:EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  const [taskTitle, setTitle] = useState('')
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(title)
  }
  
  const activeViewMode = () => {
    setEditMode(false)
    onChange(taskTitle)
    
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    
    
  }

  return (
    editMode
    ? <TextField value={taskTitle} onChange={onChangeTitleHandler} onBlur={activeViewMode} autoFocus/> 
    :<span onDoubleClick={activateEditMode}>{title}</span>
  );
};
