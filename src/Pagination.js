import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "./store/action";
const Pagination = (props) => {


  const dispatch = useDispatch();
  const { totalCount, currentPage , totalPageCount } = useSelector(state => state.passenger);


  const paginationRange = usePagination({
    currentPage,
    totalCount ,
    siblingCount : 4,
    pageSize : 10,
  });


  if (paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const onPrevious = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  // let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <>
      <ul className="pagination-container">
        <button
          className="btn"
          type="button"
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          PREVIOUS
        </button>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => dispatch(setCurrentPage(pageNumber))}
            >
              {pageNumber}
            </li>
          );
        })}
        <button
          className="btn"
          type="button"
          disabled={currentPage === totalPageCount}
          onClick={onNext}
        >
          NEXT
        </button>
      </ul>
    </>
  );
};

export default Pagination;
