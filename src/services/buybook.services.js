import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const buyBookService = {
    notifySuccess: async (token) => {
        return await api.get(`${baseURL}/Book/BuyBookConfirm?dto=${token}`)
    },
    notifyFailed: async (token) => {
        return await api.get(`${baseURL}/Book/BuyBookCancel?dto=${token}`)
    },
    checkOut: async (bookId) => {
        return await api.get(`${baseURL}/Book/GetCheckOut?bookId=${bookId}`)
    },
    buyBook: async (data) => {
        return await api.post(`${baseURL}/Book/BuyBook`, data)
    }
}
