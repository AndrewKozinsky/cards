import React from 'react'
import Link from 'next/link'
import RefetchCardsButton from '../../../../components/cards/RefetchCardsButton/RefetchCardsButton'
import { routeNames } from '../../../../config/routeNames'
import './MainHeader.scss'

function MainHeader() {
	return (
		<header className='main-header'>
			<ul className='main-header__menu'>
				<li>
					<Link className='main-header__link' href={routeNames.main.path}>
						{routeNames.main.name}
					</Link>
				</li>
				<li>
					<Link className='main-header__link' href={routeNames.cards.path}>
						{routeNames.cards.name}
					</Link>
				</li>
			</ul>
			<RefetchCardsButton />
		</header>
	)
}

export default MainHeader
