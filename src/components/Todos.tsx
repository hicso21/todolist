import { useAppDispatch } from "../state/hooks"
import { completeTodo, removeTodo, completeTodoDB, removeTodoDB } from "../state/todos/todosSlice"
import { Todo as TodoItem, type ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
  todos: ListOfTodos
}

export const Todos: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch()
  const handleRemoveTodo = (todo: TodoItem) => dispatch(removeTodo({id: todo.id}))
  const handleRemoveTodoDB = (todo: TodoItem) => dispatch(removeTodoDB(todo.id))
  const handleCompleteTodo = (todo: TodoItem) => dispatch(completeTodo({id: todo.id}))
  const handleCompleteTodoDB = (todo: TodoItem) => dispatch(completeTodoDB(todo.id))

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
            onRemoveTodo={()=>{handleRemoveTodo(todo); handleRemoveTodoDB(todo)}}
            onToggleCompleted={()=>{handleCompleteTodo(todo);handleCompleteTodoDB(todo)}}
          />
        </li>
      ))}
    </ul>
  )
}
