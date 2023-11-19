// axiosService.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

// Define your API base URL
const baseURL = "https://api.tvmaze.com"

// Create an Axios instance with your base URL
const api = axios.create({ baseURL })

// Define your request headers
const headers: AxiosRequestConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
}

// Define functions to make requests
export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(url, {
      ...headers,
      ...config
    })
    return response.data
  }
}
