import React from 'react'

function DetectiveDrawing({ mistakes }) {
  const maxMistakes = 6
  const items = ['Hat', 'Magnifying Glass', 'Badge', 'Notebook', 'Pen', 'Flashlight']

  // Calculate how many items the detective still has
  const itemsRemaining = maxMistakes - mistakes
  const isLastMistake = mistakes === maxMistakes
  const isAlmostLost = mistakes >= maxMistakes - 1

  return (
    <div className='flex justify-center w-full' style={{ position: 'relative' }}>
      <div className='flex flex-col items-center space-y-12'>
        {/* Detective Character Box */}
        <div
          className={`relative w-64 h-56 ${
            isAlmostLost ? 'bg-red-100' : 'bg-blue-100'
          } rounded-lg border-2 ${
            isAlmostLost ? 'border-red-300' : 'border-blue-300'
          } flex flex-col items-center justify-center transition-all duration-500`}
        >
          {/* Detective Character - Female */}
          <div className='relative text-9xl'>
            {/* Main character */}
            {!isLastMistake && (
              <>
                🕵️‍♀️
                {/* Thinking bubble when almost lost */}
                {mistakes === maxMistakes - 1 && (
                  <div className='absolute text-4xl -top-6 -right-8 animate-pulse'>🤔</div>
                )}
                {/* Happy bubble when no mistakes */}
                {mistakes === 0 && (
                  <div className='absolute text-4xl -top-6 -right-8 animate-bounce'>😎</div>
                )}
              </>
            )}
          </div>

          {/* Expression changes when the game is lost */}
          {isLastMistake && (
            <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full transition-all duration-500 bg-red-100 rounded-lg bg-opacity-70'>
              <div className='text-9xl animate-bounce'>😵</div>
            </div>
          )}

          {/* Detective status indicator removed - replaced with GameStats component in App.jsx */}
        </div>

        {/* Items positioned underneath the detective box and centered */}
        <div className='flex flex-wrap items-center justify-center max-w-lg gap-3 min-h-24'>
          {items.slice(0, itemsRemaining).map((item, i) => (
            <div
              key={item}
              className='p-3 transition-all duration-300 bg-yellow-200 rounded-lg shadow-md fade-in hover:bg-yellow-300'
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${Math.random() * 10 - 5}deg)`
              }}
            >
              <span className='text-3xl'>
                {item === 'Hat' && '🎩'}
                {item === 'Magnifying Glass' && '🔍'}
                {item === 'Badge' && '🏅'}
                {item === 'Notebook' && '📓'}
                {item === 'Pen' && '✒️'}
                {item === 'Flashlight' && '🔦'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetectiveDrawing

// Add fade-in animation
// In your global CSS (e.g., index.css), add:
// .fade-in { animation: fadeIn 0.5s ease; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
