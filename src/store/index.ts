import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./auth/auth.api";
import AuthSlice from "./auth/auth.slice";
import { scheduleApi } from "./schedule/schedule.api";
import { routineApi } from "./routine/routine.api";

const persistConfig = {
  key: AuthSlice.name,
  storage,
};

const rootReducer = combineReducers({
  // Slices
  [AuthSlice.name]: persistReducer(persistConfig, AuthSlice.reducer),

  // API's
  [authApi.reducerPath]: authApi.reducer,
  [scheduleApi.reducerPath]: scheduleApi.reducer,
  [routineApi.reducerPath]: routineApi.reducer,
});

//

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(scheduleApi.middleware)
      .concat(routineApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);
export default store;
