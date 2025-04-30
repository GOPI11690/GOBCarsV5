import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import searchReducer from "./slices/searchSlice"
import { searchStart } from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    search:searchReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['search/searchStart'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['search.search.pickupdate',
          'search.search.returndate',searchStart],
      },
    }),
})

export default store
