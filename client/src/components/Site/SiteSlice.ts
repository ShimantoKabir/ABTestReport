import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IOCode} from "../../common/IOCode";
import axios from "axios";
import AppConstants from "../../common/AppConstants";
import {IOMsg} from "../../common/IOMsg";

export interface SiteState {
	sites: [];
	alert: {
		heading: string,
		body: string,
		code: number,
		state: boolean
	}
}

const initialState: SiteState = {
	sites: [],
	alert: {
		heading: "",
		body: "",
		code: IOCode.EMPTY,
		state: true,
	}
};

export const loadSite = createAsyncThunk('sites', async () => {
	console.log("hi1");
		const response = await axios({
			method: "GET",
			url: AppConstants.baseUrl + "sites",
			headers: AppConstants.getAxiosHeader(),
			withCredentials: true,
		})
		return response.data;
	}
);

export const siteSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		updateSite: (state) => {

		},
	},
	extraReducers: (builder) => {
		builder
		.addCase(loadSite.pending, (state) => {
			console.log("pending")
			state.alert = {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: false,
			}
		})
		.addCase(loadSite.fulfilled, (state, action) => {
			console.log("fulfilled",action.payload)
			console.log("action=", action);
		})
		.addCase(loadSite.rejected, (state) => {
			console.log("rejected")
			state.alert = {
				heading: IOMsg.LOADING_HEAD,
				body: IOMsg.LOADING_MSG,
				code: IOCode.OK,
				state: true
			}
		})
	}
});

export const {updateSite} = siteSlice.actions;
export default siteSlice.reducer;
