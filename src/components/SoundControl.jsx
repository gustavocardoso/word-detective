import React, { useState, useEffect, useContext, createContext } from 'react'

// Create a context for sound settings
const SoundContext = createContext({
  muted: false,
  toggleMute: () => {}
})

// Sound provider component
export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(false)

  const toggleMute = () => {
    setMuted(prevMuted => !prevMuted)
  }

  return (
    <SoundContext.Provider value={{ muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  )
}

// Hook to use sound context
export function useSoundSettings() {
  return useContext(SoundContext)
}

// Sound control button component
export default function SoundControl() {
  const { muted, toggleMute } = useSoundSettings()
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Add animation when sound is played
  useEffect(() => {
    const handleSoundPlayed = () => {
      if (!muted) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      }
    };
    
    window.addEventListener('soundplayed', handleSoundPlayed);
    return () => window.removeEventListener('soundplayed', handleSoundPlayed);
  }, [muted]);

  return (
    <button
      onClick={toggleMute}
      className={`fixed top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all z-10 ${
        isAnimating ? 'animate-pulse' : ''
      }`}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      {muted ? (
        <span role="img" aria-label="Sound muted" className="text-xl">
          🔇
        </span>
      ) : (
        <span role="img" aria-label="Sound on" className="text-xl">
          🔊
        </span>
      )}
    </button>
  )
}
