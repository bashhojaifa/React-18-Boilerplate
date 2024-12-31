import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header from "./Header";
import Pagination from "./Pagination";
import { handleDownloadCSV, handleDownloadPDF } from "./exportUtils";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

export default function Table({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => ({ ...col, isVisible: true }))
  );

  // React Table instance with state handling
  const table = useReactTable({
    data,
    columns: visibleColumns.filter((col) => col.isVisible),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
      pagination: { pageSize, pageIndex },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: (updater) => {
      const newPaginationState =
        typeof updater === "function"
          ? updater({ pageSize, pageIndex })
          : updater;
      setPageSize(newPaginationState.pageSize);
      setPageIndex(newPaginationState.pageIndex);
    },
  });

  return (
    <>
      {/* Header Controls */}
      <Header
        data={data}
        columns={columns}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        filtering={filtering}
        setFiltering={setFiltering}
        handleDownloadCSV={() =>
          handleDownloadCSV(visibleColumns, data, "table_data.csv")
        }
        handleDownloadPDF={() =>
          handleDownloadPDF(visibleColumns, data, "Table Data")
        }
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-md shadow-sm mt-4">
        <table className="min-w-full table-auto border-collapse border-spacing-0">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-4 text-left text-sm font-semibold uppercase cursor-pointer hover:bg-gray-50"
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <MdArrowDropUp
                              size={20}
                              style={{
                                color:
                                  header.column.getIsSorted() === "asc"
                                    ? "gray"
                                    : "darkgray",
                                marginBottom: "-7px",
                              }}
                            />
                            <MdArrowDropDown
                              size={20}
                              style={{
                                color:
                                  header.column.getIsSorted() === "desc"
                                    ? "gray"
                                    : "darkgray",
                                marginTop: "-7px",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-100 ${
                  rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-1 px-4 text-sm text-gray-700 border-b"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          table={table}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </>
  );
}
