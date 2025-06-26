import { userReducer } from "./user-reducer"
import { test, expect } from 'vitest'

test ('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 26, name: 'Kirill'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(26  )

})

test('user reducer should increment only childrenCount', () => {
    const stateState = {age: 20, childrenCount: 2, name: 'Kirill'}

    const endState = userReducer(stateState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
    const stateState = {age: 20, childrenCount: 2, name: 'Kirill'}
    const newName = 'Viktor'
    const endState = userReducer(stateState, {type: 'CHANGE-NAME', newName})
    expect(endState.name).toBe(newName)
})