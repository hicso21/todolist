import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Todos } from './components/Todos'
import { TODO_FILTERS } from './consts'
import { useAppDispatch, useAppSelector } from './state/hooks'
import { getTodosDB } from './state/todos/todosSlice'
import { FilterValue } from './types'

const App = (): JSX.Element => {
  const listOfTodos = useAppSelector(state => state.todos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
  const [parent, enableAnimations] = useAutoAnimate()
  const dispatch = useAppDispatch()

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const activeCount = listOfTodos.filter(todo => !todo.completed).length
  const completedCount = listOfTodos.length - activeCount
  const filteredTodos = listOfTodos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  useEffect(()=>{
    dispatch(getTodosDB())
  },[])

  return (
    <div
      className='todoapp'
      ref={parent}
    >
      <Header />
      <Todos 
        todos={filteredTodos}
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
