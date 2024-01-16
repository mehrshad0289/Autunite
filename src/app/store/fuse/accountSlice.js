import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    address:null,
    provider:null,
};
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.address = action.payload
        },
        setProvider: (state, action) => {
            state.provider = action.payload
        },
    },
});

export const { setAccount } = accountSlice.actions;
export const { setProvider } = accountSlice.actions;
export const getAccount = ({ fuse }) => fuse.account.address;
export const getProvider = ({ fuse }) => fuse.account.provider;


export default accountSlice.reducer;
