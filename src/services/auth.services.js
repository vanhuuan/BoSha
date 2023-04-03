import api from "./api"; 

export const authService = {
    login: async (data) => {
        return await api.post('http://167.71.200.53:80/Authen/SignIn', data)
    },
    register: async (data) => {
        return await api.post('http://167.71.200.53:80/Authen/SignUp', data)
    },
    forgetPass: async (data) => {
        return await api.get(`hhttp://167.71.200.53:80/Authen/ForgetPass?gmail=${data}`)
    },
    renewPass: async (data) => {
        return await api.post('http://167.71.200.53:80/Authen/RenewPassword', data)
    },
    registerGoogle: async (data) => {
        console.log(data)
        return await api.post('http://167.71.200.53:80/Authen/SignUpGoogle', data)
    },
    loginGoogle: async (data) => {
        return await api.post('http://167.71.200.53:80/Authen/SignInGoogle', data)
    },
}


