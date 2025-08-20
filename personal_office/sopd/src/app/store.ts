import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/form_data/userSlice';
import settingsReducer  from '@/features/send_settings/settingsSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    settings: settingsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;