import { useState } from "react";
import { useAppDispatch } from "../state/hooks";
import { addTodo, addTodoDB } from "../state/todos/todosSlice";

export const CreateTodo: React.FC = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(addTodo({ title: inputValue }))
    dispatch(addTodoDB({ title: inputValue }))
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>  
      <input
        className="new-todo"
        value={inputValue}
        onChange={(event)=> { setInputValue(event.target.value) }}
        placeholder='¿Qué quieres hacer?'
        autoFocus
      />
    </form>
  )
}