import { useState } from "react"
import { useAppDispatch } from "../state/hooks"
import { updateTodo, updateTodoDB } from "../state/todos/todosSlice"
import { type TodoId, type Todo as TodoType, TodoCompletedForAction } from "../types"
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props extends TodoType{
    onToggleCompleted: ({ id, completed }: TodoCompletedForAction) => void
    onRemoveTodo: ({ id }: TodoId) => void
}

export const Todo: React.FC<Props> = ({id, title, completed, onRemoveTodo, onToggleCompleted}) => {
  const [changeText, setChangeText] = useState(false)
  const [input, setInput] = useState(title)
  const dispatch = useAppDispatch()
  const [parent, enableAnimations] = useAutoAnimate()

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleted({
      id,
      completed: event.target.checked
    })
  }

  const handleSubmit = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(updateTodo({id, title: input}))
    dispatch(updateTodoDB({ id, title: input, completed: false}))
    setChangeText(false)
  }

  return (
    <div 
      className="view"
      onDoubleClick={()=>{setChangeText(true)}}
      ref={parent}
    >
        {!changeText
        ?<>
          <input
            className='toggle'
            checked={completed}
            type="checkbox"
            onChange={handleChangeCheckbox}
          />
          <label>{title}</label>
          <button
            className="destroy"
            onClick={()=>{
              onRemoveTodo({ id })
            }}
          />
        </>
        :<form onSubmit={handleSubmit}>
          <input
            autoFocus
            className="new-todo"
            type="text"
            value={input}
            onChange={(event)=>{setInput(event.target.value)}}
          />
        </form>
        }
    </div>
  )
}
