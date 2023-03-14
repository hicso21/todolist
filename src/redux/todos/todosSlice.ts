import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ListOfTodos, TodoId, Todo, UpdateTodo, TodoTitle } from '../../types'
import { RootState } from "../store"

const initialState = [
    {
      id: '1',
      title: 'Ver twitch de midu',
      completed: true
    },
    {
      id: '2',
      title: 'Aprender React con Typescript',
      completed: false
    },
    {
      id: '3',
      title: 'Sacar ticket de la midufest',
      completed: false
    }
] as ListOfTodos

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoTitle>): void => {
      state.push({
        id: crypto.randomUUID(),
        completed: false,
        title: action.payload.title
      })
    },
    removeTodo: (state, action: PayloadAction<TodoId>): void => {
      const indexOfTodoToRemove = state.findIndex(el => el.id === action.payload.id)
      state.splice(indexOfTodoToRemove, 1)
    },
    updateTodo: (state, action: PayloadAction<UpdateTodo>):void => {
      const indexOfTodoToUpdate = state.findIndex(el => el.id === action.payload.id)
      state[indexOfTodoToUpdate].title = action.payload.title
    },
    completeTodo: (state, action: PayloadAction<TodoId>):void => {
      state.forEach(todo => {
        if (todo.id === action.payload.id) todo.completed = !todo.completed
      })
    },
    removeCompletedTodo: (state, action: PayloadAction) => {
      const indexesOfTodoCompleted = state.map(({completed, id}, i) => {if(completed) return i; else return []}).flat().reverse()
      indexesOfTodoCompleted.map(el=> {state.splice(state[el], 1)})
      // for(let i = 0; i < indexesOfTodoCompleted.length; i++){
      //   state.splice(indexesOfTodoCompleted[i], 1)
      // }
    }
  }
})


export const { addTodo, completeTodo, removeTodo, updateTodo, removeCompletedTodo } = todosSlice.actions

export const selectTodos = (state: RootState) => state.todos

export default todosSlice.reducer