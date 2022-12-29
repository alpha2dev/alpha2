import authSlice from './slices/auth';
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user';
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch