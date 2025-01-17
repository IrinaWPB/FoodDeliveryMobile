import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	items: [],
}

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload]
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex((item) => item._id == action.payload)
			let newBasket = [...state.items]
			if (index >= 0) {
				newBasket.splice(index, 1)
			} else {
				console.warn('Can not remove the item, it is not in the basket')
			}
			state.items = newBasket
		},
		emptyBasket: (state, action) => {
			state.items = []
		}
	}
})

export const { addToBasket, removeFromBasket, emptyBasket } = basketSlice.actions

export const selectBasketItems = (state) => state.basket.items
export const selectBasketItemsWithId = (state, id) => state.basket.items.filter((item) => item._id === id)
export const selectBasketTotal = (state) => state.basket.items.reduce((total, item) => total += item.price, 0)

export default basketSlice.reducer