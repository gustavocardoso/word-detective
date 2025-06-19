import { useState } from 'react'

export default function SecretWordInput({ onSubmit }) {
  const [secretWord, setSecretWord] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => {
    const value = e.target.value
    // Only allow letters
    if (/^[a-zA-Z]*$/.test(value)) {
      setSecretWord(value)
      setError('')
    } else {
      setError('Only letters (A-Z, a-z) are allowed.')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!secretWord) {
      setError('Please enter a word.')
      return
    }
    if (!/^[a-zA-Z]+$/.test(secretWord)) {
      setError('Only letters (A-Z, a-z) are allowed.')
      return
    }
    setError('')

    // Add a brief delay before submitting to create a smooth transition
    // This also helps ensure the sound plays after the game screen appears
    setTimeout(() => {
      onSubmit(secretWord)
    }, 200)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100'
    >
      <h1 className='mb-8 hangman-logo'>Word Detective</h1>
      <div className='flex flex-col items-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold text-blue-700'>Enter a Secret Word</h2>
        <input
          type='password'
          value={secretWord}
          onChange={handleChange}
          className='w-full px-4 py-2 mb-2 text-lg tracking-widest text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='Secret word'
          aria-label='Secret word'
          autoFocus
        />
        {error && <p className='mb-2 text-sm text-red-500'>{error}</p>}
        <button
          type='submit'
          className='w-full px-6 py-2 mt-2 text-lg font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700'
        >
          Start Game
        </button>
        <p className='mt-4 text-xs text-gray-500'>Input is hidden so Player 2 can't see it.</p>
      </div>

      {/* Preload audio files to ensure they're ready to play */}
      <audio src='/sounds/game-start.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/correct.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/wrong.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/win.mp3' preload='auto' style={{ display: 'none' }} />
      <audio src='/sounds/lose.mp3' preload='auto' style={{ display: 'none' }} />
    </form>
  )
}
