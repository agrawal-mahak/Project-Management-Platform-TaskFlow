import axiosInstance from "./axiosInstance";

export const fetchCards = ({page = 1, limit = 10, search = ""}) => {
    return axiosInstance.get("/cards", {params: {page, limit, search}})
}   