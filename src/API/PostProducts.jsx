import axios from "axios";

export default class PostProducts {
    static async getProductsById(
        {
            id,
            token
        }
    )
    {
        const productResponse = await axios.get(
            `http://localhost:8082/product/catalog/search`,
            {
                params: {
                    by: "uuid",
                    category: "uuid",
                    value: id
                },
                paramsSerializer: params => {
                    return Object.entries(params)
                        .map(([key, value]) =>
                            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
                        )
                        .join('&');
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                }
            }
        )
        return productResponse.data;
    }

    static async getFilteredProducts(
        {
            offset = 0,
            limit = 8,
            filterType = "ASC",
            sortBy = "id",
            token
        }
    )
    {
        const response = await axios.get(
            "http://localhost:8082/product/catalog/search/filter",
            {
                params: { offset, limit, filterType, sortBy },
                headers: {"Authorization": `Bearer ${token}`,}
            }
        )
        return response.data.content;
    }

    static async getImageById(
        {
            id,
            token
        }
    )
    {
        const response = await axios.get(
            `http://localhost:8082/product/source`,
            {
                params: {productId: id},
                headers: {"Authorization": `Bearer ${token}`},
                responseType: 'arraybuffer' // Устанавливаем правильный тип для бинарных данных
            }
        )

        const blob = new Blob([response.data], { type: 'image/png' });

        return URL.createObjectURL(blob)
    }

}