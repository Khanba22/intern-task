import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoardState {
  metaData: Record<string, any[]>;
}

interface AddComponentPayload {
  username: string;
  data: any;
}

const initialState: BoardState = {
  metaData: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<AddComponentPayload>) => {
      const { username, data } = action.payload;
      if (state.metaData[username]) {
        return {
          ...state,
          metaData: {
            ...state.metaData,
            [username]: [...state.metaData[username], data],
          },
        };
      } else {
        return {
          ...state,
          metaData: {
            ...state.metaData,
            [username]: [data],
          },
        };
      }
    },
    setMetaData: (state, action) => {
      return {
        ...state,
        metaData: action.payload.metaData,
      };
    },
    removeComponent: (state, action) => {
      const { username } = action.payload;
      if (!username) {
        return {
          ...state,
        };
      }
      if (!state.metaData[username]) {
        return { ...state };
      }
      return {
        ...state,
        metaData: {
          ...state.metaData,
          [username]: state.metaData[username].slice(0, -1),
        },
      };
    },
  },
});

export const { addComponent, removeComponent, setMetaData } =
  boardSlice.actions;
export default boardSlice.reducer;
