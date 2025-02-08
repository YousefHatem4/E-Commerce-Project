import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import productsSlice from './productsSlice'



export let store = configureStore({
    reducer: {
        counterReducer,
      products:  productsSlice
    }
})