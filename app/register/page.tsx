"use client"

import { Suspense } from 'react'
import RegistrationPage from 'include-master\components\registration-page.tsx'

export default function Register() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-green-400 text-xl animate-pulse">Loading registration...</div>
      </div>
    }>
      <RegistrationPage />
    </Suspense>
  )
}