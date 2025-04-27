import { z } from 'zod'
import { ApiInvalidData } from '../common'

const CardSchema = z.object({
	title: z.string(),
	text: z.string(),
})

export const GetCardsSchema = z.object({
	cards: z.array(CardSchema),
})

namespace CardsApiTypes {
	export type Card = z.infer<typeof CardSchema>
	export type GetCards = z.infer<typeof GetCardsSchema> | ApiInvalidData
}

export default CardsApiTypes
