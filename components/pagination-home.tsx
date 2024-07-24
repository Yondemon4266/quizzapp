"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronFirst, ChevronLast } from "lucide-react";

export default function PaginationHome({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generateNumberPagination = (nbpage: number) => {
    if (nbpage <= 5) {
      return Array.from({ length: nbpage - 1 }, (_, i) => (
        <PaginationItem key={i} className={`cursor-pointer `}>
          <PaginationLink
            href={createPageURL(i + 1)}
            isActive={currentPage === i + 1}
            className={
              currentPage === i + 1 ? "pointer-events-none" : undefined
            }
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ));
    } else {
      if (currentPage <= 3) {
        return Array.from({ length: 4 }, (_, i) => (
          <PaginationItem key={i} className={`cursor-pointer `}>
            <PaginationLink
              href={createPageURL(i + 1)}
              isActive={currentPage === i + 1}
              className={
                currentPage === i + 1 ? "pointer-events-none" : undefined
              }
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ));
      } else if (currentPage >= nbpage - 2) {
        return Array.from({ length: 3 }, (_, i) => (
          <PaginationItem key={i} className={`cursor-pointer `}>
            <PaginationLink
              href={createPageURL(nbpage - 3 + i)}
              isActive={currentPage === nbpage - 3 + i}
              className={
                currentPage === nbpage - 3 + i
                  ? "pointer-events-none"
                  : undefined
              }
            >
              {nbpage - 3 + i}
            </PaginationLink>
          </PaginationItem>
        ));
      } else {
        return Array.from({ length: 4 }, (_, i) => (
          <PaginationItem key={i} className={`cursor-pointer `}>
            <PaginationLink
              href={createPageURL(currentPage - 1 + i)}
              isActive={currentPage === currentPage - 1 + i}
              className={
                currentPage === currentPage - 1 + i
                  ? "pointer-events-none"
                  : undefined
              }
            >
              {currentPage - 1 + i}
            </PaginationLink>
          </PaginationItem>
        ));
      }
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={`cursor-pointer ${
            currentPage === 1 ? "pointer-events-none bg-muted" : ""
          }`}
          aria-disabled={currentPage === 1}
        >
          <PaginationLink href={createPageURL(1)}>
            <ChevronFirst size={16} className="hover:bg-muted" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={`cursor-pointer ${
            currentPage === 1 ? "pointer-events-none" : ""
          }`}
          aria-disabled={currentPage === 1}
        >
          <PaginationPrevious
            href={
              currentPage > 1
                ? createPageURL(currentPage - 1)
                : createPageURL(currentPage)
            }
          />
        </PaginationItem>

        {generateNumberPagination(totalPages)}

        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem className={`cursor-pointer `}>
          <PaginationLink
            href={createPageURL(totalPages)}
            isActive={totalPages === currentPage}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={`cursor-pointer ${
            currentPage === totalPages ? "pointer-events-none" : ""
          }`}
          aria-disabled={currentPage === totalPages}
        >
          <PaginationNext href={createPageURL(currentPage + 1)} />
        </PaginationItem>
        <PaginationItem
          className={`cursor-pointer ${
            currentPage === totalPages ? "pointer-events-none bg-muted" : ""
          }`}
          aria-disabled={currentPage === totalPages}
        >
          <PaginationLink href={createPageURL(totalPages)}>
            <ChevronLast size={16} className="hover:bg-muted" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
