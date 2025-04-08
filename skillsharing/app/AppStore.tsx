import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/LogInSlice'
import chatReducer from './slices/ChatSlice'
import dialogsReducer from './slices/DialogsSlice'
import mainReducer from './slices/MainSlice'
import userReducer from './slices/UserSlice'
import signupReducer from './slices/SignUpSlice'
import settingsReducer from './slices/SettingsSlice'
import profileReducer from './slices/ProfileSlice'
import structurizedMessageReducer from './slices/StructurizedMessageSlice'

export const appStore = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    user: userReducer,
    chatMessages: chatReducer,
    dialogs: dialogsReducer,
    mainPageUsers: mainReducer,
    settings: settingsReducer,
    profile: profileReducer,
    structurizedMessage: structurizedMessageReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch