import React, { useState } from "react";
import axios from "axios";
import { FaCamera, FaTrash } from "react-icons/fa";

interface Product {
  _id?: string;
  name: string;
  description: string;
  img?: string;
}

const NewProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    img: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewProduct({ ...newProduct, img: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewProduct({ ...newProduct, img: "" });
    setImagePreview(null);
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      setProducts([...products, res.data]);
      setNewProduct({ name: "", description: "", img: "" });
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <div className="w-full h-full bg-black p-6">
      <form onSubmit={createProduct} className="max-w-md">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            PRODUCT NAME
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            DESCRIPTION
          </label>
        </div>
        <div className="relative mb-5 group">
          <div className="w-28 h-28 border-2 border-gray-300 rounded-sm cursor-pointer relative bg-gray-100">
            {!imagePreview ? (
              <div className="text-center">
                <FaCamera className="text-gray-500 text-4xl mx-auto my-auto" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full p-2 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-20 h-8 rounded bg-blue-900 text-white hover:bg-slate-800"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
