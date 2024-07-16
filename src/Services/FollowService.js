import { myAxios, privateAxios } from "./Helper";

// New Follow Creation 
export const createFollow = async (followData) => {
  try {
    const response = await privateAxios.post(`/api/user/${followData.followerUserId}/follow/${followData.followingUserId}`, followData);
    return response.data;
  } catch (error) {
    console.error("Error while adding Follow:", error);
    throw error;
  }
};



// Load All Followings of Users
export const loadAllFollowingsOfUser = async (userId) => {
    try {
      const response = await myAxios.get(`/api/UserId/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all followings of user:", error);
      throw error;
    }
  };
  

  


// Load All Follower of Users
export const loadAllFollowersOfUser = async (userId) => {
  try {
    const response = await myAxios.get(`/api/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error("Error while loading all Follower of user:", error);
    throw error;
  }
};



// Delete Follower
export const deleteFollower = async (followId) => {
  try {
    const response = await privateAxios.delete(`/api/delete/${followId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting Follower:", error);
    throw error;
  }
};