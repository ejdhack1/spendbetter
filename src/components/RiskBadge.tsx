import { RiskLevel } from '@/types/database'

type Size = 'sm' | 'md' | 'lg'

interface RiskBadgeProps {
  level: RiskLevel
  size?: Size
  showLabel?: boolean
}

const riskConfig = {
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    label: 'Low Risk'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    label: 'Medium Risk'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200',
    label: 'High Risk'
  }
}

const sizeConfig = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}

export function RiskBadge({ level, size = 'md', showLabel = true }: RiskBadgeProps) {
  const config = riskConfig[level]
  const sizeClass = sizeConfig[size]

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border font-medium
        ${config.bg} ${config.text} ${config.border} ${sizeClass}
      `}
    >
      <span
        className={`
          rounded-full
          ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'}
          ${level === 'green' ? 'bg-green-500' : level === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}
        `}
      />
      {showLabel && config.label}
    </span>
  )
}
