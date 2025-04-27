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

interface CardsStore {
	status: 'loading' | 'error' | 'success'
	cards: null | CardInStore[]
	// increase: (by: number) => void
}

export const useCardsStore = create<CardsStore>()((set) => ({
	status: 'loading',
	cards: null,
	// increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
