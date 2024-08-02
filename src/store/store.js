import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './slices/cardSlice'

export const store = configureStore({
    reducer: {
        cart: cardReducer,
    },
})
