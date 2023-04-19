import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const userBookService = {
    categories: async () => {
        return await api.get(baseURL+'/categories')
    },
    userBook: async (pageNumber, pageSize, queryType, queryString, sortBy, sortType) => {
        return await api.get(`${baseURL}/GetUserBook?PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=${sortBy}&SortType=${sortType}`)
    },
    bookDetail: async (id) => {
        return await api.get(baseURL+'/Book?id=id')
    },
}


