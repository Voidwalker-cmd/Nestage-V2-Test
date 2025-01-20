"use client"

import { useState } from 'react'
import LevelOne from './LevelOne'
import LevelTwo from './LevelTwo'
import Initial from './Initial'

const ModalDetails = () => {
const [stage, setStage] = useState(0)
  return (
      <>
          {stage === 0 && <Initial setStage={setStage} />}
          {stage === 1 && <LevelOne setStage={setStage} />}
          {stage === 2 && <LevelTwo setStage={setStage} />}
      </>
  )
}

export default ModalDetails