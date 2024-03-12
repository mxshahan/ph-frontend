import React, { ChangeEvent, DragEvent } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp } from "react-icons/fa";
import lodash from "lodash";

import { Select } from "./Select";
import { Spin } from "./Spin";
import { Pagination } from "./Pagination";
import { twMerge } from "tailwind-merge";
import { TableHeaderType } from "../interfaces";

interface ITable {
  id?: string;
  tableId?: string;
  headers: TableHeaderType[];
  data: any[];
  sortColumn?: string;
  orderby?: string;
  onRowClick?: Function;
  onHeadingClick?: Function;
  skip?: number;
  take?: number;
  total?: number;
  onLeft?: Function;
  onRight?: Function;
  className?: string;
  onPageSizeChange?: Function;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChangePage?: (pagination: { page: number; pageSize: number }) => any;
  stripe?: boolean;
  pageSizeOption?: number[];
  headerHidden?: boolean;
  paginationHidden?: boolean;
  draggable?: boolean;
  // eslint-disable-next-line no-unused-vars
  onDragStart?: (event: DragEvent<HTMLTableRowElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onDragEnd?: (e: DragEvent<HTMLTableRowElement>) => void;
}

export function TablePlus({
  id,
  tableId,
  data,
  headers,
  sortColumn,
  orderby,
  onRowClick,
  onHeadingClick,
  skip,
  take,
  total,
  onLeft,
  onRight,
  className,
  onPageSizeChange,
  loading = false,
  onChangePage,
  stripe = true,
  pageSizeOption,
  headerHidden = false,
  paginationHidden = false,
  draggable,
  onDragStart,
  onDragEnd,
  ...props
}: ITable) {
  return (
    <div
      {...props}
      id={id}
      className={"flex flex-col w-full max-w-full overflow-hidden shadow-xl bg-white " + className}
    >
      <div className="overflow-x-auto  ">
        <div className="align-middle inline-block w-full">
          <div className=" border-b border-gray-200 sm:rounded-lg w-full">
            <Spin spinning={loading}>
              <table className="w-full divide-y divide-gray-200 table-auto border border-gray-100" id={tableId}>
                <thead className={`bg-gray-50  ${headerHidden ? "hidden" : ""}`}>
                  <tr>
                    {headers.map(({ sort = true, ...e }, i) => {
                      return (
                        <th
                          key={i}
                          scope="col"
                          className={
                            "px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider " +
                            (typeof e === "string" ? "" : "cursor-pointer")
                          }
                          onClick={() => {
                            if (sort && onHeadingClick) onHeadingClick(e);
                          }}
                          style={{ width: e.width }}
                        >
                          {typeof e === "string" ? (
                            e
                          ) : (
                            <span className="flex items-center">
                              <p>{e.name}</p>
                              {sort && sortColumn === e.value ? (
                                orderby === "ASC" ? (
                                  <FaChevronDown className="ml-2" />
                                ) : orderby === "DESC" ? (
                                  <FaChevronUp className="ml-2" />
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          )}
                          {}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td className="p-10 text-center text-gray-400" colSpan={100}>
                        No records found
                      </td>
                    </tr>
                  ) : (
                    data.map((e, i) => {
                      return (
                        <tr
                          key={e.id || i}
                          className={
                            (stripe ? (i % 2 !== 0 ? "bg-white " : "bg-gray-200 ") : "border-b ") +
                            (onRowClick ? "cursor-pointer" : "")
                          }
                          draggable={draggable}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                        >
                          {headers.map((f, headerIndex) => {
                            let render = "";
                            if (f.render) {
                              render = f.render(e, i);
                            } else if (f.value) {
                              if (typeof lodash.get(e, f.value) === "string") {
                                render = lodash.get(e, f.value);
                              } else if (lodash.get(e, f.value) !== null) {
                                render = JSON.stringify(lodash.get(e, f.value));
                              }
                            }
                            return (
                              <td
                                key={"header_" + i + "_" + headerIndex}
                                className={twMerge("px-6 py-4 text-sm font-medium text-gray-900 ", f.className)}
                                onClick={(event) => {
                                  if (event.view.document.getSelection()?.type === "Range") return;
                                  else if (f.disableRowClick) return;
                                  else if (onRowClick) onRowClick(e);
                                }}
                              >
                                {render || f.default}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </Spin>
          </div>
        </div>
      </div>
      <div className={`pagination mt-5 ${paginationHidden ? "hidden" : ""}`}>
        {skip !== undefined && total !== undefined ? (
          <div className="flex justify-between px-2 py-2">
            {onPageSizeChange ? (
              <Select
                id="limit"
                label="Number of Rows"
                options={
                  pageSizeOption
                    ? [
                        { name: "All", value: "" },
                        ...pageSizeOption.map((s) => ({ name: s.toString(), value: s.toString() })),
                      ]
                    : [
                        { name: "All", value: "" },
                        { name: "10", value: "10" },
                        { name: "20", value: "20" },
                        { name: "50", value: "50" },
                        { name: "100", value: "100" },
                      ]
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (onPageSizeChange) {
                    onPageSizeChange(e.target.value ? parseInt(e.target.value) : undefined);
                  }
                }}
                value={`${take}`}
                className="flex flex-row items-center gap-3 w-20/100"
              />
            ) : (
              <span></span>
            )}
            {take !== undefined ? (
              onChangePage ? (
                <Pagination
                  total={total}
                  page={Math.floor(skip / take) + 1}
                  pageSize={take}
                  onChangePage={onChangePage}
                />
              ) : (
                <div className="flex items-center justify-center">
                  <FaChevronLeft
                    className="text-md mr-2 cursor-pointer"
                    onClick={() => {
                      if (onLeft) onLeft();
                    }}
                  />
                  <p className="text-lg">
                    {skip + 1} - {Math.min(total, skip + take)} of {total}
                  </p>
                  <FaChevronRight
                    className="text-md ml-2 cursor-pointer"
                    onClick={() => {
                      if (onRight) onRight();
                    }}
                  />
                </div>
              )
            ) : (
              <span></span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
