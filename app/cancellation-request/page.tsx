"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react"

export default function CancellationRequestPage() {
  const searchParams = useSearchParams()
  const bookingRef = searchParams.get("ref")
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    refundMethod: "",
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    additionalInfo: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.reason) newErrors.reason = "Cancellation reason is required"
    if (!formData.refundMethod) newErrors.refundMethod = "Refund method is required"

    if (formData.refundMethod === "bank") {
      if (!formData.bankName) newErrors.bankName = "Bank name is required"
      if (!formData.accountNumber) newErrors.accountNumber = "Account number is required"
      if (!formData.accountHolder) newErrors.accountHolder = "Account holder name is required"
    }

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
                <Link href="/inquiry" className="text-gray-700 hover:text-blue-600 font-medium">
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
          <h1 className="text-2xl font-bold text-green-600 mb-2">Cancellation Request Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Your cancellation request has been submitted. We'll process your request and get back to you within 24
            hours.
          </p>
          <div className="space-y-3">
            <Link href={`/reservation-details?ref=${bookingRef}`}>
              <Button className="w-full">Back to Booking Details</Button>
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
              <Link href="/inquiry" className="text-gray-700 hover:text-blue-600 font-medium">
                Inquiry
              </Link>
              <Link href="/booking-lookup" className="text-gray-700 hover:text-blue-600 font-medium">
                Booking
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Request Cancellation</h1>
          <p className="text-gray-600">Please fill out the form below to request a cancellation</p>
          {bookingRef && <p className="text-sm text-blue-600 mt-2">Booking Reference: {bookingRef}</p>}
        </div>

        {/* Cancellation Policy */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Cancellation Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Free cancellation up to 24 hours before tour date</li>
              <li>• 50% refund for cancellations within 24 hours</li>
              <li>• No refund for no-shows</li>
              <li>• Weather-related cancellations are fully refunded</li>
              <li>• Refunds will be processed within 5-7 business days</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <X className="h-5 w-5" />
              Cancellation Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="reason">
                  Cancellation Reason <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleInputChange("reason", value)}>
                  <SelectTrigger className={errors.reason ? "border-red-500" : ""}>
                    <SelectValue placeholder="Please select cancellation reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal reasons</SelectItem>
                    <SelectItem value="schedule">Schedule conflict</SelectItem>
                    <SelectItem value="weather">Weather concerns</SelectItem>
                    <SelectItem value="health">Health issues</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
              </div>

              <div>
                <Label className="text-base font-medium">
                  Refund Method <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.refundMethod}
                  onValueChange={(value) => handleInputChange("refundMethod", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="original" id="original" />
                    <Label htmlFor="original">Refund to original payment method</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank transfer</Label>
                  </div>
                </RadioGroup>
                {errors.refundMethod && <p className="text-red-500 text-xs mt-1">{errors.refundMethod}</p>}
              </div>

              {formData.refundMethod === "bank" && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Bank Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName">
                        Bank Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bankName"
                        placeholder="Bank name"
                        value={formData.bankName}
                        onChange={(e) => handleInputChange("bankName", e.target.value)}
                        className={errors.bankName ? "border-red-500" : ""}
                      />
                      {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">
                        Account Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="accountNumber"
                        placeholder="Account number"
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                        className={errors.accountNumber ? "border-red-500" : ""}
                      />
                      {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accountHolder">
                      Account Holder Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountHolder"
                      placeholder="Account holder name"
                      value={formData.accountHolder}
                      onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                      className={errors.accountHolder ? "border-red-500" : ""}
                    />
                    {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Please provide any additional information about your cancellation request"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3">
                Submit Cancellation Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href={`/reservation-details?ref=${bookingRef}`} className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="inline h-4 w-4 mr-1" />
            Back to Booking Details
          </Link>
        </div>
      </div>
    </div>
  )
}
