import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface UserState {
  value: string
}

// Define the initial state using that type
const initialState: UserState = {
  value: "",
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = ""
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { set, reset } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer