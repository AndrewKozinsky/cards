import $api from '../api'
import { apiUrls } from '../apiUrls'
import { ApiInvalidData } from '../common'
import CardsApiTypes, { GetCardsSchema } from './cardsApiTypes'

const getCardsAbort = new AbortController()

const cardsRequests = {
	async getCards(): Promise<CardsApiTypes.GetCards> {
		try {
			const response = await $api.get<CardsApiTypes.GetCards>(apiUrls.cards, {
				signal: getCardsAbort.signal,
			})

			if (response.status !== 200) {
				throw new Error('Wrong status code: ' + response.status + '')
			}

			GetCardsSchema.parse(response.data)

			return response.data
		} catch (err: unknown) {
			let errorMessage = err instanceof Error ? err.message : 'Unknown error'

			return {
				error: errorMessage,
			} as ApiInvalidData
		}
	},
}

export default cardsRequests
