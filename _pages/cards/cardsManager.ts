import CardsApiTypes from '../../requests/cards/cardsApiTypes'
import cardsRequests from '../../requests/cards/cardsRequests'
import { cardsConfig } from './cardsConfig'
import { CardInStore, FullCardInStore, useCardsStore } from './cardsStore'

class CardsManager {
	fetchCards() {
		useCardsStore.setState({ cards: null, status: 'loading' })

		cardsRequests.getCards().then((data) => {
			if ('error' in data) {
				useCardsStore.setState({ cards: null, status: 'error' })
			} else {
				const cards = this.prepareFetchedCards(data.cards)
				useCardsStore.setState({ cards, status: 'success' })
			}
		})
	}

	prepareFetchedCards(rawCards: CardsApiTypes.Card[]) {
		const rawCardsSorted = rawCards.sort((a, b) => {
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

	useIsCardsLoading() {
		const cardStoreStatus = useCardsStore((s) => s.status)
		return cardStoreStatus === 'loading'
	}
}

const cardsManager = new CardsManager()
export default cardsManager
