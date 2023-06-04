import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: "",
        factoryName: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setFactory: (state, action) => {
            state.factoryName = action.payload;
        },
    },
});

export const { setToken, setFactory } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectFactoryName = (state) => state.auth.factoryName;