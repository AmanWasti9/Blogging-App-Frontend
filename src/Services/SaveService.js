import { myAxios, privateAxios } from "./Helper";

// New Save Creation 
export const createSave = async (saveData) => {
  try {
    const response = await privateAxios.post(`/api/user/${saveData.userId}/post/${saveData.postId}/save`, saveData);
    return response.data;
  } catch (error) {
    console.error("Error while Saving:", error);
    throw error;
  }
};


// Load All Save by Users
export const loadSaveByUser = async (userId) => {
    try {
      const response = await myAxios.get(`/api/user/${userId}/save`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all save post by user:", error);
      throw error;
    }
  };
  
// Load All Save by Post
export const loadSaveByPost = async (postId) => {
    try {
      const response = await myAxios.get(`/api/post/${postId}/save`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all save posts:", error);
      throw error;
    }
  };
  

// Update Post By Id
export const updateSave = async (save, saveId) => {
  try {
    const response = await privateAxios.put(`/api/save/${saveId}`, save);
    return response.data;
  } catch (error) {
    console.error("Error while updating save by ID:", error);
    throw error;
  }
};



// Delete Single Post
export const deleteSave = async (saveId) => {
  try {
    const response = await privateAxios.delete(`/api/save/${saveId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting like:", error);
    throw error;
  }
};