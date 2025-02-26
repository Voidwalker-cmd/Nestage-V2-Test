import { z } from 'zod'

const userLevelStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
])
export type UserLevelStatus = z.infer<typeof userLevelStatusSchema>

const userSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  referralCode: z.string(),
  points: z.number(),
  levelOne: userLevelStatusSchema,
  levelOneStake: z.number(),
  levelTwo: userLevelStatusSchema,
  levelTwoStake: z.number(),
  dateJoined: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
