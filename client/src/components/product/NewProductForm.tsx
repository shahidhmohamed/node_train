import React, { useState } from "react";
import axios from "axios";
import { FaCamera, FaTrash } from "react-icons/fa";
import "../Navbar/Navbar.css";

interface Product {
  _id?: string;
  name: string;
  description: string;
  item_code: string;
  img?: string;
  sales_price: string;
  internal_reference: string;
}

const NewProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    item_code: "",
    img: "",
    sales_price: "",
    internal_reference: "",
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
      setNewProduct({
        name: "",
        description: "",
        img: "",
        item_code: "",
        sales_price: "",
        internal_reference: "",
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-6">
      <form onSubmit={createProduct}>
        <div className="flex justify-between mx-auto">
          <div className="h-3/6 w-3/4 mt-8">
            <div className="w-3/6">
              <div className="relative z-0 w-[1000px] mb-5 group">
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="block py-2.5 px-0 w-full text-3xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-focus:border-yellow-500 peer-focus:focus:border-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  PRODUCT NAME
                </label>
              </div>
              <div className="h-10 w-full left-0 text-xl text-white font-semibold">
                GENERAL INFORMATION
              </div>
              <div className="relative z-0 w-full mb-5 group mt-1">
                <input
                  type="text"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-300 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  DESCRIPTION
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={newProduct.item_code}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, item_code: e.target.value })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-yellow-400
                  focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-lg text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  ITEM CODE
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={newProduct.sales_price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      sales_price: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-yellow-400
                  focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-lg text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  SALES PRICE
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  value={newProduct.internal_reference}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      internal_reference: e.target.value,
                    })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-red-600 appearance-none dark:text-white dark:border-red-600 dark:focus:border-yellow-400
                  focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  required
                />
                <label className="peer-focus:font-medium absolute text-lg text-white dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  INTERNAL REFERENCE
                </label>
              </div>
            </div>
          </div>
          <div className="h-28 w-3/12 flex justify-center">
            <div className="w-24 h-24 cursor-pointer relative bg-gray-100 rounded-md">
              {!imagePreview ? (
                <div className="text-center mt-7">
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
                    className="w-24 h-24 object-cover rounded-md p-1"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 rounded-full p-2 text-red-700 text-2xl"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
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
