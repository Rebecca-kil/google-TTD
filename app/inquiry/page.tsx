"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search, Plus, MessageCircle, AlertCircle } from "lucide-react"

export default function InquiryPage() {
  const [searchData, setSearchData] = useState({
    author: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!searchData.author || !searchData.password) {
      setError("Please enter both Author and Password")
      setLoading(false)
      return
    }

    // Simulate search delay
    setTimeout(() => {
      // Check if inquiries exist for this author/password combination
      const inquiryKey = `inquiry_${searchData.author}_${searchData.password}`
      const stored = localStorage.getItem(inquiryKey)

      if (stored) {
        // Redirect to inquiry list page
        window.location.href = `/inquiry-list?author=${encodeURIComponent(searchData.author)}&password=${encodeURIComponent(searchData.password)}`
      } else {
        setError("No inquiries found for the provided Author and Password combination.")
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
              <Link href="/inquiry" className="text-blue-600 font-medium">
                Inquiry
              </Link>
              <Link href="/booking-lookup" className="text-gray-700 hover:text-blue-600 font-medium">
                Booking
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-xl lg:max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Customer Inquiry</h1>
          <p className="text-gray-600">Search for your existing inquiries or create a new one</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Search Existing Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find My Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    placeholder="Enter your username"
                    value={searchData.author}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, author: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={searchData.password}
                    onChange={(e) => setSearchData((prev) => ({ ...prev, password: e.target.value }))}
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
                  {loading ? "Searching..." : "Search Inquiries"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Create New Inquiry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                New Inquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Have a question or need assistance? Create a new inquiry and we'll get back to you within 24 hours.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Business Hours</h4>
                  <p className="text-sm text-blue-600">Weekdays: 09:00 AM - 06:00 PM (Korea Standard Time)</p>
                </div>

                <Link href="/inquiry-create">
                  <Button className="w-full bg-[#01c5fd] hover:bg-[#00b4e6]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Inquiry
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Business Hours</h4>
                <p className="text-sm text-gray-600">Weekdays 09:00 AM - 06:00 PM (Korea Standard Time)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
