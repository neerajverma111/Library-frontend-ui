import React, { memo } from "react";
import moment from "moment-timezone";

const TableRow = memo(
  ({ book, idx,fetchReturn, bookName }) => {
    // console.log("this is comming.........", bookName);
    // console.log({ book, idx, fetchReturn });
    return (
      <tr
        key={idx}
        className="border-t hover:bg-gray-50 transition duration-200 text-center"
      >
        <td className="px-4 py-2 text-base">{idx + 1}</td>
        <td className="px-4 py-2 text-base">
          {/* {book.Book && bookName ? bookName : "No book available"} */}
          {bookName}
        </td>
        <td className="px-4 py-2 text-base">
          {book.issueTime
            ? moment(book.issueTime).tz("Asia/Kolkata").format("DD-MM-YYYY")
            : "No issue time"}
        </td>
        <td className="px-4 py-2 text-base text-center">
          {book.issueTime
            ? moment(book.issueTime).tz("Asia/Kolkata").format("HH:mm:ss")
            : "No issue time"}
        </td>
        <td className="px-4 py-2 text-base text-center">
          <button
            onClick={() => fetchReturn(book.id)}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Return
          </button>
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for props

    return (
      prevProps.book.id === nextProps.book.id && prevProps.idx === nextProps.idx
    );
  }
);

export default TableRow;

// export default memo(TableRow);
