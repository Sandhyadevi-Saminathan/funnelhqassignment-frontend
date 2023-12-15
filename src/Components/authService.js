
import axios from "axios";

export async function refreshAccessToken(id) {
    try {
        const response = await axios.post('http://localhost:8000/users/refresh-token', {
            id,
           
        });

        if (response.status === 200) {
            const { accessToken } = response.data;

            localStorage.setItem('token', accessToken);
            return accessToken;
        } else {
            throw new Error('Token refresh failed');
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        throw error;
    }
}

