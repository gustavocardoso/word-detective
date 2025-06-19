import React from 'react'
import SoundContext from '../contexts/SoundContext'

// Sound provider component
export function SoundProvider({ children }) {
  // Sound is always enabled (not muted)
  const muted = false

  // Always keep the value in localStorage for backwards compatibility
  if (typeof window !== 'undefined') {
    localStorage.setItem('wordDetectiveMuted', 'false')
  }

  // No-op toggle function (we'll keep it for API compatibility)
  const toggleMute = () => {
    console.log('Sound toggle requested but sound is always enabled')
    // No-op - sound is always enabled
  }

  return <SoundContext.Provider value={{ muted, toggleMute }}>{children}</SoundContext.Provider>
}
