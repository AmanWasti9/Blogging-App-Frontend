import { myAxios, privateAxios } from "./Helper";

// New Post Creation
export const addPost = async (postData) => {
  try {
    const response = await privateAxios.post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error while adding post:", error);
    throw error;
  }
};

// Load All Post With Pagination
export const loadAllPostsWithPagination = async (pageNumber, pageSize) => {
  try {
    const response = await myAxios.get(
      `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    );
    return response.data;
  } catch (error) {
    console.error("Error while loading all posts:", error);
    throw error;
  }
};

// Load all post without Pagination
export const loadAllPosts = async () => {
  try {
    const response = await myAxios.get(`/api/allposts`);
    return response.data;
  } catch (error) {
    console.error("Error while loading all posts:", error);
    throw error;
  }
};

// Load All Active Posts
export const loadAllActivePosts = async () => {
  try {
    const response = await myAxios.get(`/api/active-posts`);
    return response.data;
  } catch (error) {
    console.error("Error while loading posts:", error);
    throw error;
  }
};

// Load All Active Post With Pagination
export const loadAllActivePostsWithPagination = async (
  pageNumber,
  pageSize
) => {
  try {
    const response = await myAxios.get(
      `/api/paginated-active-posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    );
    return response.data;
  } catch (error) {
    console.error("Error while loading all posts:", error);
    throw error;
  }
};

// Load Active Post By Category
export const loadAllActivePostsByCategories = async (categoryId) => {
  try {
    const response = await myAxios.get(
      `/api/active-post/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while loading posts:", error);
    throw error;
  }
};

// Load Single Post
export const loadPost = async (postId) => {
  try {
    const response = await myAxios.get(`/api/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error while loading post by ID:", error);
    throw error;
  }
};

// Load All Active Posts
export const getAllActivePostsWithLikes = async () => {
  try {
    const response = await myAxios.get(`/api/active-post-with-likes`);
    return response.data;
  } catch (error) {
    console.error("Error while loading posts:", error);
    throw error;
  }
};

// Load Post CategoryWise
export const loadPostsCategoryWise = async (categoryId) => {
  try {
    const response = await myAxios.get(`/api/category/${categoryId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error while loading posts by category:", error);
    throw error;
  }
};

// Load Post By User
export const loadPostsUserWise = async (userId) => {
  try {
    const response = await myAxios.get(`/api/user/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error while loading posts by user:", error);
    throw error;
  }
};

// Upload Image in Post
export const uploadPostImage = async (image, postId) => {
  try {
    let formData = new FormData();
    formData.append("image", image);
    const response = await privateAxios.post(
      `/api/post/image/upload/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while uploading post image:", error);
    throw error;
  }
};

// Delete Single Post
export const deleteSinglePost = async (postId) => {
  try {
    const response = await privateAxios.delete(`/api/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error while deleting post:", error);
    throw error;
  }
};

// Update Post By Id
export const updatePostById = async (post, postId) => {
  try {
    const response = await privateAxios.put(`/api/post/${postId}`, post);
    return response.data;
  } catch (error) {
    console.error("Error while updating post by ID:", error);
    throw error;
  }
};

// Load Post By Searching...
export const loadPostsBySearch = async (keywords) => {
  try {
    const response = await myAxios.get(`/api/posts/search/${keywords}`);
    return response.data;
  } catch (error) {
    console.error("Error while searching posts:", error);
    throw error;
  }
};

// Generate keywords
export const generateKeywords = async (title) => {
  try {
    const response = await privateAxios.post("/api/generate-keywords", null, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error("Error while generating keywords:", error);
  }
};

// Check plagiarism
export const checkPlagiarism = async (content) => {
  try {
    const response = await privateAxios.post(`/api/check`, content);
    return response.data;
  } catch (error) {
    console.error("Error while checking plagiarism:", error);
  }
};

// Chatbot
export const chatBot = async (userId, message) => {
  try {
    const response = await privateAxios.post("/api/chat/ask", null, {
      params: { userId, message },
    });
    return response.data;
  } catch (error) {
    console.error("Error while in chatBot:", error);
  }
};
