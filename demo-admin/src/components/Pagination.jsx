import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PaginationComponent = ({
  totalOrders,
  ordersPerPage,
  currentPage,
  paginate,
  setOrdersPerPage,
}) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const rangeSize = 2;

  const start = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
  const end = Math.min(start + rangeSize - 1, totalPages);

  const handleChange = (value) => {
    setOrdersPerPage(Number(value));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <p className="w-28">Items per page</p>
        <Select value={ordersPerPage.toString()} onValueChange={handleChange}>
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
            </PaginationItem>
          )}
          {start > 1 && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
              </PaginationItem>
              {start > 2 && <PaginationEllipsis />}
            </>
          )}
          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => paginate(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {end < totalPages && (
            <>
              {end < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink onClick={() => paginate(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => paginate(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;