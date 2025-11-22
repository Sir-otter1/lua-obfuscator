import React from 'react'
import { HelpCircle } from 'lucide-react'

interface TooltipProps {
  text: string
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({ text, className = "" }) => {
  return (
    <div className={`group relative inline-block ${className}`}>
      <HelpCircle className="w-4 h-4 text-gray-500 cursor-help hover:text-gray-400 transition-colors" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        {text}
      </div>
    </div>
  )
}
