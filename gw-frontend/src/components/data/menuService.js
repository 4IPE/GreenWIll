import axios from "axios";

// Функция для получения данных меню
export const fetchMenuItems = async () => {
    try {
        const response = await axios.get('/gw-service/products/all');
        return response.data; // Возвращаем данные меню
    } catch (error) {
        console.error("Ошибка при загрузке данных меню:", error);
        throw error;
    }
};
