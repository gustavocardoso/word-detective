import React from 'react'

// Body parts - appear in order of incorrect guesses
const HEAD = props => (
  <g key='head'>
    <circle
      cx='69'
      cy='30'
      r='10'
      stroke='black'
      fill={props.isLastMistake ? 'red' : 'white'}
      strokeWidth='2'
      style={{ transition: 'fill 0.5s ease' }}
    />
    {/* Eyes */}
    <circle cx='66' cy='28' r='1' fill='black' />
    <circle cx='72' cy='28' r='1' fill='black' />
    {/* Nose */}
    <line x1='69' y1='29' x2='69' y2='31' stroke='black' strokeWidth='1' />
    {/* Mouth - sad when game is lost */}
    <path
      d={
        props.isLastMistake
          ? 'M 65 34 C 69 32, 69 32, 73 34' // sad mouth
          : 'M 65 33 C 69 35, 69 35, 73 33'
      } // regular mouth
      fill='none'
      stroke='black'
      strokeWidth='1'
      style={{ transition: 'all 0.5s ease' }}
    />
  </g>
)

const BODY = <line key='body' x1='69' y1='40' x2='69' y2='70' stroke='black' strokeWidth='2' />

const RIGHT_ARM = (
  <line key='right-arm' x1='69' y1='50' x2='89' y2='40' stroke='black' strokeWidth='2' />
)

const LEFT_ARM = (
  <line key='left-arm' x1='69' y1='50' x2='49' y2='40' stroke='black' strokeWidth='2' />
)

const RIGHT_LEG = (
  <line key='right-leg' x1='69' y1='70' x2='89' y2='90' stroke='black' strokeWidth='2' />
)

const LEFT_LEG = (
  <line key='left-leg' x1='69' y1='70' x2='49' y2='90' stroke='black' strokeWidth='2' />
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

// Gallows structure
const GALLOWS_DRAWING = (
  <g key='gallows'>
    {/* Base */}
    <line x1='0' y1='120' x2='120' y2='120' stroke='black' strokeWidth='4' />
    {/* Vertical support */}
    <line x1='10' y1='120' x2='10' y2='0' stroke='black' strokeWidth='4' />
    {/* Horizontal beam */}
    <line x1='10' y1='0' x2='70' y2='0' stroke='black' strokeWidth='4' />
    {/* Rope */}
    <line x1='69' y1='0' x2='69' y2='20' stroke='black' strokeWidth='2' />
  </g>
)

function HangmanDrawing({ mistakes }) {
  const bodyPartsToDraw = BODY_PARTS.slice(0, mistakes)
  const isLastMistake = mistakes === 6

  return (
    <div className='flex justify-center w-full' style={{ position: 'relative' }}>
      <svg
        viewBox='0 0 120 130'
        className='max-h-[373.25px]'
        style={{ display: 'block', overflow: 'visible' }}
      >
        {GALLOWS_DRAWING}
        {bodyPartsToDraw.map((part, index) => (
          <g key={index} className='fade-in'>
            {index === 0 ? <HEAD isLastMistake={isLastMistake} /> : part}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default HangmanDrawing

// Add fade-in animation
// In your global CSS (e.g., index.css), add:
// .fade-in { animation: fadeIn 0.5s ease; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
