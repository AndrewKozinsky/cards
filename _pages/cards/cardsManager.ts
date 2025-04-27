import CardsApiTypes from '../../requests/cards/cardsApiTypes'
import cardsRequests from '../../requests/cards/cardsRequests'
import { cardsConfig } from './cardsConfig'
import { CardInStore, FullCardInStore, useCardsStore } from './cardsStore'

class CardsManager {
	fetchCards = () => {
		useCardsStore.getState().updateStatus('loading')
		useCardsStore.getState().updateCards(null)

		cardsRequests.getCards().then((data) => {
			if ('error' in data) {
				if (!data.aborted) {
					useCardsStore.getState().updateStatus('error')
					useCardsStore.getState().updateCards(null)
				}
			} else {
				const cards = this.prepareFetchedCards(data.cards)

				useCardsStore.getState().updateStatus('success')
				useCardsStore.getState().updateCards(cards)
			}
		})
	}

	prepareFetchedCards(rawCards: CardsApiTypes.Card[]) {
		const rawCardsSorted = rawCards.sort((a, b) => {
			const aHasTitle = a.title?.trim() !== ''
			const bHasTitle = b.title?.trim() !== ''

			if (!aHasTitle && bHasTitle) return 1 // a has empty title, b has title → a after b
			if (aHasTitle && !bHasTitle) return -1 // a has title, b has empty title → a before b
			if (!aHasTitle && !bHasTitle) return 0 // both have empty titles → keep relative order

			const titleComparison = a.title.localeCompare(b.title)
			if (titleComparison !== 0) {
				return titleComparison
			}

			return a.text.length - b.text.length
		})

		const cards: CardInStore[] = rawCardsSorted.map((rawCard) => {
			return { ...rawCard, type: 'full' } as FullCardInStore
		})

		// Remove exceed cards
		if (cards.length > cardsConfig.cardsPerPage) {
			cards.length = cardsConfig.cardsPerPage
		}

		// Add missing cards if there is not enough
		const missingNumberOfCards = cardsConfig.cardsPerPage - cards.length
		for (let i = 0; i < missingNumberOfCards; i++) {
			cards.push({ type: 'empty' })
		}

		return cards
	}

	useIsCardsLoadedSuccessfully() {
		const cardStoreStatus = useCardsStore((s) => s.status)
		return cardStoreStatus === 'success'
	}

	useIsCardsLoadedWithError() {
		const cardStoreStatus = useCardsStore((s) => s.status)
		return cardStoreStatus === 'error'
	}
}

const cardsManager = new CardsManager()
export default cardsManager
