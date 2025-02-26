import {Staker, Referral, Stats} from "../types/staker";
import { faker } from "@faker-js/faker";

export const mockStakers: Staker[] = Array.from({ length: 250 }, (_, index) => {
  const n = faker.number.int({ min: 1, max: 25 });
  const y = `${n} day${n > 1 ? "s" : ""} left`;
  
  return {
    sn: index + 1,
    wallet: faker.string.uuid(),
    userid: faker.string.uuid(),
    amount: faker.number.int({ min: 10, max: 10000 }),
    profit: faker.number.int({ min: 1000, max: 1000000 }),
    startdate: faker.date.past(),
    enddate: faker.date.future(),
    daysleft: y,
    status: faker.helpers.arrayElement(["active", "passed", "upcoming", "achieved"]),
  };
});


export const mockReferrals: Referral[] = Array.from({ length: 150 }, (_, index) => {
  return {
    sn: index + 1,
    wallet: faker.string.uuid(),
    userid: faker.string.uuid(),
    referralCode: String(faker.number.int({ min: 1000000, max: 99999999 })),
    firstUpline: faker.number.int({ min: 1, max: 100 }),
    secondUpline: faker.number.int({ min: 1, max: 100 }),
    thirdUpline: faker.number.int({ min: 1, max: 100 }),
  };
});


export const mockStatData: Stats[] = Array.from({ length: 50 }, () => {
  return {
    date: faker.date.past(),
    levelOne: faker.number.int({ min: 1000, max: 10000 }),
    levelTwo: faker.number.int({ min: 1000, max: 10000 }),
  };
});
