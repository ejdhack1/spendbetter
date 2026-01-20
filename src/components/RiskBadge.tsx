import { RiskLevel } from '@/types/database'

type Size = 'sm' | 'md' | 'lg'

interface RiskBadgeProps {
  level: RiskLevel
  size?: Size
  showLabel?: boolean
}

const riskConfig = {
  green: {
    badgeClass: 'risk-badge-green',
    dotColor: 'bg-green-400',
    label: 'Low Risk'
  },
  yellow: {
    badgeClass: 'risk-badge-yellow',
    dotColor: 'bg-yellow-400',
    label: 'Medium Risk'
  },
  red: {
    badgeClass: 'risk-badge-red',
    dotColor: 'bg-red-400',
    label: 'High Risk'
  }
}

const sizeConfig = {
  sm: {
    badge: 'px-2.5 py-1 text-xs',
    dot: 'w-1.5 h-1.5'
  },
  md: {
    badge: 'px-3 py-1.5 text-sm',
    dot: 'w-2 h-2'
  },
  lg: {
    badge: 'px-4 py-2 text-base',
    dot: 'w-2.5 h-2.5'
  }
}

export function RiskBadge({ level, size = 'md', showLabel = true }: RiskBadgeProps) {
  const config = riskConfig[level]
  const sizeClasses = sizeConfig[size]

  return (
    <span
      className={`
        inline-flex items-center gap-2 rounded-full font-display font-medium
        ${config.badgeClass} ${sizeClasses.badge}
      `}
    >
      {/* Pulsing dot indicator */}
      <span className="relative flex">
        <span
          className={`
            absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping
            ${config.dotColor}
          `}
          style={{ animationDuration: '2s' }}
        />
        <span
          className={`
            relative inline-flex rounded-full
            ${config.dotColor} ${sizeClasses.dot}
          `}
        />
      </span>
      {showLabel && (
        <span className="font-mono text-[0.9em] tracking-tight">
          {config.label}
        </span>
      )}
    </span>
  )
}
