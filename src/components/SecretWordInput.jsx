import { useState } from 'react'
import SoundControl from './SoundControl'

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
    onSubmit(secretWord)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-pink-100'
    >
      <SoundControl />
      <h1 className='hangman-logo mb-8'>Word Detective</h1>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center'>
        <h2 className='text-2xl font-bold mb-4 text-blue-700'>Enter a Secret Word</h2>
        <input
          type='password'
          value={secretWord}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-center tracking-widest mb-2'
          placeholder='Secret word'
          aria-label='Secret word'
          autoFocus
        />
        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
        <button
          type='submit'
          className='mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold text-lg w-full'
        >
          Start Game
        </button>
        <p className='mt-4 text-gray-500 text-xs'>Input is hidden so Player 2 can't see it.</p>
      </div>
    </form>
  )
}
