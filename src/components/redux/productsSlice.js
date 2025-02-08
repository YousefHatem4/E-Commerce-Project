import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {isLoading: false , products: [] , error:null}
export let getProducts = createAsyncThunk('productsSlice/getProducts', async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return data.data;
})

let productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
})
export default productsSlice.reducer


