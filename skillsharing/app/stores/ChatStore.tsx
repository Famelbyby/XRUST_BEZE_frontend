import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from '../../entity/Message/slice/MessagesSlice'

export const chatStore = configureStore({
  reducer: {
    chatMessages: messagesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type ChatState = ReturnType<typeof chatStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof chatStore.dispatch