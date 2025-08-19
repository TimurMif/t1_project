import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataAutState {
  login: string,
  password: string,
  status: 'manager' | 'admin',
  isLogin: boolean
}

const initialState: DataAutState = {
  login: '',          
  password: '', 
  status: 'manager',
  isLogin: false    
};

export const dataSlice = createSlice({
  name: 'dataAutSlice',
  initialState,
  reducers: {
    upload: (state, action: PayloadAction<Partial<DataAutState>>) => {
      console.log('Данные, пришедшие в редьюсер:', action.payload);
      return { ...state, ...action.payload };
    },
    isLogin: (state, action: PayloadAction<boolean>) => {
      console.log('isLogin изменен на: ', action.payload);
      return { ...state, isLogin: action.payload };
    },
  },
});

export const { upload, isLogin } = dataSlice.actions;
export default dataSlice.reducer;