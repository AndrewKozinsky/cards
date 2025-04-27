import { useEffect } from 'react'
import cardsManager from '../../cardsManager'
import { useCardsStore } from '../../cardsStore'

export function useFetchCards() {
	const cardStoreStatus = useCardsStore((s) => s.status)

	useEffect(
		function () {
			if (cardStoreStatus !== 'loading') return

			cardsManager.fetchCards()
		},
		[cardStoreStatus],
	)
}
