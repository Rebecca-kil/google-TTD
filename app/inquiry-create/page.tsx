"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, CheckCircle, ArrowLeft } from "lucide-react"

export default function InquiryCreatePage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    author: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.author) newErrors.author = "Author is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.inquiryType) newErrors.inquiryType = "Inquiry type is required"
    if (!formData.subject) newErrors.subject = "Subject is required"
    if (!formData.message) newErrors.message = "Message is required"

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Generate inquiry ID
    const inquiryId = "INQ" + Date.now().toString().slice(-8)

    // Create inquiry data
    const inquiryData = {
      id: inquiryId,
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
      responses: [],
    }

    // Store inquiry data
    const inquiryKey = `inquiry_${formData.author}_${formData.password}`
    const existingInquiries = JSON.parse(localStorage.getItem(inquiryKey) || "[]")
    existingInquiries.push(inquiryData)
    localStorage.setItem(inquiryKey, JSON.stringify(existingInquiries))

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
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

        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-600 mb-2">Inquiry Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your inquiry. We'll get back to you within 24 hours during business hours.
          </p>
          <div className="space-y-3">
            <Link href="/inquiry">
              <Button className="w-full">Back to Inquiry</Button>
            </Link>
            <Link
              href={`/inquiry-list?author=${encodeURIComponent(formData.author)}&password=${encodeURIComponent(formData.password)}`}
            >
              <Button variant="outline" className="w-full bg-transparent">
                View My Inquiries
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">Make Inquiry</h1>
          <p className="text-gray-600">Please fill out the form below to submit your inquiry</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Make Inquiry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">
                    Author <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="author"
                    placeholder="Enter your username"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className={errors.author ? "border-red-500" : ""}
                  />
                  {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                </div>

                <div>
                  <Label htmlFor="password">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="inquiryType">
                  Inquiry Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange("inquiryType", value)}>
                  <SelectTrigger className={errors.inquiryType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Please select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="booking">Booking Question</SelectItem>
                    <SelectItem value="cancellation">Cancellation Request</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType}</p>}
              </div>

              <div>
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  placeholder="Please enter inquiry subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your inquiry in detail"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <Button type="submit" className="w-full bg-[#01c5fd] hover:bg-[#00b4e6] text-white font-medium py-3">
                Submit Inquiry
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Inquiry Information */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Inquiry Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Business Hours:</span> Weekdays 09:00 AM - 06:00 PM (Korea Standard Time)
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/inquiry" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="inline h-4 w-4 mr-1" />
            Back to Inquiry
          </Link>
        </div>
      </div>
    </div>
  )
}
