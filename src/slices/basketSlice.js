import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
	value: 0,
};

// creating a slice - "basket"
const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		increaseByOne: (state, action) => {
			const index = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);
			if (index >= 0) {
				state.items[index].quantity += 1;
			} else {
				action.payload.quantity = 1;
				state.items = [...state.items, action.payload];
			}
			state.totalQuantity += 1;
		},

		reduceByOne: (state, action) => {
			const index = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);
			if (index >= 0) {
				state.items[index].quantity -= 1;
				state.totalQuantity -= 1;
			}
		},

		removeFromBasket: (state, action) => {
			// return the first index of the occurence if the item exists in the basket
			const index = state.items.findIndex(
				(basketItem) => basketItem.id === action.payload.id
			);
			let newBasket = [...state.items];
			if (index >= 0) {
				newBasket.splice(index, 1);
				state.items = newBasket;
			} else {
				console.warn(
					`Can't remove product (id:${action.payload.id}) as it's not in the basket!`
				);
			}
		},
	},
});

export const { increaseByOne, addToBasket, reduceByOne, removeFromBasket } =
	basketSlice.actions;

// Selectors - to pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export const selectTotalQuantity = (state) =>
	state.basket.items.reduce(
		(totalQuantity, item) => totalQuantity + item.quantity,
		0
	);
export const selectTotalAmount = (state) =>
	state.basket.items.reduce(
		(totalAmount, item) => totalAmount + item.price * item.quantity,
		0
	);
export default basketSlice.reducer;
