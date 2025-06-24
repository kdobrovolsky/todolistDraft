import { ChangeEvent, useState } from "react"

export type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({title,onChange}:EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [editTask, setEditTask] = useState(title)

    const editModeOnHandler = () => {
        setEditMode(true)
    }
    const editModeOffHandler = () => {
        setEditMode(false)
    }

    const onChangeEvetHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        setEditTask(e.currentTarget.value)
        onChange(editTask)
    }

    return(
        !editMode
        ?<span onDoubleClick={editModeOnHandler}>{title}</span>
        :<input value={editTask} onBlur={editModeOffHandler} onChange={onChangeEvetHandler} autoFocus/>
    )
}