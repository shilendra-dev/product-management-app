import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  flexRender,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/molecules/Table";
import type { Product } from "@/types/product";
import { PaginationControls } from "../molecules/PaginationControls";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  isLoading?: boolean;
  onPaginationChange: OnChangeFn<PaginationState>;
  currentPageIndex: number;
  currentPageSize: number;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  isLoading = false,
  onPaginationChange,
  currentPageIndex,
  currentPageSize,
  setSelectedProduct,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data,
    columns,
    rowCount: rowCount,
    pageCount: Math.ceil(rowCount / currentPageSize),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: currentPageSize,
      },
    },
    onPaginationChange: onPaginationChange,
  });
  
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="border rounded-2xl bg-background overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold p-4 px-6">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setSelectedProduct(row.original as Product)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 px-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControls rowCount={rowCount} table={table} />
    </div>
  );
}
