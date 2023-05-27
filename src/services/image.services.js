import api from "./api"; 
const baseURL = "https://boshaapi.site";
export const imgService = {
    checkImg: async (file) => {
        var formData = new FormData();
        formData.append("image", file);
        let header = {
            "headers": {
              'Content-Type': 'multipart/form-data'
            }
        }
        return await api.post(`${baseURL}/checkImg`, formData, header)
    }
}
