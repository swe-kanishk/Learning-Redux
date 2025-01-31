import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk('cart/fetchProducts', async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`)
        return response.json()
    } catch (error) {
        throw error
    }
})

const slice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        list: [],
        error: ''
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsData.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProductsData.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(fetchProductsData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    } 
})

export const getAllProducts = (state) => state.products.list
export const getProductLoadingState = (state) => state.products.loading
export const getProductError = (state) => state.products.error

export default slice.reducer