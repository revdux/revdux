import { configureStore } from "@reduxjs/toolkit";
import serverListReducer from "./slices/serverListSlice";
import userAvatarReducer from "./slices/userAvatarSlice";

export const store = configureStore({
  reducer: {
    serverList: serverListReducer,
    userAvatar: userAvatarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
