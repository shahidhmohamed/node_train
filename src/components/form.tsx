import React, { useState, useEffect } from "react";
import axios from "axios";

interface Item {
  _id?: string;
  name: string;
  description: string;
}

const Form: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: "", description: "" });

  const createItem = async () => {
    const res = await axios.post("http://localhost:5000/api/items", newItem);
    setItems([...items, res.data]);
    setNewItem({ name: "", description: "" });
  };

  return (
    <div>
      <h1>Hello World</h1>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="text"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <button onClick={createItem}>Create Data</button>
    </div>
  );
};

export default Form;
