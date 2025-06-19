import { useEffect, useRef } from 'react'

export default function useSoundEffects() {
  // Create audio refs for each sound using files from public/sounds directory
  const startSound = useRef(new Audio('/sounds/game-start.mp3'))
  const correctSound = useRef(new Audio('/sounds/correct.mp3'))
  const wrongSound = useRef(new Audio('/sounds/wrong.mp3'))
  const winSound = useRef(new Audio('/sounds/win.mp3'))
  const loseSound = useRef(new Audio('/sounds/lose.mp3'))

  // Sound is always enabled

  // Set appropriate volumes and preload audio
  useEffect(() => {
    // Set volume for each sound
    startSound.current.volume = 0.2
    correctSound.current.volume = 0.4
    wrongSound.current.volume = 0.2
    winSound.current.volume = 0.6
    loseSound.current.volume = 0.3

    // Preload all sounds
    const allSounds = [startSound, correctSound, wrongSound, winSound, loseSound]
    allSounds.forEach(sound => {
      // Load the audio file
      sound.current.load()

      // Set to "auto" preload mode
      sound.current.preload = 'auto'
    })
  }, [])
  const playSound = type => {
    console.log(`Playing sound: ${type}`)

    // Stop any currently playing sounds
    const allSounds = [startSound, correctSound, wrongSound, winSound, loseSound]
    allSounds.forEach(sound => {
      sound.current.pause()
      sound.current.currentTime = 0
    })

    // Dispatch an event to notify components that a sound is playing
    window.dispatchEvent(new Event('soundplayed'))

    // Select the correct sound based on type
    let sound = null

    switch (type) {
      case 'start':
        sound = startSound.current
        sound.volume = 0.3 // Slightly increased volume for start sound
        console.log('Playing start sound')
        break
      case 'correct':
        sound = correctSound.current
        break
      case 'wrong':
        sound = wrongSound.current
        break
      case 'win':
        sound = winSound.current
        break
      case 'lose':
        sound = loseSound.current
        break
      default:
        console.warn('Unknown sound type:', type)
        return
    }

    // Play the sound with error handling
    if (sound) {
      try {
        sound.play().catch(error => {
          console.error(`Error playing ${type} sound:`, error)
          // Try again after a short delay (helps with iOS/Safari)
          setTimeout(() => {
            sound.play().catch(e => console.error(`Second attempt for ${type} sound failed:`, e))
          }, 200)
        })
      } catch (error) {
        console.error(`Exception playing ${type} sound:`, error)
      }
    }
  }

  return { playSound }
}
