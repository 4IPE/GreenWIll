import axios from "axios";

export const fetchMenuItems = async () => {
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
});
    try {
        console.log("Я запустился")
        const response = await apiClient.get("/api/products/all");
        console.log("Я обработал")
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке данных меню:", error);
        throw error;
    }
};
