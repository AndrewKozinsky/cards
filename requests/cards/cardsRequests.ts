import axios from 'axios'
import $api from '../api'
import { apiUrls } from '../apiUrls'
import { ApiInvalidData } from '../common'
import CardsApiTypes, { GetCardsSchema } from './cardsApiTypes'

let getCardsAbort: AbortController | null = null

const cardsRequests = {
	async getCards(): Promise<CardsApiTypes.GetCards> {
		try {
			// Abort previous request if it exists
			if (getCardsAbort && !getCardsAbort.signal.aborted) {
				getCardsAbort.abort()
				getCardsAbort = null // Clear it right away
			}

			// Create a new AbortController for this request
			getCardsAbort = new AbortController()

			const response = await $api.get<CardsApiTypes.GetCards>(apiUrls.cards, {
				signal: getCardsAbort.signal,
			})

			if (response.status !== 200) {
				throw new Error('Wrong status code: ' + response.status + '')
			}

			GetCardsSchema.parse(response.data)

			return response.data
		} catch (err: unknown) {
			if (axios.isCancel(err)) {
				return {
					error: 'Request was aborted',
					aborted: true,
				} as ApiInvalidData
			}

			let errorMessage = err instanceof Error ? err.message : 'Unknown error'

			return {
				error: errorMessage,
			} as ApiInvalidData
		}
	},
}

export default cardsRequests
