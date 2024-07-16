import { myAxios } from "./Helper";

//   Load All Category
export const loadAllCategories = async () => {
    try {
      const response = await myAxios.get(`/api/categories/`);
      return response.data;
    } catch (error) {
      console.error("Error while loading all categories:", error);
      throw error;
    }
  };
  
//   Load Category By Id
  export const loadCategoryById = async (categoryId) => {
    try {
      const response = await myAxios.get(`/api/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error while loading category by ID:", error);
      throw error;
    }
  };
  
