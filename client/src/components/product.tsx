import React, { useState } from "react";
import axios from "axios";

interface Product {
  _id?: string;
  name: string;
  description: string;
  img: string;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    img: "",
  });

  const createProduct = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/products",
      newProduct
    );
    setProducts([...products, res.data]);
    setNewProduct({ name: "", description: "", img: "" });
  };
  return (
    <div>
      <div className="max-w-lg h-auto bg-gray-600">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="h-7 w-full "
            placeholder="PRODUCT NAME"
          />

          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="h-7 w-full "
            placeholder="DESCRIPTION"
          />
          <input
            type="file"
            value={newProduct.img}
            onChange={(e) =>
              setNewProduct({ ...newProduct, img: e.target.value })
            }
            className="h-7 w-full"
          />
          <button
            onClick={createProduct}
            className="h-10 w-full text-black bg-white"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
