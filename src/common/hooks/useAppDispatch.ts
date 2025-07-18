import {useDispatch} from 'react-redux'
import { AppDispatch } from '../../app/store'
//кастомный хук
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()