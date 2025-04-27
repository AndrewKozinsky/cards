import React from 'react'
import './PageWrapper.scss'

type PageWrapperProps = {
	header: string
	children: React.ReactNode
}

function PageWrapper(props: PageWrapperProps) {
	const { children } = props

	return (
		<main className='page-wrapper'>
			<h1 className='page-wrapper__header'>{props.header}</h1>
			<div>{children}</div>
		</main>
	)
}

export default PageWrapper
