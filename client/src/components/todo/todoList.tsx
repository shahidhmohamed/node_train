import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

interface Item {
  _id?: string;
  name: string;
  description: string;
}

const TodoList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const deleteItem = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    setItems(items.filter((item) => item._id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, [items]);

  return (
    <div className="bg-[#242424] max-w-lg w-full h-auto mx-auto p-4 rounded-xl">
      <div>
        <div className="text-white space-y-8 mt-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative text-white  border rounded-lg p-4"
            >
              <div className="absolute -top-4 left-4  px-2 text-lg font-bold border bg-[#242424] rounded-lg">
                {item.name}
              </div>
              <div className="pt-4 flex items-center justify-between">
                <div className="flex-grow text-center">{item.description}</div>
                <button onClick={() => deleteItem(item._id!)}>
                  <MdOutlineDelete className="text-lg cursor-pointer" />
                </button>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
