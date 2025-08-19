import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  name: string,
  surname: string,
  midName?: string,
  dateOfBirth: Date,
  phoneNumber: string,
  email: string,
  sopd: boolean,
}

const initialState: DataState = {
  name: '',          
  surname: '',      
  midName: undefined, 
  dateOfBirth: new Date(), 
  phoneNumber: '',    
  email: '',
  sopd: false,
};

export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<DataState>>) => {
      console.log('Данные, пришедшие в редьюсер:', action.payload);
      return { ...state, ...action.payload };
    },
    update_sopd: (state, action: PayloadAction<boolean>) => {
      console.log('Данные, пришедшие в редьюсер:', action.payload);
      return { ...state, sopd: action.payload };
    },
  },
});

export const { update, update_sopd } = dataSlice.actions;
export default dataSlice.reducer;