import React, { useContext, useEffect, useState } from "react";

import { IssueContext } from "../context/IssueContext";
const ReturnBook = () => {

  // const [sentId, setSentId] = useState();


  // const { userBookId } = useContext(IssueContext);

  // const issueId = sentId;

  return (
    <div>
      {userBookId && userBookId.length > 0 ? (
        userBookId.map((book, idx) => (
          <div
            key={idx} // Add a unique key for each element
            className="group perspective mx-4 my-6 flex flex-col-reverse"
          >
            <div className="relative h-64 w-48 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-100 transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-xl font-bold text-gray-800">ß
                  {book.Book.name}
                </h2>
                <>{console.log("objectokok", book)}</>
               
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books issued.</p>
      )}
    </div>
  );
};

export default ReturnBook;
