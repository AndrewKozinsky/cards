import React from 'react'
import type { Metadata } from 'next'
import MainPageLayout from '../_pages/main/mainPageLayout/MainPageLayout/MainPageLayout'

export const metadata: Metadata = {
	title: 'Web-site',
	description: 'Web-site description',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<MainPageLayout>{children}</MainPageLayout>
			</body>
		</html>
	)
}
