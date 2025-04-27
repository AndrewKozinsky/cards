import { useCallback, useEffect, useRef, useState } from 'react'
import cardsManager from '../../../../_pages/cards/cardsManager'

export function useGetOnButtonClick() {
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const isCardsLoadedSuccessfully = cardsManager.useIsCardsLoadedSuccessfully()
	const isCardsLoadedWithError = cardsManager.useIsCardsLoadedWithError()
	const timeoutIdRef = useRef<null | NodeJS.Timeout>(null)

	const onButtonClick = useCallback(() => {
		cardsManager.fetchCards()

		setIsButtonDisabled(true)
	}, [])

	useEffect(() => {
		if (!isCardsLoadedSuccessfully) {
			return
		}

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current)
		}

		timeoutIdRef.current = setTimeout(() => {
			setIsButtonDisabled(false)
		}, 3000)
	}, [isCardsLoadedSuccessfully])

	useEffect(() => {
		if (!isCardsLoadedWithError) {
			return
		}

		if (timeoutIdRef.current) {
			clearTimeout(timeoutIdRef.current)
		}

		setIsButtonDisabled(false)
	}, [isCardsLoadedWithError])

	return {
		onButtonClick,
		isButtonDisabled,
	}
}
