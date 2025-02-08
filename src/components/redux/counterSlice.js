import { createSlice } from "@reduxjs/toolkit";

let initialState = { count: 0, userName: 'yousef' };

let counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        increace: (state, action) => {
            state.count += 1;
        },
        decrease: (state, action) => {
            state.count -= 1;
        },
        increaseByAmout: (state, action) => {
            state.count += action.payload;
        }
        
    }
});
export let counterReducer = counterSlice.reducer
export let { increace, decrease, increaseByAmout } = counterSlice.actions;