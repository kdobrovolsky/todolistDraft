import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './store'
import { AppWithRedux } from './AppWithRedux'
 
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
     <AppWithRedux />
    </Provider>
)
