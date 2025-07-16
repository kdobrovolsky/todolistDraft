import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App'
import { AppWithReducer } from './AppWithReducer'

createRoot(document.getElementById('root')!).render(<AppWithReducer />)
