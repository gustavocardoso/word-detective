// This file ensures the localStorage is set correctly on page load
// It runs before the React app is initialized

// Only initialize if not already set or if the value is invalid
const currentValue = localStorage.getItem('wordDetectiveMuted')
if (currentValue === null || (currentValue !== 'true' && currentValue !== 'false')) {
  // Default to sound enabled (muted=false)
  console.log('Setting initial sound state to enabled')
  localStorage.setItem('wordDetectiveMuted', 'false')
} else {
  console.log('Found existing sound state:', currentValue)
}
