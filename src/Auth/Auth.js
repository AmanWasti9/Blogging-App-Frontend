// isLoggedIn

// export const isLoggedIn = () => {
//   let data = localStorage.getItem("data");
//   if (data != null) {
//     return true;
//   } else {
//     return false;
//   }
// };




// doLogin

// export const doLogin = (data,next) => {
//   localStorage.setItem("data", JSON.stringify(data));
//   next();
// };





// doLogout

// export const doLogout = (next) => {
//   localStorage.removeItem("data");
//   next();
// };






// // getCurrentUser

// export const getCurrentUserDetail = () => {
//   if (isLoggedIn()) {
//     return JSON.parse(localStorage.getItem("data"))?.user;
//   } else {
//     return undefined;
//   }
// };


// get Token

// export const getToken = () => {
//   if (isLoggedIn()) {
//     return JSON.parse(localStorage.getItem("data"))?.token;
//   } else {
//     return null;
//   }
// };



// // Auth.js






// Auth.js

export const doLogin = (data, next) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    next();
  };
  
  export const isLoggedIn = () => {
    return sessionStorage.getItem("token") !== null;
  };
  
  export const getCurrentUserDetail = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const doLogout = (next) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    next();
  };
  
  
  export const getToken = () => {
    return sessionStorage.getItem("token");
  };
  