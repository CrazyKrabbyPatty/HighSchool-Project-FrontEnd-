import axios from "axios";

export default class PostIdentify{
    static async getUser
    (
        token
    )
    {
        const response = await axios.get(
            "http://localhost:8081/identity/users/me",
            {
                headers: {"Authorization": `Bearer ${token}`}
            }
        );
        return response.data;
    }

    static async validateToken
    (
        token
    )
    {
        const response = await axios.post(
            "http://localhost:8081/identity/tokens/validate",
            {
                token
            }
        );
        console.log(response);
        // return response.data;
    }
}