import { useState, useCallback, useEffect } from 'react'
import Background from '~components/learn/Background'
import StartWelcome from '~components/learn/StartWelcome'
import AlphabetGrid from '~components/learn/AlphabetGrid'
import { useMotionStore, useMotionHydration } from '~/src/store'

import { getLearnLayout } from '~components/layout/DefaultLayout'

export default function Learn() {
  const showWelcome = useMotionStore.use.showLearnWelcome()
  const setShowWelcome = useMotionStore.use.setShowLearnWelcome()
  const hydrated = useMotionHydration()

  const [gridReady, setGridReady] = useState(false)

  const revealGrid = useCallback(() => {
    setGridReady(true)
  }, [])

  const handleExit = useCallback(() => {
    revealGrid()
    setShowWelcome(false)
  }, [revealGrid, setShowWelcome])

  useEffect(() => {
    if (hydrated && !showWelcome) {
      revealGrid()
    }
  }, [hydrated, showWelcome, revealGrid])

  return (
    <Background expand={gridReady}>
      {hydrated && showWelcome && <StartWelcome onExit={handleExit} />}
      <AlphabetGrid show={gridReady} />
    </Background>
  )
}

Learn.getLayout = getLearnLayout