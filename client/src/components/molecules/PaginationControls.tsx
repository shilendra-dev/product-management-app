import type { Table } from "@tanstack/react-table";
import Button from "../atoms/Button";

interface PaginationControlsProps<TData> {
  rowCount: number;
  table: Table<TData>;
}

export function PaginationControls<TData>({
  rowCount,
  table,
}: PaginationControlsProps<TData>) {
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="pt-4 flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {pageIndex + 1} of {pageCount} — {rowCount} items
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
