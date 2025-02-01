import * as T from '@/types'
import {v4 as uuidv4} from 'uuid';

export const defaultRefResponse: T.getSelfRefResponse = {
  id: 0,
  address: '',
  code: '',
  uplinkId: 0,
  uplineCode: null,
  userID: 0,
  upline: 0,
  uplines: [],
  downlines: {
    firstLevel: 0,
    secondLevel: 0,
    thirdLevel: 0,
  },
  points: 0
}

export const demoNoti = (length: number) => Array.from({length}, (_, i) => ({
  id: i + 1,
  uuid: uuidv4(),
  title: `${i}-This is a very descriptive and lengthy title for item number ${i + 1}, giving more context and meaning.`,
  message: `${i}-Here is a detailed and lengthy message for item number ${i + 1}, providing additional insight into the purpose and content of this particular object.`
}));