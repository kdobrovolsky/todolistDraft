import {useSelector} from 'react-redux'
import { RootState } from '../../app/store'
//кастомный хуй
 
export const useAppSelector = useSelector.withTypes<RootState>()