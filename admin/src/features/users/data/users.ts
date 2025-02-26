import { faker } from '@faker-js/faker'

export const users = Array.from({ length: 20 }, () => {
  return {
    id: faker.string.uuid(),
    wallet: faker.string.uuid(),
    referralCode: faker.string.alphanumeric(8).toUpperCase(),
    points: faker.number.int({ min: 5000, max: 1000000 }),
    levelOne: faker.helpers.arrayElement([
      'active',
      'inactive',
    ]),
    levelOneStake: faker.number.int({ min: 10, max: 1000000 }),
    levelTwo: faker.helpers.arrayElement([
      'active',
      'inactive',
    ]),
    levelTwoStake: faker.number.int({ min: 10, max: 1000000 }),
    dateJoined: faker.date.past(),
  }
})
