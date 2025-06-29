import { test, expect } from 'vitest'
import { TasksStateType } from "../App";
import { addTaskAC, addTodolistAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer } from "./tasks-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    'todolistId1': [
      { id: '1', title: "HTML&CSS", isDone: true },
      { id: '2', title: "JS", isDone: true },
      { id: '3', title: "ReactJS", isDone: false },
    ],
    'todolistId2': [
      { id: '1', title: "HTML&CSS2", isDone: true },
      { id: '2', title: "JS2", isDone: true },
      { id: '3', title: "ReactJS2", isDone: false },
    ],
  };

  const action  = removeTaskAC('2', 'todolistId2');

  const endState = TasksReducer(startState, action)

  expect(endState['todolistId1'].length  ).toBe(3)
  expect(endState['todolistId2'].length  ).toBe(2)
  expect(endState['todolistId2'].every(t=> t.id != '2')).toBeTruthy
});


test("correct task should be added to correct array", () => {
    const startState: TasksStateType = {
      'todolistId1': [
        { id: '1', title: "HTML&CSS", isDone: true },
        { id: '2', title: "JS", isDone: true },
        { id: '3', title: "ReactJS", isDone: false },
      ],
      'todolistId2': [
        { id: '1', title: "HTML&CSS2", isDone: true },
        { id: '2', title: "JS2", isDone: false },
        { id: '3', title: "ReactJS2", isDone: false },
      ],
    };
  
    const action  = addTaskAC('juce', 'todolistId2');
  
    const endState = TasksReducer(startState, action)
  
    expect(endState['todolistId1'].length  ).toBe(3)
    expect(endState['todolistId2'].length  ).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
  });
  
  test("status of specified task should be changed", () => {
    const startState: TasksStateType = {
      'todolistId1': [
        { id: '1', title: "HTML&CSS", isDone: true },
        { id: '2', title: "JS", isDone: true },
        { id: '3', title: "ReactJS", isDone: false },
      ],
      'todolistId2': [
        { id: '1', title: "HTML&CSS2", isDone: true },
        { id: '2', title: "JS2", isDone: true },
        { id: '3', title: "ReactJS2", isDone: false },
      ],
    };
  
    const action  = changeTaskStatusAC('2',false,'todolistId2');
  
    const endState = TasksReducer(startState, action)
  
    expect(endState['todolistId1'][1].isDone  ).toBe(true)
    expect(endState['todolistId2'][1].isDone ).toBe(false)

  });

  test("title of specified task should be changed", () => {
    const startState: TasksStateType = {
      'todolistId1': [
        { id: '1', title: "HTML&CSS", isDone: true },
        { id: '2', title: "JS", isDone: true },
        { id: '3', title: "ReactJS", isDone: false },
      ],
      'todolistId2': [
        { id: '1', title: "HTML&CSS2", isDone: true },
        { id: '2', title: "JS2", isDone: true },
        { id: '3', title: "ReactJS2", isDone: false },
      ],
    };
  
    const action  = changeTaskTitleAC('2','Milkiway','todolistId2');
  
    const endState = TasksReducer(startState, action)
  
    expect(endState['todolistId1'][1].title  ).toBe('JS')
    expect(endState['todolistId2'][1].title ).toBe('Milkiway')

  });

  test("new property with new array should be added when new todolist is added", () => {
    const startState: TasksStateType = {
      'todolistId1': [
        { id: '1', title: "HTML&CSS", isDone: true },
        { id: '2', title: "JS", isDone: true },
        { id: '3', title: "ReactJS", isDone: false },
      ],
      'todolistId2': [
        { id: '1', title: "HTML&CSS2", isDone: true },
        { id: '2', title: "JS2", isDone: true },
        { id: '3', title: "ReactJS2", isDone: false },
      ],
    };
  
    const action  = addTodolistAC('title no mater');
  
    const endState = TasksReducer(startState, action)
  
    const keys = Object.keys(endState)
    const newKey = keys.find(k=> k != 'todolistId1' && k != 'todolistId2')
    if(!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
  });

