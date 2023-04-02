import api from "./api"; 

export const authService = {
    login: async (data) => {
        return await api.post('https://localhost:7135/Authen/SignIn', data)
    },
    register: async (data) => {
        return await api.post('https://localhost:7135/Authen/SignUp', data)
    },
    forgetPass: async (data) => {
        return await api.get(`https://localhost:7135/Authen/ForgetPass?gmail=${data}`)
    },
    renewPass: async (data) => {
        return await api.post('https://localhost:7135/Authen/RenewPassword', data)
    },
    registerGoogle: async (data) => {
        console.log(data)
        return await api.post('https://localhost:7135/Authen/SignUpGoogle', data)
    },
    loginGoogle: async (data) => {
        return await api.post('https://localhost:7135/Authen/SignInGoogle', data)
    },
}


