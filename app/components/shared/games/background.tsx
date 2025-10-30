interface BackgroundProps {
  currentLevel?: number
  maxLevel?: number
}

export function Background({
  currentLevel = 1,
  maxLevel = 10,
}: BackgroundProps) {
  const progress = currentLevel / maxLevel

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-200 via-blue-100 to-white transition-colors duration-1000 ease-in-out`}
        style={
          {
            '--tw-gradient-from': `hsl(${280 + progress * 60}, 100%, 90%)`,
            '--tw-gradient-to': `hsl(${200 + progress * 60}, 100%, 98%)`,
          } as React.CSSProperties
        }
      ></div>
      <div className="absolute inset-0 opacity-10 bg-[url('/circuit-board.svg')]"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  )
}
