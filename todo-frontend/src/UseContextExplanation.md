React Auth Context API Implementation
=====================================

### 1\. File Structure

Plaintext

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   src/   ├─ context/   │  └─ AuthContext.jsx   ├─ services/   │  └─ api.js   ├─ components/   │  ├─ Navbar.jsx   │  ├─ Dashboard.jsx   │  └─ Profile.jsx   └─ App.jsx   `

### 2\. Code Implementation

#### **context/AuthContext.jsx**

JavaScript

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   import { createContext, useContext, useEffect, useState } from "react";  import axios from "axios";  const AuthContext = createContext(null);  const api = axios.create({    baseURL: "https://api.example.com",    withCredentials: true,  });  export const AuthProvider = ({ children }) => {    const [user, setUser] = useState(null);    const [loading, setLoading] = useState(true);    const fetchUser = async () => {      try {        const res = await api.get("/api/me");        setUser(res.data);      } catch (error) {        setUser(null);      } finally {        setLoading(false);      }    };    useEffect(() => {      fetchUser();    }, []);    const login = async (credentials) => {      const res = await api.post("/api/login", credentials);      setUser(res.data.user);      return res;    };    const logout = async () => {      await api.post("/api/logout");      setUser(null);    };    return (   `

          `value={{          user,          loading,          login,          logout,          isAuthenticated: !!user,        }}      >        {children}    );  };  export const useAuth = () => {    const context = useContext(AuthContext);    if (!context) {      throw new Error("useAuth must be used within AuthProvider");    }    return context;  };`

#### **App.jsx**

JavaScript

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   import { AuthProvider } from "./context/AuthContext";  import Navbar from "./components/Navbar";  import Dashboard from "./components/Dashboard";  function App() {    return (    );  }  export default App;   `

#### **components/Navbar.jsx**

JavaScript

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   import { useAuth } from "../context/AuthContext";  const Navbar = () => {    const { user, loading } = useAuth();    if (loading) return   Loading...  ;    return (          ### Welcome, {user ? user.name : "Guest"}    );  };  export default Navbar;   `

Interview Definitions
---------------------

If an interviewer asks how you handle authentication in React, use these definitions:

### **1\. What is React Context API?**

> "The Context API is a built-in React feature used to manage **Global State**. It allows us to pass data (like user info or themes) through the component tree without having to pass props down manually at every level (**Prop Drilling**)."

### **2\. Why use a Custom Hook (useAuth)?**

> "A custom hook abstracts the useContext logic. It makes the code cleaner and more readable. It also allows us to add **safety checks**, like throwing an error if a developer tries to use the auth state outside of the AuthProvider."

### **3\. Why use a loading state in Auth Context?**

> "The loading state is crucial for **User Experience (UX)**. When the app first loads, we need to check if a user session exists (via an API call). Without a loading state, the UI might flicker or briefly show the 'Logged Out' view before the API responds."

### **4\. What is withCredentials: true in Axios?**

> "This setting is required when using **Cookies** for authentication. It tells the browser to include the session cookie in every cross-site request, allowing the server to recognize the user."

### **5\. What is Prop Drilling?**

> "Prop Drilling is the process of passing data from a parent component to a deeply nested child component through several middle components that don't actually need the data. Context API solves this by providing a direct 'teleportation' of data to any component."
