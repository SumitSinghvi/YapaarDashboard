import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Pagination Component
const Pagination = ({
  totalOrders,
  ordersPerPage,
  paginate,
  currentPage,
  setOrdersPerPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const rangeSize = 2;

  // total page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Determine the range to display
  const start = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
  const end = Math.min(start + rangeSize - 1, totalPages);

  // Adjust the start if end is at the last page
  const adjustedStart = Math.max(end - rangeSize + 1, 1);

  const handleChange = (value) => {
    setOrdersPerPage(value);
  };
  return (
    <nav>
      <ul className="flex justify-between mt-4 space-x-2">
        <div className="flex items-center space-x-2">
          <p className="w-28">Items per page</p>
          <Select value={ordersPerPage} onValueChange={handleChange}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex">
          {adjustedStart > 1 && (
            <li>
              <a
                onClick={() => paginate(adjustedStart - 1)}
                className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
              >
                &laquo; Prev
              </a>
            </li>
          )}

          {/* Page Number(s) */}
          {adjustedStart > 1 && (
            <>
              {adjustedStart > 2 && (
                <li>
                  <span className="px-4 py-2 border rounded-md text-gray-600">
                    ...
                  </span>
                </li>
              )}
            </>
          )}

          {pageNumbers.slice(adjustedStart - 1, end).map((number) => (
            <li key={number}>
              <a
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded-md cursor-pointer ${
                  number === currentPage ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
              >
                {number}
              </a>
            </li>
          ))}

          {/* Next Set */}
          {end < totalPages && (
            <>
              {end < totalPages - 1 && (
                <li>
                  <span className="px-4 py-2 border rounded-md text-gray-600">
                    ...
                  </span>
                </li>
              )}
              <li>
                <a
                  onClick={() => paginate(totalPages)}
                  className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
                >
                  {totalPages}
                </a>
              </li>
            </>
          )}

          {/* Next Page */}
          {currentPage < totalPages && (
            <li>
              <a
                onClick={() => paginate(currentPage + 1)}
                className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200"
              >
                Next &raquo;
              </a>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
