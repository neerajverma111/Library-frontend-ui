import React, { useContext, useState, useCallback, useMemo } from "react";

import axios from "axios";
import { apiUrl } from "../constants/Constant";
import { toast } from "react-toastify";
import { IssueContext } from "../context/IssueContext";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonLoading from "../constants/Loading/SkeletonLoading";
import TableRow from "../components/TableRow";
// import { throttle } from "../constants/Constant";
const IssuedBooks = () => {
  const { userBookId, getIssueBook } = useContext(IssueContext);
  const memoizedUserBookId = useMemo(() => userBookId, [userBookId]);

  const [returnBook, setReturnBook] = useState();

  const [Loading, setLoading] = useState(false);

  const fetchReturn = useCallback(async (id) => {
    const jwtToken = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.post(
        `http://${apiUrl}/issues/returnBook`,
        {
          issueId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(true);
      if (response.status === 200) {
        console.log("this is issue id ", id);
        setReturnBook(response?.data);
        console.log(response);
        toast.success(response?.data?.message);
      }
      setLoading(false);
      getIssueBook();
    } catch (err) {
      setLoading(false);
      if (err.response.data.message === "jwt expired") {
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
      // getIssueBook();
      console.error("Response Status:", err.response.status);
      console.error("Response Data:", err.response.data);
      setLoading(false);
      toast.error(err.response.data.message || "Something went wrong!");
    }
  }, []);

  // const throttleReturn = throttle((id) => {
  //   return fetchReturn(id);
  // });
  return (
    <>
      {Loading ? (
        <SkeletonLoading />
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Issued Books</h2>

          {userBookId && userBookId.length > 0 ? (
            <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-center">
                  <th className="px-4 py-2 text-lg">#</th>
                  <th className="px-4 py-2 text-lg">Book Name</th>
                  <th className="px-4 py-2 text-lg">Issue Date</th>
                  <th className="px-4 py-2 text-lg">Issue Time</th>
                  <th className="px-4 py-2 text-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {memoizedUserBookId.map((book, idx) => (
                  <TableRow
                    key={book.id}
                    bookName={book.Book.name}
                    book={book}
                    idx={idx}
                    fetchReturn={fetchReturn}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <SkeletonLoading />
          )}
        </div>
      )}
    </>
  );
};

export default IssuedBooks;
