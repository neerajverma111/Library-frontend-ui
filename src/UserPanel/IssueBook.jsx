import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";

const IssuedBooks = () => {
  const { issuedBooks } = useContext(BookContext);
  console.log(issuedBooks);
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-4">Issued Books</h2>

      {issuedBooks.length > 0 ? (
        <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-lg">#</th>
              <th className="px-4 py-2 text-lg">Book ID</th>
              <th className="px-4 py-2 text-lg">User ID</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-2 text-base">{idx + 1}</td>
                <td className="px-4 py-2 text-base">{book.bookModelId}</td>
                <td className="px-4 py-2 text-base">{book.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No books issued yet.</p>
      )}
    </div>
  );
};

export default IssuedBooks;
