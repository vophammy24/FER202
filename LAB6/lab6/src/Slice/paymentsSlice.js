import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {id: 1, status: "SUCCESS"},
    {id: 2, status: "FAILED"},
    {id: 3, status: "SUCCESS"}
  ],
  isLoading: false,
  error: null
} 

export const createPayment = createAsyncThunk (
  "payment/createPayment",
  async (paymentData, thunkAPI) => {
    const res = await fetch(`/api/payments`, { 
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(paymentData)
    });

    if (res.status === 402) {
        return thunkAPI.rejectWithValue("Tài khoản không đủ tiền");
    }

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Create payment failed");
    }

    return await res.json();
  }
);


export const selectSuccessfulPayments = (state) => {
    const payments = state.payments.list;
    return payments.filter(p => p.status === "SUCCESS")
}

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error;
      });
  }
});

export default paymentsSlice.reducer;

