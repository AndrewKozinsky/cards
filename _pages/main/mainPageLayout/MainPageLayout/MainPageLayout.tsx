import React from 'react'
import MainHeader from '../MainHeader/MainHeader'
import MainFooter from '../MainFooter/MainFooter'
import './MainPageLayout.scss'

type MainPageLayoutProps = {
	children: React.ReactNode
}

function MainPageLayout(props: MainPageLayoutProps) {
	const { children } = props

	return (
		<>
			<MainHeader />
			<div className='page-content'>{children}</div>
			<MainFooter />
		</>
	)
}

export default MainPageLayout
