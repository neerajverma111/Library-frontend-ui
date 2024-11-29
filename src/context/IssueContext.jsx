import React, { createContext, useState, useEffect } from "react";
import { apiUrl } from "../constants/Constant";
import { decodeToken } from "../constants/Jwt-Decode";
import axios from "axios";
import { toast } from "react-toastify";


export const IssueContext = createContext();

export const IssueBookProvider = ({ children }) => {
  const [userBookId, setUserBookId] = useState([]);
  const jwtToken = localStorage.getItem("token");

  const getIssueBook = async () => {
    const userId = decodeToken(jwtToken).data.id;
    try {
      const response = await axios.get(
        `http://${apiUrl}/issues/userIssuedBooks/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("response", response?.data);
        setUserBookId(response?.data?.issues);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.error(
        "Error fetching issued books:",
        error.response || error.message || error
      );
      toast.error("Issue A Book First");
    }
  };
  // console.log(userBookId);

  // useEffect(() => {
  //   getIssueBook();
  // }, []);
  

  return (
    <IssueContext.Provider value={{ userBookId, getIssueBook }}>
      {children}
    </IssueContext.Provider>
  );
};
