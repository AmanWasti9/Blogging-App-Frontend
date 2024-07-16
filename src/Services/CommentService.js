import { myAxios, privateAxios } from "./Helper";

// Load All Comment
export const loadAllComments = async (postId) => {
    try {
      const response = await myAxios.get(`/api/post/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all comments:", error);
      throw error;
    }
  };
  

// Add a new comment to the post
  export const addComment = async (commentData) => {
    try {
      const response = await privateAxios.post(`/api/user/${commentData.userId}/post/${commentData.postId}/comment`, commentData);
      return response.data;
    } catch (error) {
      console.error("Error while adding comment:", error);
      throw error;
    }
  };
  