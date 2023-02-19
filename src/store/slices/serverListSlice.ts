import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Servers {
  _id: string;
  name: string;
  tag: string;
  icon: {
    tag: string;
    _id: string;
  };
}

interface ServerListState {
  servers: Servers[];
}

const initialState: ServerListState = {
  servers: [],
};

const serverListSlice = createSlice({
  name: "serverList",
  initialState,
  reducers: {
    setServers(state, action: PayloadAction<Servers[]>) {
      state.servers = action.payload;
    },
  },
});

export const { setServers } = serverListSlice.actions;

export default serverListSlice.reducer;
