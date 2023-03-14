import { useAppDispatch } from "../redux/hooks"
import { completeTodo, removeTodo } from "../redux/todos/todosSlice"
import { Todo as TodoItem, type ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch()
  const handleRemoveTodo = (todo: TodoItem) => dispatch(removeTodo({id: todo.id}))
  const handleCompleteTodo = (todo: TodoItem) => dispatch(completeTodo({id: todo.id}))

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li 
          key={todo.id}
          className={`${todo.completed? 'completed': ''}`}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={()=>{handleRemoveTodo(todo)}}
            onToggleCompleted={()=>{handleCompleteTodo(todo)}}
          />
        </li>
      ))}
    </ul>
  )
}
