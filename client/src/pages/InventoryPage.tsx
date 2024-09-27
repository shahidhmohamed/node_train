import React, { useState } from "react";
import InventoryHeader from "../components/product/Header/InventoryHeader";
import NewProductForm from "../components/product/NewProductForm";
import ProductList from "../components/product/ProductList";

const InventoryPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const onClickShowForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <div>
      <div>
        <InventoryHeader />
      </div>
      <div>
        <button
          onClick={onClickShowForm}
          className="w-20 h-10 bg-red-700 text-white"
        >
          New
        </button>
      </div>
      <div>{showForm && <NewProductForm />}</div>
      <div>{!showForm && <ProductList />}</div>
    </div>
  );
};

export default InventoryPage;
