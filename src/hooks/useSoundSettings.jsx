import { useContext } from 'react'
import SoundContext from '../contexts/SoundContext'

// Hook to use sound context
export function useSoundSettings() {
  return useContext(SoundContext)
}
