import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const joinGame = createAsyncThunk(
  'game/join',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/games/${gameId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const placeBid = createAsyncThunk(
  'game/placeBid',
  async ({ gameId, card }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/games/${gameId}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ card }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    gameId: null,
    status: 'waiting',
    players: [],
    currentPlayer: null,
    currentCar: null,
    currentPowerCard: null,
    selectedCard: null,
    error: null,
    loading: false,
  },
  reducers: {
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    updateGameState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinGame.fulfilled, (state, action) => {
        state.loading = false;
        state.gameId = action.payload.gameId;
        state.players = action.payload.players;
        state.currentPlayer = action.payload.currentPlayer;
      })
      .addCase(joinGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(placeBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCard = null;
        // Update game state with new auction results
        Object.assign(state, action.payload);
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCard, updateGameState } = gameSlice.actions;
export default gameSlice.reducer;