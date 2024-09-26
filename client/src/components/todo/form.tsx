import React, { useState } from "react";
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
    <div className="bg-[#242424] max-w-lg w-full h-auto mx-auto p-4 rounded-xl mt-10">
      <div className="p-1">
        <span className="text-white text-2xl font-semibold">TODO LIST</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2">
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="h-10 w-full sm:w-auto rounded-sm p-2"
          placeholder="TASK"
        />
        <input
          type="text"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          className="h-10 w-full sm:w-auto rounded-sm p-2"
          placeholder="DESCRIPTION"
        />
        <button
          onClick={createItem}
          className="h-10 w-full sm:w-auto rounded-sm text-black bg-white p-2 font-semibold"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Form;
