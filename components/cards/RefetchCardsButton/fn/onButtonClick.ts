import { useCallback } from 'react'
import cardsManager from '../../../../_pages/cards/cardsManager'

export function useGetOnButtonClick() {
	return useCallback(cardsManager.fetchCards, [])
}
