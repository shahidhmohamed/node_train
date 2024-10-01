import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
  id?: string;
  name: string;
  description: string;
  item_code: string;
  img?: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const deleteProduct = async (id: string) => {
    await axios.delete(`http://localhost:5001/api/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error Fetching Products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-5 text-white">
      <table className="table-auto w-full text-left text-white">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Item Code</th>
            <th className="px-4 py-2">Img</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || index} className="border-b">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">{product.item_code}</td>
              <td className="px-4 py-2">
                {product.img && (
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-2 space-x-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id!)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
