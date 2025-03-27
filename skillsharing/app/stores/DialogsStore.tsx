import { configureStore } from '@reduxjs/toolkit'
import dialogsReducer from '../../pages/Dialogs/ui/slice/DialogsSlice'

export const dialogsStore = configureStore({
  reducer: {
    dialogs: dialogsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type DialogsState = ReturnType<typeof dialogsStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof dialogsStore.dispatch