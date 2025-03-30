import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Item {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

interface ItemsState {
  items: Item[]
  isLoading: boolean
  error: string | null
}

const initialState: ItemsState = {
  items: [],
  isLoading: false,
  error: null,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchItemsSuccess: (state, action: PayloadAction<Item[]>) => {
      state.isLoading = false
      state.items = action.payload
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { fetchItemsStart, fetchItemsSuccess, fetchItemsFailure, addItem, updateItem, deleteItem } =
  itemsSlice.actions
export default itemsSlice.reducer

