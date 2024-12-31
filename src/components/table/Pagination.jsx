import React from "react";
import {
  FiChevronsLeft,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

export default function Pagination({
  table,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4 bg-white p-4 rounded-md shadow">
      {/* Page Info & Rows Per Page */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">
          Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
          <span className="font-medium">{table.getPageCount()}</span>
        </p>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring focus:ring-blue-200"
        >
          <option value={15}>15</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className={`p-2 rounded-md ${
            table.getCanPreviousPage()
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300"
          }`}
        >
          <FiChevronsLeft size={18} />
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={`p-2 rounded-md ${
            table.getCanPreviousPage()
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300"
          }`}
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={`p-2 rounded-md ${
            table.getCanNextPage()
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300"
          }`}
        >
          <FiChevronRight size={18} />
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className={`p-2 rounded-md ${
            table.getCanNextPage()
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-300"
          }`}
        >
          <FiChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}
