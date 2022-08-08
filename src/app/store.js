import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// the global store setup and "basket" is just one of the slices
// we also have users and other slices/info that we can access to
export const store = configureStore({
	reducer: {
		basket: basketReducer,
	},
});
