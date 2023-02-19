import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
};

const userAvatarSlice = createSlice({
  name: "userAvatar",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { setId, setUsername } = userAvatarSlice.actions;

export default userAvatarSlice.reducer;
