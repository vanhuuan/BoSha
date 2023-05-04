import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const userBookService = {
    categories: async () => {
        return await api.get(baseURL+'/categories')
    },
    userBook: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(`${baseURL}/Book/GetUserBook?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}&State=asdsd&MinPrice=1&MaxPrice=1`)
    },
    bookDetail: async (id) => {
        return await api.get(`${baseURL}/Book?id=${id}`)
    },
    addBook: async (body) => {
        return await api.post(baseURL+'/Book/AddBook', body)
    },
    updateBook: async (body) => {
        return await api.put(baseURL+'/Book/UpdateBook', body)
    },
    addChapter: async (body) => {
        return await api.post(baseURL+'/Chapter/AddChapter', body)
    },
    updateChapter: async (body) => {
        return await api.put(baseURL+'/Chapter/updateChapter', body)
    },
}


