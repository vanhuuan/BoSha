import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const chapterService = {
    chapters: async (bookId) => {
        return await api.get(`${baseURL}/Chapter/Chapters?bookId=${bookId}`)
    },
    chapterDetail: async () => {
        return await api.get(baseURL+'/Chapter/ChapterDetail?chapterId=')
    },
    addChapter: async () => {
        return await api.get(baseURL+'/categories')
    },
    updateChapter: async () => {
        return await api.get(baseURL+'/categories')
    },
}