import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Calendar } from "lucide-react";
import Pagination from "./Pagination";

const Dashboard = ({ orders }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [sortCriteria, setSortCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(7);

  useEffect(() => {
    // Create a copy of the orders array
    let updatedOrders = [...orders];
    
    // Filter orders based on the active tab
    if (activeTab !== "all") {
      updatedOrders = orders.filter((order) => order.status === activeTab);
    }

    // Define priority and status order for sorting
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const statusOrder = {
      "Pending": 1,
      "In Transit": 2,
      "Completed": 3,
      "Returned": 4,
      "Cancelled": 5,
    };
    // Sorting orders based on the sort criteria
    if (sortCriteria === "date") {
      updatedOrders = updatedOrders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sortCriteria === "priority") {
      updatedOrders = updatedOrders.sort((a, b) => {
        return (
          (priorityOrder[a.priority]) - (priorityOrder[b.priority])
        );
      });
    } else if (sortCriteria === "status") {
      updatedOrders = updatedOrders.sort((a, b) => {
        return (statusOrder[a.status]) - (statusOrder[b.status]);
      });
    }

    setFilteredOrders(updatedOrders);
  }, [activeTab, sortCriteria, orders]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const handleChange = (value) => {
    setSortCriteria(value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4" style={{marginLeft: "-5px"}}>Orders</h1>
      <div className="bg-gray-300 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Calendar />
            <p>Today</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="space-y-2">
            <p>Total orders</p>
            <p>{orders.length}</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="space-y-2">
            <p>Delivered over time</p>
            <p>{orders.filter(item => item.status === "Completed").length}</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="space-y-2">
            <p>Returns</p>
            <p>{orders.filter(item => item.status === "Returned").length}</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="space-y-2">
            <p>Avg. order value</p>
            <p>{(orders.reduce((acc, order) => acc + order.total, 0)/orders.length).toFixed(2)}</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="space-y-2">
            <p>Total order amount</p>
            <p>{(orders.reduce((acc, order) => acc + order.total, 0)).toFixed(2)}</p>
          </div>
          <div class="border-r border-black"></div>
          <div className="flex items-center">
            <p>Order Dashboard </p>
            <MdKeyboardArrowRight size={30}/>
          </div>
        </div>
      </div>
      <div className="tabs mb-4 space-x-10 mt-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 ${
            activeTab === "all"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setActiveTab("Pending")}
          className={`px-4 py-2 ${
            activeTab === "Pending"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("In Transit")}
          className={`px-4 py-2 ${
            activeTab === "In Transit"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          In Transit
        </button>
        <button
          onClick={() => setActiveTab("Completed")}
          className={`px-4 py-2 ${
            activeTab === "Completed"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab("Cancelled")}
          className={`px-4 py-2 ${
            activeTab === "Cancelled"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          Cancelled
        </button>
        <button
          onClick={() => setActiveTab("Returned")}
          className={`px-4 py-2 ${
            activeTab === "Returned"
              ? "text-bold border-b-2 border-black"
              : "hover:text-bold"
          }`}
        >
          Returns
        </button>
      </div>
      <div className="mb-4 max-w-[150px]">
        <Select value={sortCriteria} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="status">Status</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table className="mb-6 bg-gray-300 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.name}</TableCell>
              <TableCell>
                {(() => {
                  const date = new Date(order.date);
                  const options = { month: "short" };
                  const month = date.toLocaleString("en-US", options);
                  const day = date.getDate();
                  let hours = date.getHours();
                  const minutes = date.getMinutes().toString().padStart(2, "0");
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12 || 12;
                  return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
                })()}
              </TableCell>
              <TableCell>{order.priority}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                ₹ <span>{order.total}</span>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        totalOrders={filteredOrders.length}
        ordersPerPage={ordersPerPage}
        paginate={paginate}
        currentPage={currentPage}
        setOrdersPerPage={setOrdersPerPage}
      />
    </div>
  );
};

export default Dashboard;
