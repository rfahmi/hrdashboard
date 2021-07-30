import axios from "axios"

export const api = axios.create({
    baseURL: "https://high-territory-321416.et.r.appspot.com",
    headers: {
        Accept: "application/json",
    },
    timeout: 5000,
})
