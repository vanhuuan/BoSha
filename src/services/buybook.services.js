import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const chapterService = {
    notifySuccess: async (bookId) => {
        return await api.get(`${baseURL}/Book/BuyBookConfirm?bookId=${bookId}`)
    },
    notifyFailed: async (chapId) => {
        return await api.get(`${baseURL}/Chapter/ChapterDetail?chapterId=${chapId}`)
    }
}
