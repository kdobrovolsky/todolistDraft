import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue:string) => void
};

export const EditableSpan = ({ title, onChange }: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false); // Режим редактирования (вкл/выкл)
  let [titleRename, setTitleRename] = useState(title); // Временное значение для редактирования

  const activeEditMode = () => setEditMode(true); //включает режим редактирования
  const activeViewMode = () => {
    setEditMode(false);  //переключаем в режим просмотра
    onChange(titleRename); // Передаем новый текст родителю через колбэк
  };
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => { //обновляет текст при вводе
    setTitleRename(e.currentTarget.value);
  };

  return editMode ? (
    <input
      value={titleRename}
      onChange={onChangeTitleHandler}
      onBlur={activeViewMode}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activeEditMode}>{title}</span>
  );
};
