import axios from "axios";

// Функция для получения данных меню
export const fetchMenuItems = async () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
    try {
        const response = await axios.get(`${API_BASE_URL}/products/all`);
        return response.data; // Возвращаем данные меню
    } catch (error) {
        console.error("Ошибка при загрузке данных меню:", error);
        throw error;
    }
};
