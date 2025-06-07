import { KeyboardEvent, ChangeEvent, useState } from "react";
import { Button } from "./Button";

export type AddItemFormPropsType = {
  addItem: (taskTitle: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    setError(null);
  };

  const onKeyDownHangler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (taskTitle !== "" && event.key === "Enter") {
      onClickButtonHandler();
    }
  };

  const onClickButtonHandler = () => {
    if (taskTitle !== "") {
        addItem(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={onChangeInputHandler}
        onKeyDown={onKeyDownHangler}
      />
      <Button
        title="+"
        onClick={onClickButtonHandler}
        disabled={taskTitle === ""}
      />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
