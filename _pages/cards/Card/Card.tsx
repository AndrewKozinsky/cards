import React from 'react'
import { CardInStore } from '../cardsStore'
import './Card.scss'

type CardProps = {
	card: CardInStore
}

function Card(props: CardProps) {
	const { card } = props

	const cardClasses = 'card card--' + card.type

	if (card.type !== 'full') {
		return <div className={cardClasses} />
	}

	return (
		<div className={cardClasses}>
			<h3 className='card__title'>{card.title}</h3>
			<p className='card__text'>{card.text}</p>
		</div>
	)
}

export default Card
