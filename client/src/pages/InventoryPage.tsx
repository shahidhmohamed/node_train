import InventoryHeader from "../components/product/Header/InventoryHeader";
import NewProductForm from "../components/product/NewProductForm";

function InventoryPage() {
  return (
    <div>
      <div>
        <InventoryHeader />
      </div>
      <div className="w-full h-auto bg-black text-white p-3">
        <div className="mr-auto">
          <NewProductForm />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
