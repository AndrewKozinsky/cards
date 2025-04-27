'use client'

import React from 'react'
import Button from '../../ui/Button/Button'
import { useGetOnButtonClick } from './fn/onButtonClick'

function RefetchCardsButton() {
	const onButtonClick = useGetOnButtonClick()

	return <Button onClick={onButtonClick}>Refetch Cards</Button>
}

export default RefetchCardsButton
