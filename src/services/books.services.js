import api from "./api";
const baseURL = "https://boshaapi.site";
export const bookService = {
    booksNew: async (pageNumber, pageSize, queryType, queryString) => {
        return await api.get(`${baseURL}/Books?Categories=&Name=&State=&NotState=Susspend&MinPrice=0&MaxPrice=10000000&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=Newest&SortType=Desc`)
    },
    booksHotWeek: async (pageNumber, pageSize, queryType, queryString) => {
        return await api.get(`${baseURL}/Books?Categories=&Name=&State=&NotState=Susspend&MinPrice=0&MaxPrice=10000000&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=${queryType}&QueryString=${queryString}&SortBy=HotWeek&SortType=Desc`)
    },
    bookDetail: async (id) => {
        return await api.get(`${baseURL}/Book?id=${id}`)
    },
    bookStatus: async (id) => {
        return await api.get(`${baseURL}/Book/Status?id=${id}`)
    },
    findBook: async (pageNumber, pageSize, name, categories, state, min, max, sort) => {
        var textCate = "?Categories="
        if (categories && categories.length > 0) {
            categories.forEach(element => {
                textCate = textCate.concat("&Categories=" + element)
            });
        }

        const url = `${baseURL}/Books${textCate}&Name=${name}&State=${state}&NotState=Susspend&MinPrice=${min}&MaxPrice=${max}&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=fgsdgsdfgdfg&QueryString=sdfgsdfgdfg&SortBy=${sort}&SortType=Desc`
        console.log(url)
        return await api.get(url)
    },
    searchBook: async (queryString) => {
        console.log("search", queryString)
        if (queryString) {
            return await api.get(`${baseURL}/Books?Categories=&Name=${queryString}&State=&NotState=Susspend&MinPrice=0&MaxPrice=10000000&PageNumber=1&PageSize=5&QueryType=fghrfhrt&QueryString=rhrthrth&SortBy=Newest&SortType=Desc`)
        } else {
            return await api.get(`${baseURL}/Books?Categories=&Name=&State=&NotState=Susspend&MinPrice=0&MaxPrice=10000000&PageNumber=1&PageSize=5&QueryType=fghrfhrt&QueryString=rhrthrth&SortBy=Newest&SortType=Desc`)
        }
    },
}


