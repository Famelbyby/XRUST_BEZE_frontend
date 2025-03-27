import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../../pages/Chat/ui/slice/ChatSlice'

export const chatStore = configureStore({
  reducer: {
    chatMessages: chatReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ChatState = ReturnType<typeof chatStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof chatStore.dispatch