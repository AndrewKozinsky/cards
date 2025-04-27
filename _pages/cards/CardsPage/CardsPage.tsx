import React from 'react'
import PageWrapper from '../../../components/pagesRelated/PageWrapper/PageWrapper'
import { routeNames } from '../../../config/routeNames'
import CardsWrapper from '../CardsWrapper/CardsWrapper'

function CardsPage() {
	return (
		<PageWrapper header={routeNames.cards.name}>
			<CardsWrapper />
		</PageWrapper>
	)
}

export default CardsPage
