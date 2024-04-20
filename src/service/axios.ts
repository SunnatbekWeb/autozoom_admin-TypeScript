import axios from "axios";

const api = axios.create({
    baseURL: "https://autoapi.dezinfeksiyatashkent.uz/api"
})


export default api;