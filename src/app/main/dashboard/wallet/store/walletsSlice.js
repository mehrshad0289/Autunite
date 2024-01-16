import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWallets = createAsyncThunk('walletsDashboardApp/wallets/getWallets', async () => {
  const response = await axios.get('/api/wallets');
  return await response.data.data;
});



const walletsSlice = createSlice({
  name: 'walletsDashboardApp/wallets',
  initialState: [],
  reducers: {},
  extraReducers: {
    [getWallets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWallets = ({ walletsDashboardApp }) => walletsDashboardApp.wallets;
export const selectWallet = ({ walletsDashboardApp,id }) => {
  console.log(walletsDashboardApp)
  return walletsDashboardApp.wallets.find(x=>x.id ===id)
};

export default walletsSlice.reducer;
