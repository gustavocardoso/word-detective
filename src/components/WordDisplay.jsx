export default function WordDisplay({ secretWord, guessedLetters }) {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center text-4xl tracking-widest mb-6 uppercase">
      {secretWord.split('').map((char, idx) => (
        <span key={idx} className="border-b-2 border-blue-400 text-center w-12 font-semibold align-bottom inline-block min-h-10 leading-none">
          {guessedLetters.includes(char.toLowerCase()) ? char : ''}
        </span>
      ))}
    </div>
  );
} 