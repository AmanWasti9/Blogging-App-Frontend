import { myAxios, privateAxios } from "./Helper";

// New Like Creation 
export const createLike = async (likeData) => {
  try {
    const response = await privateAxios.post(`/api/user/${likeData.userId}/post/${likeData.postId}/like`, likeData);
    return response.data;
  } catch (error) {
    console.error("Error while adding Like:", error);
    throw error;
  }
};


// Load All Like by Users
export const loadLikeByUser = async (userId) => {
    try {
      const response = await myAxios.get(`/api/user/${userId}/like`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all Likes by user:", error);
      throw error;
    }
  };
  
// Load All Like by Post
export const loadLikeByPost = async (postId) => {
    try {
      const response = await myAxios.get(`/api/post/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all Likes by posts:", error);
      throw error;
    }
  };
  

// Update Post By Id
export const updateLike = async (like, likeId) => {
  try {
    const response = await privateAxios.put(`/api/like/${likeId}`, like);
    return response.data;
  } catch (error) {
    console.error("Error while updating like by ID:", error);
    throw error;
  }
};



// Delete Single Post
export const deleteLike = async (likeId) => {
  try {
    const response = await privateAxios.delete(`/api/like/${likeId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting like:", error);
    throw error;
  }
};