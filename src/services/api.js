import axios from "axios";

export const api_key = "eb73a84021cef9a0ce4e119f6bb0b288";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;