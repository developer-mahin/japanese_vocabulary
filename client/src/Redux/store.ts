import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar/sidebarSlice";
import { baseApi } from "./api/baseApi";
import multiStepperReducer from "./sidebar/sidebarSlice";

// Combine reducers
const reducer = {
  sidebar: sidebarReducer,
  multiStepper: multiStepperReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};

// Configure the store

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
