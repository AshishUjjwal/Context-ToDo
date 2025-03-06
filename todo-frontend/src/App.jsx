import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'

// contexts is a folder not a file then how this catch the todoprovider from index file??

// Great question! When you import from a folder, React (and JavaScript in general) will look for a special file called index.js (or index.ts in TypeScript) inside that folder. If index.js exists, it will automatically be used as the entry point for imports from that folder.
// /src
//   /contexts
//     index.js      // This is where the TodoProvider is exported from
//     TodoContext.js

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  // Function to add a new todo
  const addTodo = (todo) => {
    // `setTodos` updates the state by adding a new todo at the beginning of the list
    setTodos((prev) => [
      { id: Date.now(), ...todo }, // Creates a new todo with a unique ID based on the current timestamp
      ...prev, // Spread the previous todos to add the new todo at the beginning
    ]);
  };

  // Function to update an existing todo
  const updateTodo = (id, todo) => {
    // `setTodos` updates the state by replacing the todo with the matching ID
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? todo : prevTodo // If the todo ID matches, replace it with the new todo
      )
    );
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    // `setTodos` updates the state by filtering out the todo with the matching ID
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // Remove the todo that has the matching ID
  };

    // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    // `setTodos` updates the state by toggling the 'completed' status of the todo with the matching ID
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed } // Toggle 'completed' status
          : prevTodo // If it's not the matched todo, keep it as is
      )
    );
  };

  // useEffect hook to load todos from localStorage when the component mounts
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); // Get the 'todos' from localStorage

    if (todos && todos.length > 0) {
      setTodos(todos); // If there are todos in localStorage, set them as the initial state
    }
  }, []); // Empty dependency array means this effect only runs once when the component mounts

  // useEffect hook to save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Save the current 'todos' array to localStorage
  }, [todos]); // This effect runs whenever the 'todos' state changes

  // You're using JSON.parse and JSON.stringify because the localStorage API only supports storing strings. So, when you want to store more complex data types like arrays or objects (in this case, your to-do list), you need to convert them to strings before saving them. 
  // Similarly, when you retrieve that data from localStorage, you need to convert it back to its original form (like an array or object) so you can work with it in JavaScript.




  // TodoProvider is a component that comes from TodoContext. It is a context provider component provided by React's createContext API.
  // The purpose of the provider is to "provide" the values of the context (in this case, todos, addTodo, updateTodo, deleteTodo, and toggleComplete) to all the child components inside it.
  // value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}:

  // value is a prop that the TodoProvider component accepts.
  // The value prop is an object that will be passed down via the context. This object contains all the values (state and functions) that you want to share across your app.
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
               <div key={todo.id}
                className='w-full'
               >
                <TodoItem todo={todo} />
               </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
