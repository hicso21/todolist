import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { fetchTodoAPI } from "../../fetchAPI"
import { ListOfTodos, Todo, TodoId, TodoTitle, UpdateTodo } from '../../types'
import { RootState } from "../store"

const initialState: ListOfTodos = []

export const getTodosDB = createAsyncThunk<ListOfTodos>(
  "todo/getTodoList",
  async () => {
    try {
      const { data } = await fetchTodoAPI({method: 'GET', url: '/getAll'})
      return data
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const addTodoDB = createAsyncThunk(
  "todo/addTodo",
  async (data: { title: string }, thunkAPI) => {
    try {
      const { title } = data
      await fetchTodoAPI({method: 'POST', url: '/postNewTodo', data: { title }})
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const removeTodoDB = createAsyncThunk(
  "todo/removeTodo",
  async (id: number, thunkAPI) => {
    try {
      await fetchTodoAPI({method: 'DELETE', url: `/deleteTodo/${id}`})
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const completeTodoDB = createAsyncThunk(
  "todo/completeTodo",
  async (id: number, thunkAPI) => {
    try {
      await fetchTodoAPI({method: 'PATCH', url: `/patchTodoCompleted/${id}`})
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const updateTodoDB = createAsyncThunk(
  "todo/updateTodo",
  async (todo: Todo, thunkAPI) => {
    try {
      const { id, title } = todo
      await fetchTodoAPI({method: 'PATCH', url: `/patchTodoTitle`, data: { id, title }})
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const removeCompletedTodoDB = createAsyncThunk(
  "todo/removeCompletedTodo",
  async () => {
    try {
      await fetchTodoAPI({method: 'PATCH', url: `/deleteAllCompleted`})
    } catch (error) {
      throw new Error(error as any)
    }
  }
)

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoTitle>): void => {
      state.push({
        id: current(state)[current(state).length-1].id + 1,
        completed: false,
        title: action.payload.title
      })
    },
    removeTodo: (state, action: PayloadAction<TodoId>): void => {
      const indexOfTodoToRemove = current(state).findIndex(el => el.id === action.payload.id)
      state.splice(indexOfTodoToRemove, 1)
    },
    updateTodo: (state, action: PayloadAction<UpdateTodo>):void => {
      const indexOfTodoToUpdate = current(state).findIndex(el => el.id === action.payload.id)
      state[indexOfTodoToUpdate].title = action.payload.title
    },
    completeTodo: (state, action: PayloadAction<TodoId>):void => {
      state.forEach(todo => {
        if (todo.id === action.payload.id) todo.completed = !todo.completed
      })
    },
    removeCompletedTodo: (state: Array<any>, action: PayloadAction) => {
      const indexesOfTodoCompleted = current(state).map(({completed, id}, i) => {if(completed) return i; else return []}).flat().reverse()
      indexesOfTodoCompleted.map(el=> {state.splice(state[el], 1)})
    }
  },
  extraReducers: async (builder) => {
    builder.addCase(getTodosDB.fulfilled, (state, action) => {
      action.payload.map((e) => {
        const todo = {...e}
        state.push(todo)
      })
    })
  }
})


export const { addTodo, completeTodo, removeTodo, updateTodo, removeCompletedTodo } = todosSlice.actions

export const selectTodos = (state: RootState) => state.todos

export default todosSlice.reducer