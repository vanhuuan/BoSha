import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const statisticService = {
    getStatisticCard: async (from, to) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticCards?from=${from}&to=${to}`)
    },
    getStatisticChart: async (from, to, sortBy) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticChart?from=${from}&to=${to}&sortBy=${sortBy}`)
    },
    getStatisticData: async (from , to, pageNumber, pageSize, sortBy, sortType) => {
        return await api.get(`${baseURL}/Statistic/GetStatisticData?From=${from}&To=${to}&PageNumber=${pageNumber}&PageSize=${pageSize}&QueryType=retert&QueryString=ertertrt&SortBy=${sortBy}&SortType=${sortType}`)
    },
    getStatisticYear: async (year) => {
        return await api.post(`${baseURL}Statistic/GetStatisticRevenueYear?year=${year}`)
    }
}
