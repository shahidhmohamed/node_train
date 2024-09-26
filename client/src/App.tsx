import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Form from "./components/form";
// import TodoList from "./components/todoList";
import Product from "./components/product";
import TodoPage from "./components/todoApp";
import AppScreen from "./components/app";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<AppScreen />} />
          <Route path="/product" element={<Product />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
