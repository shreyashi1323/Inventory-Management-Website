import React from "react";
import { Link } from "react-router-dom";
import {UserIcon } from "@heroicons/react/24/outline";


function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between bg-gradient-to-b from-purple-600 to-blue-500 hidden lg:flex shadow-lg">
      <div className="px-6 py-8">
        <nav aria-label="Main Nav" className="mt-8 flex flex-col space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl bg-white hover:bg-gray-200 px-5 py-3 text-gray-900 shadow-md"
          >
            <img
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
              className="w-6 h-6"
            />
            <span className="text-md font-semibold"> Dashboard </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-5 py-3 text-gray-900 shadow-md hover:bg-gray-200">
              <Link to="/inventory" className="flex items-center gap-3">
                <img
                  alt="inventory-icon"
                  src={require("../assets/inventory-icon.png")}
                  className="w-6 h-6"
                />
                <span className="text-md font-semibold"> Inventory </span>
              </Link>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-gray-900 shadow-md hover:bg-gray-200"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
              className="w-6 h-6"
            />
            <span className="text-md font-semibold"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-gray-900 shadow-md hover:bg-gray-200"
          >
            <img
              alt="sale-icon"
              src={require("../assets/supplier-icon.png")}
              className="w-6 h-6"
            />
            <span className="text-md font-semibold"> Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-5 py-3 text-gray-900 shadow-md hover:bg-gray-200">
              <Link to="/manage-store" className="flex items-center gap-3">
                <img
                  alt="store-icon"
                  src={require("../assets/order-icon.png")}
                  className="w-6 h-6"
                />
                <span className="text-md font-semibold"> Manage Store </span>
              </Link>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-300">
        <div className="flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-900 p-5 hover:from-gray-600 hover:to-gray-800">
        <UserIcon className="h-8 w-8 text-white" aria-hidden="true" />

          <div className="text-white">
            <p className="text-sm">
              <strong className="block font-bold">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span className="text-xs"> {localStorageData.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
