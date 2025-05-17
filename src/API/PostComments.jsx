import axios from "axios";

export default class PostComments{
    static async PublicateComment(
        {
            userid,
            productid,
            comment,
            rating,
            token
        }
    ) {
        const commentResponse = await axios.post(
            'http://localhost:8082/product/feedback/publication',
            { // Тело запроса
                userId: userid,
                productId: productid,
                comment: comment,
                rating: rating,
            },
            { // Конфигурация
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        return commentResponse.data;
    }

    static async getComments
    (
        productId = "id",
        filterType = "uuid",
        searchBy = "id",
        token
    )
    {
        const commentResponse = await axios.get(
            `http://localhost:8082/product/feedback/${filterType}/${searchBy}`,
            {
                params: {
                    id: productId  // передаётся как query ?id=...
                }
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        )
        return commentResponse.data;
    }
}