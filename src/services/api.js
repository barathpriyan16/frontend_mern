import axios from "axios";

// ✅ Vite environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4001/api";

// ✅ Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= AUTH APIs =================
export const authAPI = {
  register: async (userData) => {
    const response = await api.post("/register", userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  updateUser: async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
};

// ================= EXPENSE APIs =================
export const expenseAPI = {
  getExpenses: async (userId) => {
    const response = await api.get(`/expenses/${userId}`);
    return response.data;
  },

  createExpense: async (userId, expenseData) => {
    const response = await api.post(`/expenses/${userId}`, expenseData);
    return response.data;
  },

  updateExpense: async (expenseId, expenseData) => {
    const response = await api.put(
      `/expenses/${expenseId}`,
      expenseData
    );
    return response.data;
  },

  deleteExpense: async (expenseId) => {
    const response = await api.delete(`/expenses/${expenseId}`);
    return response.data;
  },
};

export default api;
