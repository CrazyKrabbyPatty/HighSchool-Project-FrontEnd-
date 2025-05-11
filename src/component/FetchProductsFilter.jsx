import axios from "axios";


export default class FetchProductsFilter {
    static async getAllProducts(
        // offset = "0",
        // limit = "8",
        // filterType = "ASC",
        // sortBy = "id"
    ) {
        const response = await axios.get(
            "http://localhost:8082/product/catalog/search/filter",
            {
                params: {
                    offset: 0,
                    limit: 8,
                    filterType: "ASC",
                    sortBy: "id"
                },
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
            )
    }
}