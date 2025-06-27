"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Users, Calendar, Info, Edit, Check, CreditCard, Smartphone } from "lucide-react"

type Step = "contact" | "activity" | "payment"

export default function BookingInfoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>("contact")
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+82",
  })
  const [activityData, setActivityData] = useState({
    sameAsTraveler: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+82",
    specialRequests: "",
  })
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    country: "KR",
    zipCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const tour = searchParams.get("tour") || "surfing-at-sundak-beach-experience"
  const date = searchParams.get("date") || new Date().toISOString()
  const time = searchParams.get("time") || "09:00 AM"
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")
  const price = Number.parseInt(searchParams.get("price") || "250")

  const tourTitle = tour.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const totalAmount = price * quantity

  // English only validation
  const isEnglishOnly = (text: string) => /^[a-zA-Z\s]*$/.test(text)

  // Email validation
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Phone validation
  const isValidPhone = (phone: string) => /^[0-9-+\s()]*$/.test(phone)

  const validateContactForm = () => {
    const newErrors: Record<string, string> = {}

    if (!contactData.firstName) {
      newErrors.firstName = "First name is required"
    } else if (!isEnglishOnly(contactData.firstName)) {
      newErrors.firstName = "Please enter English characters only"
    }

    if (!contactData.lastName) {
      newErrors.lastName = "Last name is required"
    } else if (!isEnglishOnly(contactData.lastName)) {
      newErrors.lastName = "Please enter English characters only"
    }

    if (!contactData.email) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(contactData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!contactData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!isValidPhone(contactData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateActivityForm = () => {
    const newErrors: Record<string, string> = {}

    if (!activityData.sameAsTraveler) {
      if (!activityData.firstName) {
        newErrors.activityFirstName = "First name is required"
      } else if (!isEnglishOnly(activityData.firstName)) {
        newErrors.activityFirstName = "Please enter English characters only"
      }

      if (!activityData.lastName) {
        newErrors.activityLastName = "Last name is required"
      } else if (!isEnglishOnly(activityData.lastName)) {
        newErrors.activityLastName = "Please enter English characters only"
      }

      if (!activityData.email) {
        newErrors.activityEmail = "Email is required"
      } else if (!isValidEmail(activityData.email)) {
        newErrors.activityEmail = "Please enter a valid email address"
      }

      if (!activityData.phone) {
        newErrors.activityPhone = "Phone number is required"
      } else if (!isValidPhone(activityData.phone)) {
        newErrors.activityPhone = "Please enter a valid phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method"
    }

    if (paymentData.paymentMethod === "card") {
      if (!paymentData.cardholderName) {
        newErrors.cardholderName = "Cardholder name is required"
      }
      if (!paymentData.cardNumber) {
        newErrors.cardNumber = "Card number is required"
      }
      if (!paymentData.expiryMonth) {
        newErrors.expiryDate = "Expiry month is required"
      }
      if (!paymentData.expiryYear) {
        newErrors.expiryDate = "Expiry year is required"
      }
      if (!paymentData.cvv) {
        newErrors.cvv = "CVV is required"
      }
      if (!paymentData.zipCode) {
        newErrors.zipCode = "ZIP code is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContactNext = () => {
    if (validateContactForm()) {
      setCurrentStep("activity")
    }
  }

  const handleActivityNext = () => {
    if (validateActivityForm()) {
      setCurrentStep("payment")
    }
  }

  const handlePaymentSubmit = () => {
    if (validatePaymentForm()) {
      // Generate booking reference
      const bookingRef = "TV" + Date.now().toString().slice(-8)

      // Prepare customer info (use activity data if available, otherwise contact data)
      const customerInfo = {
        firstName: activityData.firstName || contactData.firstName,
        lastName: activityData.lastName || contactData.lastName,
        email: activityData.email || contactData.email,
        phone: activityData.phone || contactData.phone,
        country: "Indonesia", // Default country
        specialRequests: activityData.specialRequests || "",
        emergencyContact: "",
        emergencyPhone: "",
      }

      // Store booking data
      const bookingData = {
        bookingReference: bookingRef,
        tour: tour,
        date,
        quantity,
        price,
        totalAmount,
        customerInfo,
        status: "confirmed",
        bookingDate: new Date().toISOString(),
      }

      try {
        localStorage.setItem(`booking_${bookingRef}`, JSON.stringify(bookingData))
        console.log("Booking data saved:", bookingData)
        router.push(`/reservation-details?ref=${bookingRef}`)
      } catch (error) {
        console.error("Error saving booking:", error)
        alert("There was an error processing your booking. Please try again.")
      }
    }
  }

  const handleSameAsTravelerChange = (checked: boolean) => {
    setActivityData((prev) => ({
      ...prev,
      sameAsTraveler: checked,
      ...(checked
        ? {
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            phone: contactData.phone,
            countryCode: contactData.countryCode,
          }
        : {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            countryCode: "+82",
          }),
    }))
  }

  const handleActivityFieldChange = (field: string, value: string) => {
    setActivityData((prev) => ({
      ...prev,
      [field]: value,
      sameAsTraveler: false, // Uncheck when manually editing
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    })
  }

  const isActivityCompleted = () => {
    if (activityData.sameAsTraveler) return true
    return activityData.firstName && activityData.lastName && activityData.email && activityData.phone
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TOURVIS
            </Link>
            <Link href="/booking-lookup" className="text-gray-600 hover:text-blue-600 text-sm">
              Check Reservation
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-xl lg:max-w-2xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Booking Information</h1>
          <p className="text-sm lg:text-base text-gray-600">
            Please enter your information and preferences for the booking.
          </p>
        </div>

        {/* Product Information */}
        <Card className="mb-6 shadow-sm border border-gray-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 bg-transparent">
                    <Info className="h-4 w-4 mr-1" />
                    Option Information
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Tour Details</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt={tourTitle}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{tourTitle}</h3>
                      <p className="text-gray-600 mt-2">
                        Experience the thrill of surfing at one of Indonesia's most beautiful beaches. This tour
                        includes professional instruction, equipment rental, and stunning sunset views.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span>Beginner to Intermediate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Includes:</span>
                        <span>Equipment, Instruction, Refreshments</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/placeholder.svg?height=64&width=80" alt={tourTitle} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{tourTitle}</h3>
                <p className="text-sm text-gray-600">Usage Date: {formatDate(date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {quantity} Traveler{quantity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(date)} • {time}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg">${totalAmount}.00 USD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className={`mb-6 shadow-sm border border-gray-200 ${currentStep !== "contact" ? "bg-gray-50" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "contact"
                      ? "bg-black text-white"
                      : currentStep === "activity" || currentStep === "payment"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep === "activity" || currentStep === "payment" ? <Check className="h-4 w-4" /> : "1"}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Contact details</h2>
              </div>
              {(currentStep === "activity" || currentStep === "payment") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep("contact")}
                  className="text-gray-600 border-gray-300"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>

            {currentStep === "contact" ? (
              <>
                <p className="text-sm text-gray-600 mb-6">
                  We'll use this information to send you confirmation and updates about your booking.
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        value={contactData.firstName}
                        onChange={(e) => {
                          const value = e.target.value
                          if (isEnglishOnly(value) || value === "") {
                            setContactData((prev) => ({ ...prev, firstName: value }))
                            if (errors.firstName) {
                              setErrors((prev) => ({ ...prev, firstName: "" }))
                            }
                          }
                        }}
                        className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.firstName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        value={contactData.lastName}
                        onChange={(e) => {
                          const value = e.target.value
                          if (isEnglishOnly(value) || value === "") {
                            setContactData((prev) => ({ ...prev, lastName: value }))
                            if (errors.lastName) {
                              setErrors((prev) => ({ ...prev, lastName: "" }))
                            }
                          }
                        }}
                        className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : ""
                        }`}
                        required
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Info className="h-4 w-4 text-blue-500" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={contactData.email}
                      onChange={(e) => {
                        setContactData((prev) => ({ ...prev, email: e.target.value }))
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }))
                        }
                      }}
                      className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    <p className="text-xs text-blue-600 mt-1">Your booking confirmation will be sent to your email</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone number
                      </Label>
                      <Info className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={contactData.countryCode}
                        onValueChange={(value) => setContactData((prev) => ({ ...prev, countryCode: value }))}
                      >
                        <SelectTrigger className="w-40 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+82">🇰🇷 +82 South Korea</SelectItem>
                          <SelectItem value="+1">🇺🇸 +1 United States</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44 United Kingdom</SelectItem>
                          <SelectItem value="+81">🇯🇵 +81 Japan</SelectItem>
                          <SelectItem value="+86">🇨🇳 +86 China</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="010-5042-5138"
                        value={contactData.phone}
                        onChange={(e) => {
                          const value = e.target.value
                          if (isValidPhone(value) || value === "") {
                            setContactData((prev) => ({ ...prev, phone: value }))
                            if (errors.phone) {
                              setErrors((prev) => ({ ...prev, phone: "" }))
                            }
                          }
                        }}
                        className={`flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                        required
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <Button
                    onClick={handleContactNext}
                    className="w-full bg-[#01c5fd] hover:bg-[#00b4e6] text-white font-medium py-3 mt-6"
                    size="lg"
                  >
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4 text-sm">
                <p className="text-gray-600">
                  We'll use this information to send you confirmation and updates about your booking
                </p>
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div>
                    <p className="text-gray-600 mb-1 text-xs">Name</p>
                    <p className="font-semibold text-gray-900 text-base">
                      {contactData.firstName} {contactData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 text-xs">Phone</p>
                    <p className="font-semibold text-gray-900 text-base">
                      {contactData.countryCode} {contactData.phone}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 mb-1 text-xs">Email</p>
                  <p className="font-semibold text-gray-900 text-base">{contactData.email}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Details */}
        <Card
          className={`mb-6 shadow-sm border border-gray-200 ${
            currentStep === "contact" && !isActivityCompleted()
              ? "bg-gray-50"
              : currentStep !== "activity" && currentStep !== "payment"
                ? "bg-gray-50"
                : ""
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === "activity"
                      ? "bg-black text-white"
                      : currentStep === "payment"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep === "payment" ? <Check className="h-4 w-4" /> : "2"}
                </div>
                <h2
                  className={`text-lg font-semibold ${currentStep === "contact" && !isActivityCompleted() ? "text-gray-400" : "text-gray-900"}`}
                >
                  Activity details
                </h2>
              </div>
              {currentStep === "payment" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep("activity")}
                  className="text-gray-600 border-gray-300"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>

            {currentStep === "activity" ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsTraveler"
                    checked={activityData.sameAsTraveler}
                    onCheckedChange={handleSameAsTravelerChange}
                  />
                  <Label htmlFor="sameAsTraveler" className="text-sm font-medium">
                    Same as Traveler Information
                  </Label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activityFirstName" className="text-sm font-medium text-gray-700">
                      First Name (English only)
                    </Label>
                    <Input
                      id="activityFirstName"
                      value={activityData.firstName}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase()
                        if (isEnglishOnly(value) || value === "") {
                          handleActivityFieldChange("firstName", value)
                          if (errors.activityFirstName) {
                            setErrors((prev) => ({ ...prev, activityFirstName: "" }))
                          }
                        }
                      }}
                      className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.activityFirstName ? "border-red-500" : ""
                      } ${activityData.firstName ? "text-gray-900 font-medium" : ""}`}
                      placeholder="HONG"
                    />
                    {errors.activityFirstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.activityFirstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="activityLastName" className="text-sm font-medium text-gray-700">
                      Last Name (English only)
                    </Label>
                    <Input
                      id="activityLastName"
                      value={activityData.lastName}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase()
                        if (isEnglishOnly(value) || value === "") {
                          handleActivityFieldChange("lastName", value)
                          if (errors.activityLastName) {
                            setErrors((prev) => ({ ...prev, activityLastName: "" }))
                          }
                        }
                      }}
                      className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.activityLastName ? "border-red-500" : ""
                      } ${activityData.lastName ? "text-gray-900 font-medium" : ""}`}
                      placeholder="GILDONG"
                    />
                    {errors.activityLastName && <p className="text-red-500 text-xs mt-1">{errors.activityLastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="activityEmail" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="activityEmail"
                    type="email"
                    value={activityData.email}
                    onChange={(e) => {
                      handleActivityFieldChange("email", e.target.value)
                      if (errors.activityEmail) {
                        setErrors((prev) => ({ ...prev, activityEmail: "" }))
                      }
                    }}
                    className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.activityEmail ? "border-red-500" : ""
                    } ${activityData.email ? "text-gray-900 font-medium" : ""}`}
                    placeholder="example@email.com"
                  />
                  {errors.activityEmail && <p className="text-red-500 text-xs mt-1">{errors.activityEmail}</p>}
                </div>

                <div>
                  <Label htmlFor="activityPhone" className="text-sm font-medium text-gray-700">
                    Phone number
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <Select
                      value={activityData.countryCode}
                      onValueChange={(value) => handleActivityFieldChange("countryCode", value)}
                    >
                      <SelectTrigger
                        className={`w-40 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          activityData.countryCode ? "text-gray-900 font-medium" : ""
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+82">🇰🇷 +82 South Korea</SelectItem>
                        <SelectItem value="+1">🇺🇸 +1 United States</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44 United Kingdom</SelectItem>
                        <SelectItem value="+81">🇯🇵 +81 Japan</SelectItem>
                        <SelectItem value="+86">🇨🇳 +86 China</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="activityPhone"
                      type="tel"
                      placeholder="010-5042-5138"
                      value={activityData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                        if (isValidPhone(value) || value === "") {
                          handleActivityFieldChange("phone", value)
                          if (errors.activityPhone) {
                            setErrors((prev) => ({ ...prev, activityPhone: "" }))
                          }
                        }
                      }}
                      className={`flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                        errors.activityPhone ? "border-red-500" : ""
                      } ${activityData.phone ? "text-gray-900 font-medium" : ""}`}
                    />
                  </div>
                  {errors.activityPhone && <p className="text-red-500 text-xs mt-1">{errors.activityPhone}</p>}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Be careful to write accurately when entering your reservation.</p>
                  <p>• Please provide accurate contact information for smooth reservation.</p>
                  <p>• Reservation information cannot be changed arbitrarily after reservation.</p>
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
                    Please enter the details you want to inform the business.
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={activityData.specialRequests}
                    onChange={(e) => setActivityData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                      activityData.specialRequests ? "text-gray-900 font-medium" : ""
                    }`}
                    placeholder="Please enter any special requests or requirements."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleActivityNext}
                  className="w-full bg-[#01c5fd] hover:bg-[#00b4e6] text-white font-medium py-3 mt-6"
                  size="lg"
                >
                  Next
                </Button>
              </div>
            ) : currentStep === "payment" ? (
              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox checked={activityData.sameAsTraveler} disabled />
                  <span className="text-gray-700 font-medium">Same as Traveler Information</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-1 text-xs">Name</p>
                    <p className="font-semibold text-gray-900 text-base">
                      {activityData.firstName} {activityData.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 text-xs">Phone</p>
                    <p className="font-semibold text-gray-900 text-base">
                      {activityData.countryCode} {activityData.phone}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 mb-1 text-xs">Email</p>
                  <p className="font-semibold text-gray-900 text-base">{activityData.email}</p>
                </div>
                {activityData.specialRequests && (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-1 text-xs">Special Requests</p>
                    <p className="font-medium text-gray-800 text-sm">{activityData.specialRequests}</p>
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className={`shadow-sm border border-gray-200 ${currentStep !== "payment" ? "bg-gray-50" : ""}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === "payment" ? "bg-black text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                3
              </div>
              <h2 className={`text-lg font-semibold ${currentStep !== "payment" ? "text-gray-400" : "text-gray-900"}`}>
                Payment details
              </h2>
            </div>

            {currentStep === "payment" && (
              <div className="space-y-6">
                {/* Mock Data Button */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-yellow-800">Test Mode</h4>
                      <p className="text-sm text-yellow-600">Use mock data for testing</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPaymentData({
                          paymentMethod: "card",
                          cardNumber: "4111 1111 1111 1111",
                          expiryMonth: "12",
                          expiryYear: "25",
                          cvv: "123",
                          cardholderName: "John Doe",
                          country: "KR",
                          zipCode: "12345",
                        })
                      }}
                      className="text-yellow-700 border-yellow-300"
                    >
                      Fill Mock Data
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-4 block">Select Payment Method</Label>
                  <div className="space-y-3">
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentData.paymentMethod === "card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentData((prev) => ({ ...prev, paymentMethod: "card" }))}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentData.paymentMethod === "apple"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentData((prev) => ({ ...prev, paymentMethod: "apple" }))}
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Apple Pay</span>
                      </div>
                    </div>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                </div>

                {paymentData.paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName" className="text-sm font-medium text-gray-700">
                        Cardholder name
                      </Label>
                      <Input
                        id="cardholderName"
                        placeholder="kil lim"
                        value={paymentData.cardholderName}
                        onChange={(e) => {
                          setPaymentData((prev) => ({ ...prev, cardholderName: e.target.value }))
                          if (errors.cardholderName) {
                            setErrors((prev) => ({ ...prev, cardholderName: "" }))
                          }
                        }}
                        className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.cardholderName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.cardholderName && <p className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                        Credit Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => {
                          setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))
                          if (errors.cardNumber) {
                            setErrors((prev) => ({ ...prev, cardNumber: "" }))
                          }
                        }}
                        className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                          errors.cardNumber ? "border-red-500" : ""
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Expiration Date</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            placeholder="MM"
                            value={paymentData.expiryMonth}
                            onChange={(e) => {
                              setPaymentData((prev) => ({ ...prev, expiryMonth: e.target.value }))
                              if (errors.expiryDate) {
                                setErrors((prev) => ({ ...prev, expiryDate: "" }))
                              }
                            }}
                            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                              errors.expiryDate ? "border-red-500" : ""
                            }`}
                            maxLength={2}
                          />
                          <span className="text-gray-400">/</span>
                          <Input
                            placeholder="YY"
                            value={paymentData.expiryYear}
                            onChange={(e) => {
                              setPaymentData((prev) => ({ ...prev, expiryYear: e.target.value }))
                              if (errors.expiryDate) {
                                setErrors((prev) => ({ ...prev, expiryDate: "" }))
                              }
                            }}
                            className={`border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                              errors.expiryDate ? "border-red-500" : ""
                            }`}
                            maxLength={2}
                          />
                        </div>
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                          Security Code
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => {
                            setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))
                            if (errors.cvv) {
                              setErrors((prev) => ({ ...prev, cvv: "" }))
                            }
                          }}
                          className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                            errors.cvv ? "border-red-500" : ""
                          }`}
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Country</Label>
                        <Select
                          value={paymentData.country}
                          onValueChange={(value) => setPaymentData((prev) => ({ ...prev, country: value }))}
                        >
                          <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="South Korea" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KR">South Korea</SelectItem>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="GB">United Kingdom</SelectItem>
                            <SelectItem value="JP">Japan</SelectItem>
                            <SelectItem value="CN">China</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                          ZIP code
                        </Label>
                        <Input
                          id="zipCode"
                          placeholder="12345"
                          value={paymentData.zipCode}
                          onChange={(e) => {
                            setPaymentData((prev) => ({ ...prev, zipCode: e.target.value }))
                            if (errors.zipCode) {
                              setErrors((prev) => ({ ...prev, zipCode: "" }))
                            }
                          }}
                          className={`mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                            errors.zipCode ? "border-red-500" : ""
                          }`}
                        />
                        {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentData.paymentMethod === "apple" && (
                  <div className="text-center py-8">
                    <div className="bg-black text-white rounded-lg py-3 px-6 inline-flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      <span>Pay with Apple Pay</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Touch ID or Face ID required</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="font-bold text-xl">${totalAmount}.00 USD</span>
                  </div>
                </div>

                <Button
                  onClick={handlePaymentSubmit}
                  className="w-full bg-[#01c5fd] hover:bg-[#00b4e6] text-white font-medium py-3"
                  size="lg"
                >
                  Complete Booking
                </Button>
              </div>
            )}
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tour Price</span>
                  <span className="font-medium">${price}.00 USD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg border-t pt-3">
                  <span>Total Amount</span>
                  <span>${totalAmount}.00 USD</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
