import { useEffect } from 'react'
import cardsManager from '../../cardsManager'
import { useCardsStore } from '../../cardsStore'

export function useFetchCards() {
	useEffect(cardsManager.fetchCards, [])
}
