import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/common/components/ui/pagination";

interface ProductPaginationProps {
  totalPages: number;
}

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");

  if (isNaN(page) || page < 1) {
    throw new Error("Invalid page");
  }

  return (
    <Pagination>
      <PaginationContent>
        {page === 1 ? null : (
          <>
            <PaginationItem>
              <PaginationPrevious to={`?page=${page - 1}`} preventScrollReset />
            </PaginationItem>
            {page > 2 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink to={`?page=${page - 1}`} preventScrollReset>
                {page > 1 ? page - 1 : null}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink to={`?page=${page}`} isActive preventScrollReset>
            {page}
          </PaginationLink>
        </PaginationItem>

        {page === totalPages ? null : (
          <>
            <PaginationItem>
              <PaginationLink to={`?page=${page + 1}`} preventScrollReset>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            {page < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationNext to={`?page=${page + 1}`} preventScrollReset />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
