import { useAppDispatch } from "../state/hooks"
import { removeCompletedTodo, removeCompletedTodoDB } from "../state/todos/todosSlice"
import { FilterValue } from "../types"
import { Filters } from "./Filters"

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  handleFilterChange: (filter:FilterValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filterSelected,
  handleFilterChange
}) => {
  const dispatch = useAppDispatch()
  

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> tareas pendientes
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {
        completedCount > 0 && (
            <button
              className='clear-completed'
              onClick={() => {
                dispatch(removeCompletedTodo())
                dispatch(removeCompletedTodoDB())
              }}
            >
              Borra completados
            </button>
        )
      }
    </footer>
  )
}