import apiClient from "../config/axiosConfig";

export const fetchMenuData = async () => {
    try {
        const response = await apiClient.get("/api/products/all");
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке данных меню:", error);
        throw error;
    }
};
