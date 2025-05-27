import { use, useState } from 'react'
import './App.css'
import { Task, TodoListItem } from './components/TodoListItem'

export type FilterValues = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ])  
  const [filter, setFilter] = useState<FilterValues>('all')

  let filteredTasks = tasks
  {filter === 'active'? filteredTasks = tasks.filter(task => task.isDone ):''}
  {filter === 'completed'? filteredTasks = tasks.filter(task => !task.isDone ):''}

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const deleteTasks = (taskId: number) => {
    tasks = tasks.filter(task => { return task.id !== taskId})
    setTasks(tasks)
  }

  return (
      <div className="app">
        <TodoListItem 
        title={'TodoList'} 
        tasks={filteredTasks} 
        deleteTasks={deleteTasks}
        changeFilter ={ changeFilter}
        /> 
      </div>
  )
}

export default App
