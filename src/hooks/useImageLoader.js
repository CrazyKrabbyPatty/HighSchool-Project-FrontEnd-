import { useState } from 'react';
import PostProducts from '../API/PostProducts';

export const useImageLoader = (initialImages = {}) => {
    const [images, setImages] = useState(initialImages);
    const [loadingIds, setLoadingIds] = useState(new Set()); // Для отслеживания загрузки

    const getImageById = async (id, token) => {
        if (loadingIds.has(id)) return; // Не загружать повторно
        if (images[id]) return; // Если уже загружено

        try {
            setLoadingIds(prev => new Set(prev).add(id));

            const productsImage = await PostProducts.getImageById({ id, token });

            setImages(prev => ({
                ...prev,
                [id]: productsImage,
            }));
        } catch (error) {
            console.error(`Ошибка загрузки изображения для продукта ${id}:`, error);
        } finally {
            setLoadingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    return { images, getImageById, loadingIds };
};