import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Sale {
  id: string
  itemId: string
  quantity: number
  totalPrice: number
  date: string
}

interface SalesState {
  sales: Sale[]
  isLoading: boolean
  error: string | null
}

const initialState: SalesState = {
  sales: [],
  isLoading: false,
  error: null,
}

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    fetchSalesStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchSalesSuccess: (state, action: PayloadAction<Sale[]>) => {
      state.isLoading = false
      state.sales = action.payload
    },
    fetchSalesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    addSale: (state, action: PayloadAction<Sale>) => {
      state.sales.push(action.payload)
    },
  },
})

export const { fetchSalesStart, fetchSalesSuccess, fetchSalesFailure, addSale } = salesSlice.actions
export default salesSlice.reducer

