import {createContext, useContext} from "react"

// createContext: This function from React is used to create a Context. A context allows you to share values like state or functions across different components in a React application, without having to pass props down manually through every level of the component tree.
// useContext: This is a React hook that allows you to consume the value from a context. Once a context is created, useContext can be used inside any component to access the context value.


export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

// addTodo, updateTodo, deleteTodo, and toggleComplete: These are placeholder functions that will be used to manipulate the todos array. They are defined as empty functions (() => {}) for now, but they are intended to be implemented later to handle adding, updating, deleting, and toggling the completion of to-do items.

export const useTodo = () => {
    return useContext(TodoContext)
}

// The useTodo custom hook is simply a convenient way to access the context without needing to directly use useContext(TodoContext) in every component. It provides a cleaner API for other components to consume the context.
// For example, instead of writing const value = useContext(TodoContext) in every component, you can just use const value = useTodo().

export const TodoProvider = TodoContext.Provider

// You can wrap your component tree in a TodoProvider to make this state and functions available to any component in the tree.

// TodoContext.Provider: Every context in React has a Provider component, which allows the values in the context (such as todos, addTodo, etc.) to be passed down to any component that consumes the context.

// By exporting TodoContext.Provider as TodoProvider, you're allowing other parts of your application to use the TodoProvider as a wrapper component, which will provide the context value to the component tree.

// How to use it?

// In the component tree, you'd wrap your components that need access to the TodoContext with the TodoProvider component. This allows those components to consume the context and access todos, addTodo, updateTodo, and the other functions defined in the context.
// Example usage:

// javascript
// Copy
// <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
//   <YourComponent />
// </TodoProvider>