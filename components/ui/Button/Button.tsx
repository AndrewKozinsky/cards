import React, { ButtonHTMLAttributes } from 'react'
import './Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: string
}

function Button(props: ButtonProps) {
	const { children, ...buttonAttrs } = props

	return (
		<button {...buttonAttrs} className='button'>
			{children}
		</button>
	)
}

export default Button
