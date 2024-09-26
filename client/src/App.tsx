import { Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "../src/pages/InventoryPage";
import TodoPage from "../src/pages/TodoPage";
import AppScreen from "../src/pages/AppScreen";

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
