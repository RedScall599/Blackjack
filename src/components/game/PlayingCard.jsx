export default function PlayingCard({ card, size = 'md' }) {
  const color = card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'
  const sizeClass = size === 'sm' ? 'playing-card playing-card-sm' : size === 'lg' ? 'playing-card playing-card-lg' : 'playing-card'
  return (
    <div className={`relative ${sizeClass} rounded-lg border bg-white shadow-sm flex items-center justify-center`}> 
      <div className={`absolute top-1 left-1 ${color} text-xs leading-none`}>{card.rank}{card.suit}</div>
      <div className={`absolute bottom-1 right-1 ${color} text-xs leading-none rotate-180`}>{card.rank}{card.suit}</div>
      <div className={`${color} playing-card-symbol`}>{card.suit}</div>
    </div>
  )
}
