import React, { useContext, useState, useEffect } from "react";
import { IssueContext } from "../context/IssueContext";
// import { decodeToken } from "../constants/Jwt-Decode";
import Button from "../constants/Button";
import { apiUrl } from "../constants/Constant";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment-timezone";
import SkeletonLoading from "../constants/Loading/SkeletonLoading";
import { throttle } from "../constants/Constant";
import { useQueryClient } from "@tanstack/react-query";
// import { getIssueBook } from "../Api/Api";
// import { getIssueBook } from "../Api/Api";

const Payfine = () => {
  // const { userBookId, getIssueBook } = useContext(IssueContext);
  // console.log("object");
  // debugger;
  // const queryClient = useQueryClient();
  // const { data, isLoading, Loading, isError, error } = useQuery({
  //   queryKey: ["issueBook"],
  //   queryFn: getIssueBook,
  // });

  // console.log("data", data);
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData(
    ["issueBook"]
  );


  // console.log("datatatatatata", cachedData);
  const jwtToken = localStorage.getItem("token");
  const [fineMessage, setFineMessage] = useState();
  const [Loading, setLoading] = useState(false);

  const fetchPayFine = async (id, fine) => {
    // console.log("fine................", fine);
    try {
      const response = await axios.post(
        `http://${apiUrl}/issues/payfine/${id}`,
        {
          issueId: id,
          fine: fine,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setLoading(true);
      if (response.status === 200) {
        setFineMessage(response?.data);

        toast.success(response?.data.message);

        setLoading(false);
      }
      // getIssueBook();
    } catch (err) {
      if (err.status === 400) {
        toast.error(err.response.data.message);
      }
      if (err.response.data.message === "jwt expired") {
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
        }, 3000);
        console.error("Response Data:", err.response.data);
        // toast.error(err.response.message || "Something went wrong!");
      }
    }
  };

  const throttlePayFine = throttle((id, fine) => {
    fetchPayFine(id, fine);
    console.log("workingggg.......");
  }, 3000);

  return (
    <>
      {Loading ? (
        <SkeletonLoading />
      ) : (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-4">Books Fine's</h2>

          {cachedData && cachedData.length > 0 ? (
            <table className="min-w-full text-left text-sm border border-gray-200 bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="text-center">
                  <th className="px-4 py-2 text-lg">#</th>
                  <th className="px-4 py-2 text-lg">Book ID</th>
                  <th className="px-4 py-2 text-lg">Issue Time</th>
                  <th className="px-4 py-2 text-lg">Fine</th>
                  <th className="px-4 py-2 text-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {cachedData.map((book, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition duration-200 text-center"
                  >
                    <td className="px-4 py-2 text-base">{idx + 1}</td>
                    <td className="px-4 py-2 text-base">
                      {/* Check if book.book is an array and has at least one element */}
                      {book.Book && book.Book.name
                        ? book.Book.name
                        : "No book available"}
                    </td>
                    <td className="px-4 py-2 text-base">
                      {/* Check if issueTime exists */}
                      {book.issueTime
                        ? moment(book.issueTime)
                            .tz("Asia/Kolkata") // Adjust to IST (or other timezone)
                            .format("HH:mm:ss") // Format to HH:mm:ss
                        : "No issue time"}
                    </td>
                    <td className="px-4 py-2 text-base text-center">
                      {book.fine}
                    </td>
                    <td className="px-4 py-2 text-base text-center ">
                      {book.fine !== 0 ? (
                        <Button
                          onClick={() => throttlePayFine(book.id, book.fine)} // Pass book.id instead of book.idx
                          className={
                            " text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          }
                          // disabled={book.fine <= 0 ? false : true}
                        >
                          Pay Fine
                        </Button>
                      ) : (
                        <button
                          type="button"
                          class="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          disabled
                        >
                          Pay Fine
                        </button>
                      )}
                    </td>
                  </tr>
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

export default Payfine;
