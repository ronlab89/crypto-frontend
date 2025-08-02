import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";

import { useToggleStore } from "@/store/toggle.store";
import type { DataTableProps } from "@/types/datatable";
import Angles from "@/icons/Angles";
import Angle from "@/icons/Angle";
import Search from "@/icons/Search";

const DataTable = <T,>({
  data,
  columns,
  search,
  pagination,
}: DataTableProps<T>) => {
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const setToggleModal = useToggleStore((state) => state.setToggleModal);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    // getSubRows: (row) => row.subrows || [], // si se tiene subfilas con la misma estructura de la fila original
    getRowCanExpand: (row) => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      rowSelection: rowSelection,
      globalFilter: filtering,
      columnVisibility: { _id: false },
      expanded,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  // Selected rows
  // useEffect(() => {
  //   handleDataRows(table.getSelectedRowModel().rows.map((x) => x.original));
  // }, [table.getSelectedRowModel()]);

  return (
    <section
      className={`w-full min-h-[80vh] max-h-full p-2 text-sm relative z-10`}
    >
      <article className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          {/* Input search */}
          {!search ? null : (
            <div className="relative w-[300px]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search
                  width={15}
                  height={15}
                  styles={"text-crypto-dark/50 dark:text-crypto-light/50"}
                />
              </div>
              <input
                type="search"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                id="default-search"
                className="ps-10 text-sm mb-0 flex pl-12 h-9 w-full rounded-[.5rem] border border-crypto-dark dark:border-crypto-light bg-transparent px-3 py-1 shadow-sm transition-colors font-medium text-crypto-dark dark:text-crypto-light placeholder:text-crypto-dark/50 dark:placeholder:text-crypto-light/50 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crypto-yellow disabled:cursor-not-allowed disabled:opacity-50
              "
                placeholder="Buscar"
                required
              />
            </div>
          )}
        </div>
      </article>
      {/* Table */}
      <table
        className={`w-full h-full overflow-hidden ${
          !search ? "mt-0" : "mt-10"
        } z-10 relative`}
      >
        <thead
          className={`text-center font-medium tracking-[0.01rem] z-10 bg-crypto-yellow/50 dark:bg-crypto-yellow/50 text-crypto-dark`}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className={`w-full tex-center border border-crypto-dark/50 dark:border-crypto-light/50`}
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`text-center py-3 ${
                    index === 0
                      ? ""
                      : index === headerGroup.headers.length - 1 && ""
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {header.column.getIsSorted() === "asc"
                    ? "△"
                    : header.column.getIsSorted() === "desc"
                    ? "▽"
                    : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-hidden rounded-b-[.5rem] z-10 text-[0.8rem]">
          {table.getRowModel().rows.length < 1 ? (
            <tr className="font-medium text-xl">
              <td
                colSpan={table.getAllColumns().length}
                className="text-center py-10"
              >
                No se encontraron datos
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, indexRow) => (
              <React.Fragment key={row.id}>
                <tr
                  className={`border border-crypto-dark/50 dark:border-crypto-light/50 hover:bg-crypto-dark/10 dark:hover:bg-crypto-light/10 ${
                    indexRow === table.getRowModel().rows.length - 1
                      ? "rounded-b-[.5rem]"
                      : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`text-center py-2`}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={`text-center`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {/* Pagination */}
      {pagination ? (
        <article
          className={`w-full flex justify-between items-center gap-1 mt-5`}
        >
          <div className="flex justify-center items-center gap-2 ml-5">
            <label htmlFor="select-page-size">Mostrar</label>
            <select
              id="select-page-size"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="bg-transparent"
            >
              {[5, 7, 10, 20, 30, 40, 50].map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="text-crypto-dark dark:text-crypto-dark"
                >
                  {pageSize}
                </option>
              ))}
            </select>
            <span>por página</span>
          </div>

          <div className="flex justify-center items-center gap-2 mr-5 z-10">
            <div className="flex justify-center items-center gap-2">
              <span>Página</span>
              <span>{table.getState().pagination.pageIndex + 1}</span>
              <span>de</span>
              <span>{table.getPageCount()}</span>
            </div>
            <div
              onClick={() => table.setPageIndex(0)}
              className={`${
                table.getState().pagination.pageIndex === 0
                  ? "cursor-pointer text-dizlogik-800 hover:border-crypto-yellow"
                  : "text-crypto-dark"
              } group w-8 h-8 border-[1.5px] border-crypto-dark/50 dark:border-crypto-light/50 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
            >
              <Angles
                width={12.8}
                height={12.8}
                styles={"group-hover:text-crypto-yellow"}
              />
            </div>
            <div
              onClick={() => table.previousPage()}
              className={`${
                table.getState().pagination.pageIndex === 0
                  ? "cursor-pointer text-dizlogik-800 hover:border-crypto-yellow"
                  : "text-crypto-dark"
              } group w-8 h-8 border-[1.5px] border-crypto-dark/50 dark:border-crypto-light/50 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
            >
              <Angle
                width={12.8}
                height={12.8}
                styles={"group-hover:text-crypto-yellow"}
              />
            </div>
            <div
              onClick={() => {
                if (
                  table.getState().pagination.pageIndex + 2 <=
                  table.getPageCount()
                ) {
                  table.nextPage();
                }
              }}
              className={`${
                table.getState().pagination.pageIndex + 2 <=
                table.getPageCount()
                  ? "cursor-pointer text-dizlogik-800 hover:border-crypto-yellow"
                  : "text-crypto-dark"
              } group w-8 h-8 border-[1.5px] border-crypto-dark/50 dark:border-crypto-light/50 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
            >
              <Angle
                width={12.8}
                height={12.8}
                styles={"rotate-[-180deg] group-hover:text-crypto-yellow"}
              />
            </div>
            <div
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              className={`${
                table.getState().pagination.pageIndex + 2 <=
                table.getPageCount()
                  ? "cursor-pointer text-dizlogik-800 hover:border-crypto-yellow"
                  : "text-crypto-dark"
              } group w-8 h-8 border-[1.5px] border-crypto-dark/50 dark:border-crypto-light/50 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
            >
              <Angles
                width={12.8}
                height={12.8}
                styles={"rotate-[-180deg] group-hover:text-crypto-yellow"}
              />
            </div>
          </div>
        </article>
      ) : null}
    </section>
  );
};

export default DataTable;
