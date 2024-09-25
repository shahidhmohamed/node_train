import React from "react";
import { FaBoxOpen, FaTasks } from "react-icons/fa";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { MdInventory } from "react-icons/md";
import bg from ".//bg_2.mp4";
import { TbMathSymbols } from "react-icons/tb";

const apps = [
  {
    id: 1,
    name: "Inventory",
    icon: <FaBoxOpen className="text-black" />,
    path: "/product",
  },
  {
    id: 2,
    name: "Todo",
    icon: <FaTasks className="text-black" />,
    path: "/todo",
  },
  {
    id: 3,
    name: "Accounting",
    icon: <TbMathSymbols className="text-black" />,
    path: "/todo",
  },
];

const AppScreen: React.FC = () => {
  return (
    <div className="min-h-screen p-4 my-0 mx-0 relative overflow-hidden h-full text-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={bg} // Ensure correct path
        autoPlay
        muted
        loop
      />
      {/* <h1 className="text-4xl font-bold text-center mb-8">Apps</h1> */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-10 gap-6 lg:mx-20 lg:my-32 mx-4 my-7">
        {apps.map((app) => (
          <div key={app.id} className="p-3">
            <a href={app.path} className="block">
              <div className="text-4xl mb-1 flex justify-center bg-white p-4 rounded-lg cursor-pointer text-white">
                {app.icon}
              </div>
            </a>
            <a
              href={app.path}
              className="text-xl sm:text-sm font-semibold mb-2 text-center text-white"
            >
              {app.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppScreen;
