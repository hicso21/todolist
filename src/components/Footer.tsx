import { useAppDispatch } from "../redux/hooks"
import { removeCompletedTodo } from "../redux/todos/todosSlice"
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
              onClick={() => {dispatch(removeCompletedTodo())}}
            >
              Borra completados
            </button>
        )
      }
    </footer>
  )
}