const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const ROW1 = LETTERS.slice(0, 10) // A-J
const ROW2 = LETTERS.slice(10, 19) // K-S
const ROW3 = LETTERS.slice(19) // T-Z

export default function Keyboard({ guessedLetters, onGuess, disabled }) {
  return (
    <div className='flex flex-col items-center max-w-md gap-2 mx-auto mb-6'>
      {/* Row 1 */}
      <div className='flex justify-center w-full gap-1 sm:gap-1 md:gap-2 lg:gap-1'>
        {ROW1.map(letter => {
          const isGuessed = guessedLetters.includes(letter.toLowerCase())
          return (
            <button
              key={letter}
              className={`px-3 py-2 rounded font-bold text-lg border border-blue-300 shadow-sm transition-colors
                ${
                  isGuessed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-blue-100 text-blue-700'
                }`}
              onClick={() => onGuess(letter.toLowerCase())}
              disabled={isGuessed || disabled}
              aria-label={`Guess letter ${letter}`}
            >
              {letter}
            </button>
          )
        })}
      </div>
      {/* Row 2 */}
      <div className='flex justify-center w-full gap-1 sm:gap-1 md:gap-2 lg:gap-1'>
        {ROW2.map(letter => {
          const isGuessed = guessedLetters.includes(letter.toLowerCase())
          return (
            <button
              key={letter}
              className={`px-3 py-2 rounded font-bold text-lg border border-blue-300 shadow-sm transition-colors
                ${
                  isGuessed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-blue-100 text-blue-700'
                }`}
              onClick={() => onGuess(letter.toLowerCase())}
              disabled={isGuessed || disabled}
              aria-label={`Guess letter ${letter}`}
            >
              {letter}
            </button>
          )
        })}
      </div>
      {/* Row 3 with offset */}
      <div className='flex justify-center w-full gap-1 sm:gap-1 md:gap-2 lg:gap-1'>
        {ROW3.map(letter => {
          const isGuessed = guessedLetters.includes(letter.toLowerCase())
          return (
            <button
              key={letter}
              className={`px-3 py-2 rounded font-bold text-lg border border-blue-300 shadow-sm transition-colors
                ${
                  isGuessed
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-blue-100 text-blue-700'
                }`}
              onClick={() => onGuess(letter.toLowerCase())}
              disabled={isGuessed || disabled}
              aria-label={`Guess letter ${letter}`}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
