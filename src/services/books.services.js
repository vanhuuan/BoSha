import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const bookService = {
    booksNew: async (pageNumber, pageSize, queryType, queryString) => {
        return await api.get(`${baseURL}/Books?Categories=&Name=&State=&MinPrice=0&MaxPrice=10000000&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=Newest&SortType=Desc`)
    },
    booksHotWeek: async (pageNumber, pageSize, queryType, queryString) => {
        return await api.get(`${baseURL}/Books?Categories=&Name=&State=&MinPrice=0&MaxPrice=10000000&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=HotWeek&SortType=Desc`)
    },
    bookDetail: async (id) => {
        return await api.get(`${baseURL}/Book?id=${id}`)
    },
    bookStatus: async (id) => {
        return await api.get(`${baseURL}/Book/Status?id=${id}`)
    },
}


