'use client'

import { useState, useEffect } from 'react'

interface SplineFallbackProps {
  className?: string
}

export function SplineFallback({ className }: SplineFallbackProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black ${className || ''}`}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-400 text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  )
}
