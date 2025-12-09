import {
  Pagination as UiPagination,
  PaginationContent as UiPaginationContent,
  PaginationLink as UiPaginationLink,
  PaginationItem as UiPaginationItem,
  PaginationPrevious as UiPaginationPrevious,
  PaginationNext as UiPaginationNext,
  PaginationEllipsis as UiPaginationEllipsis,
} from "@components/ui/pagination";
import { Button } from "@components/ui/button";

function Pagination(props: React.ComponentProps<"nav">) {
  return <UiPagination {...props} />;
}

function PaginationContent(props: React.ComponentProps<"ul">) {
  return <UiPaginationContent {...props} />;
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <UiPaginationItem {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink(props: PaginationLinkProps) {
  return <UiPaginationLink {...props} />;
}

function PaginationPrevious(props: React.ComponentProps<typeof PaginationLink>) {
  return <UiPaginationPrevious {...props} />;
}

function PaginationNext(props: React.ComponentProps<typeof PaginationLink>) {
  return <UiPaginationNext {...props} />;
}

function PaginationEllipsis(props: React.ComponentProps<"span">) {
  return <UiPaginationEllipsis {...props} />;
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};