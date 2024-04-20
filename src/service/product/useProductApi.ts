import api from "../axios";

const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
}

interface DataType {
    name_en: string;
    name_ru: string;
    images: File | null;
}
const useProductApi = {
    getProducts: () => api.get('/categories'),
    createProduct: (formData: object) => api.post('/categories', formData, { headers }),
    updateProduct: ({ name_en, name_ru, images }: DataType) => api.put('/categories', { name_en, name_ru, images }, { headers })
}

export default useProductApi;