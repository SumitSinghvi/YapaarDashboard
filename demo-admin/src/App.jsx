import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./components/SideBar";
import { CiBullhorn } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/all`);
        console.log(response)
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders based on search query
  useEffect(() => {
    const searchResults = orders.filter(order =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery)
    );
    setFilteredOrders(searchResults);
  }, [searchQuery, orders]);

  console.log(filteredOrders);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 p-4 flex flex-col bg-gray-300 h-[10%]">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search Something..."
            className="outline-none p-2 border rounded-md w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex space-x-4">
            <CiBullhorn className="text-3xl" />
            <CiBellOn className="text-3xl" />
            <VscAccount className="text-3xl" />
          </div>
        </div>
        <Dashboard orders={filteredOrders} />
      </div>
    </div>
  );
};

export default App;
