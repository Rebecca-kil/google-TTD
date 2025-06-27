"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, AlertCircle } from "lucide-react"

export default function BookingLookupPage() {
  const router = useRouter()
  const [bookingRef, setBookingRef] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!bookingRef.trim()) {
      setError("Please enter a booking reference")
      setLoading(false)
      return
    }

    // Simulate search delay
    setTimeout(() => {
      const stored = localStorage.getItem(`booking_${bookingRef}`)

      if (stored) {
        router.push(`/reservation-details?ref=${bookingRef}`)
      } else {
        setError("No booking found with this reference number. Please check and try again.")
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TOURVIS
            </Link>
            <div className="flex space-x-6">
              <Link href="/tours" className="text-gray-700 hover:text-blue-600 font-medium">
                Tour List
              </Link>
              <Link href="/inquiry" className="text-gray-700 hover:text-blue-600 font-medium">
                Inquiry
              </Link>
              <Link href="/booking-lookup" className="text-blue-600 font-medium">
                Booking
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Your Booking</h1>
          <p className="text-gray-600">Enter your booking reference to view your reservation details</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Booking Lookup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="bookingRef">Booking Reference *</Label>
                <Input
                  id="bookingRef"
                  placeholder="Enter your booking reference (e.g., TV12345678)"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#01c5fd] hover:bg-[#00b4e6]" disabled={loading}>
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Find Booking"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Don't have a booking reference? You can find it in your confirmation email.
              </p>
              <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
