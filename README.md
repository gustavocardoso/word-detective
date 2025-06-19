# Word Detective Game

Word Detective is a fun, detective-themed word guessing game (similar to Hangman) built with React and Vite.

## Features

- Detective-themed interface instead of the traditional hangman gallows
- Animated progress bar showing mistake count
- Sound effects for game events (start, correct guess, wrong guess, win, lose)
- Sound controls to mute/unmute game audio
- Responsive design that works on mobile and desktop

## How to Play

1. Enter a secret word for your opponent to guess
2. Your opponent tries to guess the word one letter at a time
3. For each incorrect guess, the detective loses an item
4. If the detective loses all items before the word is guessed, the player loses
5. If the word is guessed correctly before all items are lost, the player wins

## Game Elements

- **Detective Character**: An emoji character that changes expression based on game state
- **Detective Items**: Items that disappear as incorrect guesses are made (Hat, Magnifying Glass, Badge, Notebook, Pen, Flashlight)
- **Progress Bar**: Visual indicator showing how many mistakes have been made
- **Word Display**: Shows correctly guessed letters and placeholders for remaining letters
- **Virtual Keyboard**: Interactive letter buttons for guessing

## Sound Effects

The game includes sound effects for various game events:
- Game start sound
- Correct letter guess sound
- Wrong letter guess sound
- Win game sound
- Lose game sound

You can mute/unmute game sounds by clicking the sound icon in the top-right corner.

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Credits

Sound effects are from freesound.org - see SOUND_CREDITS.md for details.

## License

MIT
