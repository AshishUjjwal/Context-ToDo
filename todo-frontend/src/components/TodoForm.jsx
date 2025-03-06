import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("") // Single todo message only
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("") // make box blank after adding todo
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />

{/* The value prop in your <input /> element is used to bind the input field's value to a piece of state in your React component. This is known as controlled components in React, where the form element (in this case, the input field) is controlled by React state. */}

{/* Example Flow: */}
{/* Initially, when the component first renders, todo might be an empty string (""), so the input field will be empty.
As the user types, the onChange event handler fires, and the state (todo) gets updated to reflect what the user typed.
React will then re-render the component with the new value of todo, and the input field will display that new value.
This ensures the input field's value is always in sync with your state. */}

          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;