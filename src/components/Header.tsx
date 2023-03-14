import logoTS from '../assets/ts.png'
import { CreateTodo } from './CreateTodo'

export const Header: React.FC = () => {

  return (
    <header className='header'>
      <h1>To Do <img
        style={{ width: '60px', height: 'auto' }}
        src={logoTS}
      />
      </h1>
      <CreateTodo />
    </header>
  )
}