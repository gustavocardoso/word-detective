import { createContext } from 'react'

// Create a context for sound settings
const SoundContext = createContext({
  muted: false,
  toggleMute: () => {}
})

export default SoundContext
