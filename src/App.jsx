import { useCallback, useEffect, useState } from 'react'
import './App.css'
import DetectiveDrawing from './components/DetectiveDrawing'
import GameStats from './components/GameStats'
import Keyboard from './components/Keyboard'
import SecretWordInput from './components/SecretWordInput'
import { SoundProvider } from './components/SoundProvider'
import WordDisplay from './components/WordDisplay'
import useSoundEffects from './hooks/useSoundEffects'

const MAX_MISTAKES = 6

function App() {
  const [secretWord, setSecretWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'lost'
  const { playSound } = useSoundEffects()

  // Log sound state on app load for debugging
  useEffect(() => {
    console.log(
      'App mounted, current sound muted state:',
      localStorage.getItem('wordDetectiveMuted')
    )
  }, [])

  // Reset state when a new secret word is set
  const handleSetSecretWord = word => {
    // This is called both when:
    // 1. The user enters a new word (word is not empty)
    // 2. The user clicks "Play Again" (word is empty string)

    setSecretWord(word.toLowerCase())
    setGuessedLetters([])
    setMistakes(0)
    setGameStatus('playing')

    // Only play the start sound if an actual word was entered
    // This prevents double playing when clicking "Play Again" and then entering a word
    if (word) {
      // Play start sound when the game begins (after the player enters the word)
      // Use a longer delay to ensure the game screen is fully rendered
      setTimeout(() => {
        console.log('Word entered, playing start sound')
        playSound('start')
      }, 500) // Half-second delay for better user experience
    }
  }

  // Check win/loss after each guess
  const checkGameStatus = useCallback(
    (updatedGuessedLetters, updatedMistakes) => {
      const allGuessed = secretWord
        .split('')
        .every(char => updatedGuessedLetters.includes(char.toLowerCase()))
      if (allGuessed) {
        // Play win sound immediately but delay the screen
        playSound('win')
        // Delay showing the win screen to allow users to see the complete word
        setTimeout(() => {
          setGameStatus('won')
        }, 1500) // 1.5 second delay
      } else if (updatedMistakes === MAX_MISTAKES) {
        // Play lose sound immediately but delay the screen
        playSound('lose')
        // Delay showing the loss screen to allow the final body part to render
        setTimeout(() => {
          setGameStatus('lost')
        }, 1000) // 1000ms = 1 second delay
      } else if (updatedMistakes > MAX_MISTAKES) {
        // This case should ideally not be reached if logic is correct, but handle defensively
        setGameStatus('lost')
      }
    },
    [secretWord, playSound, setGameStatus]
  )

  const handleGuess = useCallback(
    letter => {
      if (gameStatus !== 'playing') return
      if (guessedLetters.includes(letter)) return
      const updatedGuessedLetters = [...guessedLetters, letter]
      setGuessedLetters(updatedGuessedLetters)
      if (!secretWord.includes(letter)) {
        // Play wrong guess sound
        playSound('wrong')
        const updatedMistakes = mistakes + 1
        setMistakes(updatedMistakes)
        checkGameStatus(updatedGuessedLetters, updatedMistakes)
      } else {
        // Play correct guess sound
        playSound('correct')
        checkGameStatus(updatedGuessedLetters, mistakes)
      }
    },
    [gameStatus, guessedLetters, secretWord, playSound, mistakes, checkGameStatus]
  )

  useEffect(() => {
    const handler = e => {
      // Only handle keypresses if a secret word is set and the game is playing
      if (!secretWord || gameStatus !== 'playing') return

      const key = e.key
      // Check if it's a single letter key
      if (!key.match(/^[a-z]$/i)) return

      e.preventDefault()
      handleGuess(key.toLowerCase())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [secretWord, gameStatus, handleGuess]) // Only include necessary dependencies

  // Log when word input screen is shown
  useEffect(() => {
    if (!secretWord) {
      console.log('Showing word input screen')
    }
  }, [secretWord])

  if (!secretWord) {
    return <SecretWordInput onSubmit={handleSetSecretWord} />
  }

  // Game over messages
  let statusMessage = ''
  let statusWord = ''

  if (gameStatus === 'won') {
    statusMessage = `You Win!`
    statusWord = `The word was: ${secretWord}`
  } else if (gameStatus === 'lost') {
    statusMessage = `You Lose!`
    statusWord = `The word was: ${secretWord}`
  }

  const statusTextColorClass = gameStatus === 'won' ? 'text-green-600' : 'text-red-600'

  // Game Screen
  if (gameStatus === 'playing') {
    return (
      <div className='flex flex-col items-center w-full min-h-screen p-4 overflow-auto lg:w-screen lg:h-screen lg:p-0 lg:overflow-hidden bg-gradient-to-br from-blue-100 to-pink-100'>
        <h1 className='mt-8 mb-16 hangman-logo'>Word Detective</h1>
        <DetectiveDrawing mistakes={mistakes} />
        <div className='flex flex-col items-center mt-8'>
          <WordDisplay secretWord={secretWord} guessedLetters={guessedLetters} />
          <GameStats mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
          <Keyboard
            guessedLetters={guessedLetters}
            onGuess={handleGuess}
            disabled={gameStatus !== 'playing'}
          />
        </div>
      </div>
    )
  }

  // Game Over Screen
  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-auto lg:w-screen lg:h-screen lg:p-0 lg:overflow-hidden ${
        gameStatus === 'won' ? 'blink-green' : 'blink-red'
      }`}
    >
      <h1 className='mt-8 mb-4 hangman-logo'>Word Detective</h1>
      <div className={`text-4xl font-bold text-center ${statusTextColorClass} mb-8 px-4`}>
        {statusMessage}
      </div>
      <div className={`text-3xl font-medium text-center text-gray-500 mb-8 px-4`}>{statusWord}</div>
      <button
        className='px-8 py-3 mt-12 text-xl font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700'
        onClick={() => {
          // Reset to the word input screen without playing any sound
          console.log('Play Again clicked - returning to word input screen')
          handleSetSecretWord('')
        }}
      >
        Play Again
      </button>

      {/* Preload audio files */}
      <audio src='/sounds/game-start.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/correct.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/wrong.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/win.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/lose.mp3' preload='auto' style={{ display: 'none' }} />
    </div>
  )
}

// Wrap App with SoundProvider
const AppWithSound = () => (
  <SoundProvider>
    <App />
  </SoundProvider>
)

export default AppWithSound
