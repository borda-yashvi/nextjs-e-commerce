import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import itemsReducer from "./slices/itemsSlice"
import salesReducer from "./slices/salesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    sales: salesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

