"use client"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import GridBackground from "./grid-background"

// Separate component that uses useSearchParams
function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eventName: "",
    mobileNumber: "",
  });

  // Pre-select event from query param
  useEffect(() => {
    const event = searchParams.get("event");
    if (event && ["code", "web", "idea", "type"].includes(event)) {
      setFormData((prev) => ({ ...prev, eventName: event }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (!formData.fullName || !formData.email || !formData.eventName || !formData.mobileNumber) {
      alert("Please fill in all required fields")
      return
    }

    // Get the appropriate KonfHub checkout URL based on event
    const checkoutUrl = getCheckoutUrl(formData.eventName)
    
    if (checkoutUrl) {
      // Redirect to KonfHub checkout page
      window.open(checkoutUrl, '_blank')
    } else {
      alert("Invalid event selection. Please try again.")
    }
  }

  const getCheckoutUrl = (eventName: string) => {
    // Map event names to KonfHub checkout URLs
    const checkoutUrls: { [key: string]: string } = {
      'code': 'https://konfhub.com/checkout/include?ticketId=59724',
      'web': 'https://konfhub.com/checkout/include?ticketId=59725',
      'idea': 'https://konfhub.com/checkout/include?ticketId=61430',
      'type': 'https://konfhub.com/checkout/include?ticketId=61431',
    };
    return checkoutUrls[eventName] || '';
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mb-6 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-400"
          >
            ← Back to Events
          </Button>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Event Registration</h1>
          <p className="text-gray-300 text-lg mb-2">Register for #include tech showdown</p>
          <div className="text-green-400">
            <span>October 6, 2024 | COE Labs</span>
          </div>
        </div>

        <div className="relative">
          {/* Card background with grainy matrix effects */}
          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm border border-green-500/30 rounded-lg">
            <div
              className="absolute inset-0 opacity-15 rounded-lg"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 255, 0, 0.3) 1px, transparent 0)`,
                backgroundSize: "12px 12px",
              }}
            />
            <div
              className="absolute inset-0 opacity-10 rounded-lg"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 200, 0, 0.4) 1px, transparent 0)`,
                backgroundSize: "18px 18px",
              }}
            />
          </div>

          <div className="relative p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-green-400 font-semibold">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="bg-gray-800/80 border-green-500/30 text-white focus:border-green-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-green-400 font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-800/80 border-green-500/30 text-white focus:border-green-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Event Name Dropdown */}
              <div>
                <Label htmlFor="eventName" className="text-green-400 font-semibold">
                  Event Name
                </Label>
                <Select value={formData.eventName} onValueChange={(value) => handleInputChange("eventName", value)}>
                  <SelectTrigger className="bg-gray-800/80 border-green-500/30 text-white">
                    <SelectValue placeholder="Select an event" />
                  </SelectTrigger>
                  <SelectContent className=" bg-green-900/90 border-green-500/30 text-white">
                    <SelectItem value="code">#include&lt;code&gt;</SelectItem>
                    <SelectItem value="web">#include&lt;web&gt;</SelectItem>
                    <SelectItem value="idea">#include&lt;idea&gt;</SelectItem>
                    <SelectItem value="type">#include&lt;type&gt;</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Number */}
              <div>
                <Label htmlFor="mobileNumber" className="text-green-400 font-semibold">
                  Mobile Number
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                  className="bg-gray-800/80 border-green-500/30 text-white focus:border-green-500"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register on KonfHub
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper
export default function RegistrationPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black">
        <GridBackground />
      </div>

      <Suspense fallback={
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-green-400 text-xl">Loading...</div>
        </div>
      }>
        <RegistrationForm />
      </Suspense>
    </div>
  )
}