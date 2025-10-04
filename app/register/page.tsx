import { Suspense } from 'react'
import RegistrationPage from '@/components/registration-page'

function RegistrationLoadingFallback() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 0, 0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }} />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-green-400 text-2xl font-bold mb-4 animate-pulse">
            Loading Registration...
          </div>
          <div className="text-gray-400">
            Preparing your #include experience
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Register() {
  return (
    <main>
      <Suspense fallback={<RegistrationLoadingFallback />}>
        <RegistrationPage />
      </Suspense>
    </main>
  )
}