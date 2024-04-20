import api from "../axios";

const useAuth = {
    login: (data: object) => api.post('/auth/signin', data)
}

export default useAuth;