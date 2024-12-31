import React, { useState } from "react";
import { FiSearch, FiDownload, FiColumns } from "react-icons/fi";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

export default function Header({
  data,
  columns,
  visibleColumns,
  setVisibleColumns,
  filtering,
  setFiltering,
  handleDownloadCSV,
  handleDownloadPDF,
}) {
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(false);
  const [columnAnchorEl, setColumnAnchorEl] = useState(false);

  const toggleColumnVisibility = (accessorKey) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.accessorKey === accessorKey
          ? { ...col, isVisible: !col.isVisible }
          : col
      )
    );
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4 p-4 bg-white shadow rounded-md">
      {/* Total Records */}
      <p className="text-lg font-medium text-gray-700">
        Total: <span className="font-semibold">{data.length}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Column Visibility */}
        <div className="relative">
          <button
            onClick={() => setColumnAnchorEl(!columnAnchorEl)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <FiColumns size={20} />
          </button>
          {columnAnchorEl && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-2 space-y-1">
                {columns.map((col) => (
                  <label
                    key={col.accessorKey}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.some(
                        (visibleCol) =>
                          visibleCol.accessorKey === col.accessorKey &&
                          visibleCol.isVisible
                      )}
                      onChange={() => toggleColumnVisibility(col.accessorKey)}
                      className="hidden"
                    />
                    {visibleColumns.some(
                      (visibleCol) =>
                        visibleCol.accessorKey === col.accessorKey &&
                        visibleCol.isVisible
                    ) ? (
                      <BsCheckSquare size={18} className="text-blue-600" />
                    ) : (
                      <BsSquare size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm text-gray-700">{col.header}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Download Menu */}
        <div className="relative">
          <button
            onClick={() => setDownloadAnchorEl(!downloadAnchorEl)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <FiDownload size={20} />
          </button>
          {downloadAnchorEl && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                onClick={handleDownloadCSV}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Download CSV
              </button>
              <button
                onClick={handleDownloadPDF}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <FiSearch
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
