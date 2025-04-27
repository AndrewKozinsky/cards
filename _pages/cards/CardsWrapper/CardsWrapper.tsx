'use client'

import React from 'react'
import RefetchCardsButton from '../../../components/cards/RefetchCardsButton/RefetchCardsButton'
import Card from '../Card/Card'
import { cardsConfig } from '../cardsConfig'
import { LoadingCardInStore, useCardsStore } from '../cardsStore'
import { useFetchCards } from './fn/fetchCards'
import './CardsWrapper.scss'

function CardsWrapper() {
	useFetchCards()

	const cardStoreStatus = useCardsStore((s) => s.status)
	const cardsArray = useCardsStore((s) => s.cards)

	if (cardStoreStatus === 'loading') {
		const emptyCardsData: LoadingCardInStore[] = Array.from({ length: cardsConfig.cardsPerPage }, () => {
			return { type: 'loading' }
		})

		const loadingCards = emptyCardsData.map((cardConfig, index) => {
			return <Card card={cardConfig} key={index}></Card>
		})

		return <div className='cards-wrapper'>{loadingCards}</div>
	}

	if (cardStoreStatus === 'error') {
		return (
			<div className='cards-wrapper__error'>
				<p>An error occurred while loading</p>
				<RefetchCardsButton />
			</div>
		)
	}

	if (cardsArray === null) {
		return null
	}

	const cards = cardsArray.map((cardConfig, index) => {
		return <Card card={cardConfig} key={index}></Card>
	})

	return <div className='cards-wrapper'>{cards}</div>
}

export default CardsWrapper
