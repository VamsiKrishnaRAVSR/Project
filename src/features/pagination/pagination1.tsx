import React, { useCallback, useMemo, useState } from "react";
import { Button } from "react-bootstrap";

// const Pagination = (props: {
//   itemsPerPage: any;
//   totalLength: any;
//   paginate: any;
// }) => {
// const pageNumbers = [];
// const { itemsPerPage, totalLength, paginate } = props;

// for (let i = 1; i <= Math.ceil(totalLength / itemsPerPage); i++) {
//   pageNumbers.push(i);
// }
//   console.log(itemsPerPage);
//   console.log(totalLength);
//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li key={number} className="page-item">
//             <a href="!#" onClick={() => paginate(number)} className="page-link">
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

interface PaginationProps {
  itemsPerPage: number;
  totalLength: number | undefined;
  paginate: (number: string | number) => void;
  currentPageNo: Number;
}

const Pagination = (props: PaginationProps) => {
  const { itemsPerPage, totalLength = 0, paginate, currentPageNo } = props;
  const pageCount = Math.ceil(totalLength / itemsPerPage);
  const [pageNumber, setPageNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");



  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[0-9]*$/i)) {
      setErrorMsg("");
      setPageNumber(e.target.value);
    } else {
      setErrorMsg("Please Enter only Numbers");
    }
  }, []);

  const handleOnBlur = useCallback(() => {
    return parseInt(pageNumber) <= pageCount && pageNumber !== ""
      ? paginate(pageNumber)
      : (setErrorMsg(`Please Enter between 1 - ${pageCount}`),
        paginate(pageCount));
  }, [pageCount, pageNumber, paginate]);

  const currentPageString = useMemo(() => {
    if (totalLength !== 0) {
      setErrorMsg("");
      const currentPageNumber = ((currentPageNo as number) - 1) * 10;
      const lastIndexNumber =
        currentPageNumber + 10 > totalLength
          ? totalLength
          : currentPageNumber + 10;
      return `Showing ${currentPageNumber} to ${lastIndexNumber} of ${totalLength} results`;
    } else {
      setErrorMsg("No results found");
    }
  }, [currentPageNo, totalLength]);

  return (
    <>
      <div>
        <Button
          disabled={currentPageNo <= 1}
          onClick={() => paginate((currentPageNo as number) - 1)}
        >{`<`}</Button>
        <input
          type="text"
          value={pageNumber}
          onBlur={handleOnBlur}
          onChange={handleChange}
        />
        {errorMsg && <span>{errorMsg}</span>}
        {/* <input
          min={1}
          max={pageCount}
          type="range"
          value={currentPageNo as number}
          onChange={(e) => paginate(e.target.value)}
        /> */}
        <Button
          disabled={currentPageNo >= pageCount}
          onClick={() => paginate((currentPageNo as number) + 1)}
        >{`>`}</Button>
      </div>

      {currentPageNo > 0 && currentPageNo <= pageCount ? (
        <p>{currentPageString}</p>
      ) : totalLength !== 0 ? (
        <p>Please Select in range</p>
      ) : null}
    </>
  );
};

export default Pagination;
