export const apiUrl = import.meta.env.VITE_API_URL;

export const token = localStorage.getItem("token");

export const jwtToken = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const jwtToken2 = token;