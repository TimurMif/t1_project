import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  emailSendFrom: string,
  htmlContent: string,
  sopdContent: string,
}

const initialState: SettingsState = {
  emailSendFrom: '',
  htmlContent: '',
  sopdContent: '', 
};

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    upload: (state, action: PayloadAction<Partial<SettingsState>>) => {
      console.log('Данные, пришедшие в редьюсер:', action.payload);
      return { ...state, ...action.payload };
    },
    resetData: () => {
      return initialState
    }
  },
});

export const { upload, resetData } = settingsSlice.actions;
export default settingsSlice.reducer;