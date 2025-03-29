import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/LogInSlice'
import chatReducer from './slices/ChatSlice'
import dialogsReducer from './slices/DialogsSlice'
import mainReducer from './slices/MainSlice'
import userReducer from './slices/UserSlice'
import websocketReducer from './slices/WebSocketSlice'

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    profile: userReducer,
    chatMessages: chatReducer,
    dialogs: dialogsReducer,
    mainPageUsers: mainReducer,
    websocket: websocketReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch