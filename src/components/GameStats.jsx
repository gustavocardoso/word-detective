import React, { useEffect, useRef, useState } from 'react'

function GameStats({ mistakes, maxMistakes }) {
  // Calculate the percentage for progress bar
  const progressPercentage = (mistakes / maxMistakes) * 100
  const [isGrowing, setIsGrowing] = useState(false)
  const prevMistakes = useRef(mistakes)

  // Apply grow effect when mistakes increase
  useEffect(() => {
    if (mistakes > prevMistakes.current) {
      setIsGrowing(true)
      const timer = setTimeout(() => setIsGrowing(false), 400) // Match animation duration
      return () => clearTimeout(timer)
    }
    prevMistakes.current = mistakes
  }, [mistakes])

  // Dynamic styling based on mistakes
  const getBarColor = () => {
    if (progressPercentage === 0) return 'bg-blue-500'
    if (progressPercentage <= 25) return 'bg-green-500'
    if (progressPercentage <= 50) return 'bg-yellow-500'
    if (progressPercentage <= 75) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className='w-full max-w-xs mx-auto mt-6 mb-12 text-center'>
      <div className='flex items-center justify-between mb-1'>
        <div className='text-sm font-medium text-gray-700'>🕵️‍♀️ Case Progress</div>
        <div className='text-sm font-medium text-gray-700'>
          {mistakes} / {maxMistakes} clues missed
        </div>
      </div>
      <div className='w-full h-4 overflow-hidden bg-gray-200 border border-gray-300 rounded-lg shadow-inner'>
        <div
          className={`h-full ${getBarColor()} rounded-lg shadow-md relative ${
            isGrowing ? 'progress-grow' : 'progress-animate'
          }`}
          style={{
            width: `${progressPercentage}%`,
            transition: 'width 0.5s cubic-bezier(0.1, 0.7, 0.3, 1), background-color 0.3s'
          }}
        >
          {/* Add subtle pattern to make it look like detective material */}
          <div className='absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent'></div>
        </div>
      </div>
      <div className='flex justify-between mt-1 text-xs'>
        <span
          className={`${progressPercentage <= 33 ? 'text-green-600 font-medium' : 'text-gray-500'}`}
        >
          🧩 On Track
        </span>
        <span
          className={`${
            progressPercentage > 33 && progressPercentage <= 66
              ? 'text-yellow-600 font-medium'
              : 'text-gray-500'
          }`}
        >
          📝 Getting Tougher
        </span>
        <span
          className={`${progressPercentage > 66 ? 'text-red-600 font-medium' : 'text-gray-500'}`}
        >
          🔍 Last Chance
        </span>
      </div>
    </div>
  )
}

export default GameStats
