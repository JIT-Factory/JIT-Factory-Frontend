import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    daily: [],
    weekly: [],
    monthly: [],
};

export const fetchDailyProducts = createAsyncThunk(
    "products/fetchDailyProducts",
    async () => {
        const response = await axios.get("/api/sales/daily");
        return response.data;
    }
);

export const fetchWeeklyProducts = createAsyncThunk(
    "products/fetchWeeklyProducts",
    async () => {
        const response = await axios.get("/api/sales/weekly");
        return response.data;
    }
);

export const fetchMonthlyProducts = createAsyncThunk(
    "products/fetchMonthlyProducts",
    async () => {
        const response = await axios.get("/api/sales/monthly");
        return response.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDailyProducts.fulfilled, (state, action) => {
                state.daily = action.payload;
            })
            .addCase(fetchWeeklyProducts.fulfilled, (state, action) => {
                state.weekly = action.payload;
            })
            .addCase(fetchMonthlyProducts.fulfilled, (state, action) => {
                state.monthly = action.payload;
            });
    },
});

export const productsReducer = productsSlice.reducer;
