import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // Base URL của json-server
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};


export const getExpensesByUserId = async (userId) => {
  try {
    const response = await API.get(`/expenses?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch expenses for user ${userId}`);
  }
};

export const addExpense = async (expensesData) => {
  try {
    const response = await API.post('/expenses', expensesData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add expenses');
  }
};

export const updateExpense = async (expensesId, updateData) => {
  try {
    const response = await API.patch(`/expenses/${expensesId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update expenses ID ${expensesId}`);
  }
}

export const deleteExpense = async (expensesId) => {
  try {
    await API.delete(`/expenses/${expensesId}`);
    return { success: true, message: `Payment ID ${expensesId} deleted successfully`};
  } catch (error) {
    throw new Error(`Failed to delete payment ID ${expensesId}`);
  }
}

export default API;
