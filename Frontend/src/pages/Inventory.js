import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]);

  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);                             
      })
      .catch((err) => console.log(err));
  };

  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/product/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-purple-600 rounded p-4">
          <div className="flex justify-start items-center">
            <span className="font-mono font-bold text-2xl text-white">
              Inventory Management
            </span>
          </div>
        </div>
        <div className="bg-white rounded p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-blue-600">
                Overall Inventory
              </span>
              <div className="flex items-center px-3 border rounded-lg">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none text-sm"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addProductModalSetting}
            >
              Add Product
            </button>
          </div>

          <div className="flex flex-wrap justify-between mb-6">
            <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm m-2">
              <span className="text-blue-600 text-lg font-semibold">Total Products</span>
              <span className="text-gray-700 text-xl font-bold">{products.length}</span>
              <span className="text-gray-400 text-sm">Last 7 days</span>
            </div>
            <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm m-2">
              <span className="text-yellow-600 text-lg font-semibold">Stores</span>
              <span className="text-gray-700 text-xl font-bold">{stores.length}</span>
              <span className="text-gray-400 text-sm">Last 7 days</span>
            </div>
            <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm m-2">
              <span className="text-purple-600 text-lg font-semibold">Top Selling</span>
              <span className="text-gray-700 text-xl font-bold">5</span>
              <span className="text-gray-400 text-sm">Last 7 days</span>
            </div>
            <div className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm m-2">
              <span className="text-red-600 text-lg font-semibold">Low Stocks</span>
              <span className="text-gray-700 text-xl font-bold">12</span>
              <span className="text-gray-400 text-sm">Ordered</span>
            </div>
          </div>

          {showProductModal && (
            <AddProduct
              addProductModalSetting={addProductModalSetting}
              handlePageUpdate={handlePageUpdate}
            />
          )}
          {showUpdateModal && (
            <UpdateProduct
              updateProductData={updateProduct}
              updateModalSetting={updateProductModalSetting}
            />
          )}

          <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Products</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Manufacturer</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Stock</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Description</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Availability</th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((element, index) => (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-900">{element.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.manufacturer}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.stock}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.description}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{element.stock > 0 ? "In Stock" : "Not in Stock"}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span className="text-green-700 cursor-pointer" onClick={() => updateProductModalSetting(element)}>
                        Edit
                      </span>
                      <span className="text-red-600 px-2 cursor-pointer" onClick={() => deleteItem(element._id)}>
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
