import { createSlice } from "@reduxjs/toolkit";

type TSidebarState = {
  open: boolean;
};

const initialState: TSidebarState = {
  open: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
