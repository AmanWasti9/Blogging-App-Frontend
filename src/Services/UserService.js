import { myAxios, privateAxios } from "./Helper";

// Sign Up User
export const signUp = async (user) => {
  try {
    const response = await myAxios.post("/api/v1/auth/register", user);
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error during sign up:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Logs in a user with their email and
export const loginUser = async (loginDetail) => {
  try {
    const response = await myAxios.post("/api/v1/auth/login", loginDetail);
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error during login:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//  This  function is used for getting data User by Id
export const getUserById = async (userId) => {
  try {
    const response = await privateAxios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error while fetching user by ID:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// This function is used to Update User by post Id
export const updateUserById = async (user, userId) => {
  try {
    const response = await privateAxios.put(`/api/users/${userId}/info`, user);
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error while updating user by ID:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Update Passowrd

// This function is used to Update User by post Id
export const updatePasswordOfUser = async (newPassword, userId) => {
  try {
    const response = await privateAxios.put(
      `/api/users/${userId}/password`,
      newPassword
    );
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error while updating user by ID:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Update Email

// This function is used to Update User by post Id
export const updateEmailOfUser = async (newEmail, userId) => {
  try {
    const response = await privateAxios.put(
      `/api/users/${userId}/email`,
      newEmail
    );
    return response.data;
  } catch (error) {
    // Handle error if needed
    console.error("Error while updating user by ID:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



// Upload Image in Post
export const uploadUserImage = async (image, userId) => {
  try {
    let formData = new FormData();
    formData.append("image", image);
    const response = await privateAxios.post(
      `/api/users/image/upload/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while uploading userId image:", error);
    throw error;
  }
};