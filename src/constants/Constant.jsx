export const apiUrl = import.meta.env.VITE_API_URL;

export const token = localStorage.getItem("token");

export const jwtToken = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};


  export function throttle(func, interval) {
    let lastCall = 0;
    // console.log(lastCall)
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  }