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

export const getUserById = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`);
    return response.data;
  } catch (error){
    throw new Error('Failed to get user by Id');
  }
}

export const updateUser = async (userId, updateData) => {
  try{
    const response = await API.patch(`/users/${userId}`, updateData);
    return response.data;
  } catch (error){
    throw new Error(`Failed to update user ID ${userId}`);
  }
}

export const getPaymentsByUserId = async (userId) => { //truyền vào 1 tham số userId để lấy dữ liệu người dùng
  try {
    const response = await API.get(`/payments?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch payments for user ${userId}`);
  }
};

export const addPayment = async (paymentData) => { //truyền vào 1 object paymentData để có thể post dữ liệu vào database
  try {
    const response = await API.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add payment');
  }
};

export const updatePayment = async (paymentId, updateData) => { //truyền vào 1 tham số paymentId và 1 object updateData để truyền dữ liệu vào database đúng với paymentId
  try {
    const response = await API.patch(`/payments/${paymentId}`, updateData); //patch: phương thức cập nhật 1 phần dữ liệu và giữ nguyên các trường còn lại
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update payment ID ${paymentId}`);
  }
}

export const deletePayment = async (paymentId) => {
  try {
    await API.delete(`/payments/${paymentId}`);
    return { success: true, message: `Payment ID ${paymentId} deleted successfully`};
  } catch (error) {
    throw new Error(`Failed to delete payment ID ${paymentId}`);
  }
}

export default API;
