import { useEffect, useRef } from 'react'
import { useSoundSettings } from '../components/SoundControl'

export default function useSoundEffects() {
  // Create audio refs for each sound
  const startSound = useRef(new Audio('/sounds/game-start.mp3'))
  const correctSound = useRef(new Audio('/sounds/correct.mp3'))
  const wrongSound = useRef(new Audio('/sounds/wrong.mp3'))
  const winSound = useRef(new Audio('/sounds/win.mp3'))
  const loseSound = useRef(new Audio('/sounds/lose.mp3'))
  
  // Get sound settings from context
  const { muted } = useSoundSettings()

  // Set appropriate volumes
  useEffect(() => {
    // Set volume for each sound
    startSound.current.volume = 0.4
    correctSound.current.volume = 0.4
    wrongSound.current.volume = 0.3
    winSound.current.volume = 0.5
    loseSound.current.volume = 0.5
  }, [])

  const playSound = (type) => {
    // If muted, don't play any sounds
    if (muted) return
    
    // Stop any currently playing sounds
    const allSounds = [startSound, correctSound, wrongSound, winSound, loseSound]
    allSounds.forEach(sound => {
      sound.current.pause()
      sound.current.currentTime = 0
    })

    // Dispatch an event to notify components that a sound is playing
    window.dispatchEvent(new Event('soundplayed'));

    // Play the requested sound
    switch (type) {
      case 'start':
        startSound.current.play().catch(e => console.error('Error playing sound:', e))
        break
      case 'correct':
        correctSound.current.play().catch(e => console.error('Error playing sound:', e))
        break
      case 'wrong':
        wrongSound.current.play().catch(e => console.error('Error playing sound:', e))
        break
      case 'win':
        winSound.current.play().catch(e => console.error('Error playing sound:', e))
        break
      case 'lose':
        loseSound.current.play().catch(e => console.error('Error playing sound:', e))
        break
      default:
        console.warn('Unknown sound type:', type)
    }
  }

  return { playSound }
}
