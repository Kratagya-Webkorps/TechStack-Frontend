import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginFormReducer from "../reducers/loginReducer";
import cartReducer from "../reducers/cartReducer";
import wishlistReducer from "../reducers/wishlistReducer";

const persistConfig = {
  key: "signinData",
  storage,
  blacklist: [], 
};

const rootReducer = combineReducers({
  loginForm: loginFormReducer,
  cart: cartReducer,
  wishlist:wishlistReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
