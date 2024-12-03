// import axios from "axios";
import { apiUrl } from "../constants/Constant";
import { decodeToken } from "../constants/Jwt-Decode";
const jwtToken = localStorage.getItem("token");

export const getIssueBook = async () => {
  const userId = decodeToken(jwtToken).data.id;
  //  debugger
  //   console.log("userid", jwtToken);

  const response = await fetch(
    `http://${apiUrl}/issues/userIssuedBooks/${userId}`,

    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const issueBookData = await response.json();

//   console.log("issuee bookkkkkkkkkkkk ", issueBookData.issues);
  return issueBookData.issues;
};
