import {
  Table as UiTable,
  TableHeader as UiTableHeader,
  TableBody as UiTableBody,
  TableFooter as UiTableFooter,
  TableRow as UiTableRow,
  TableHead as UiTableHead,
  TableCell as UiTableCell,
  TableCaption as UiTableCaption,
} from "@components/ui/table";

function Table(props: React.ComponentProps<"table">) {
  return <UiTable {...props} />;
}

function TableHeader(props: React.ComponentProps<"thead">) {
  return <UiTableHeader {...props} />;
}

function TableBody(props: React.ComponentProps<"tbody">) {
  return <UiTableBody {...props} />;
}

function TableFooter(props: React.ComponentProps<"tfoot">) {
  return <UiTableFooter {...props} />;
}

function TableRow(props: React.ComponentProps<"tr">) {
  return <UiTableRow {...props} />;
}

function TableHead(props: React.ComponentProps<"th">) {
  return <UiTableHead {...props} />;
}

function TableCell(props: React.ComponentProps<"td">) {
  return <UiTableCell {...props} />;
}

function TableCaption(props: React.ComponentProps<"caption">) {
  return <UiTableCaption {...props} />;
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
