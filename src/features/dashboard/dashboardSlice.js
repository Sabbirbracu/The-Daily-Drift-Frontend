// src/features/dashboard/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    refetchTrigger: 0,
  },
  reducers: {
    triggerDashboardRefetch: (state) => {
      state.refetchTrigger += 1;
    },
  },
});

export const { triggerDashboardRefetch } = dashboardSlice.actions;
export default dashboardSlice.reducer;
