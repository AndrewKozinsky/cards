import { create } from 'zustand'

export type CardInStore = LoadingCardInStore | EmptyCardInStore | FullCardInStore

export type LoadingCardInStore = {
	type: 'loading'
}

export type EmptyCardInStore = {
	type: 'empty'
}

export type FullCardInStore = {
	type: 'full'
	title: string
	text: string
}

type Status = 'loading' | 'error' | 'success'
type Cards = null | CardInStore[]
interface CardsStore {
	status: Status
	cards: Cards
	updateStatus: (status: Status) => void
	updateCards: (cards: Cards) => void
}

export const useCardsStore = create<CardsStore>()((set) => ({
	status: 'loading',
	cards: null,
	updateStatus: (status: Status) =>
		set((state) => {
			return { status }
		}),
	updateCards: (cards: Cards) =>
		set((state) => {
			return { cards }
		}),
}))
