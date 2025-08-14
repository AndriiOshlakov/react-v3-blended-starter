import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
