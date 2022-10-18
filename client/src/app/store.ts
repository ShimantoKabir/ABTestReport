import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import siteSlice from "../components/Site/SiteSlice";

export const store = configureStore({
	reducer: {
		siteReducer: siteSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
