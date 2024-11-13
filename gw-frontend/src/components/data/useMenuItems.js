// src/hooks/useMenuItems.js
import { useState, useEffect } from "react";
import { fetchMenuItems } from "./menuService";

const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMenuItems = async () => {
            try {
                const data = await fetchMenuItems();
                setMenuItems(data);
                setLoading(false);
            } catch (err) {
                setError("Ошибка загрузки меню.");
                setLoading(false);
                console.log("Ошибка загрузки меню.")
            }
        };

        loadMenuItems();
    }, []);

    return { menuItems, loading, error };
};

export default useMenuItems;
