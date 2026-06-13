import { configureStore } from '@reduxjs/toolkit'
import { cityApi } from '../services/city'

export const store = configureStore({
  reducer: {  
    [cityApi.reducerPath]: cityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch