"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Camera,
  Coffee,
  Accessibility,
  Globe,
  Navigation,
  Check,
  X,
} from "lucide-react"

interface TourOption {
  id: number
  time: string
  price: number
  available: number
}

interface Tour {
  title: string
  price: number
  originalPrice: number
  location: string
  duration: string
  maxGuests: number
  rating: number
  reviews: number
  language: string
  category: string
  images: string[]
  features: Array<{ icon: any; text: string }>
  description: string
  detailImages: string[]
  highlights: string[]
  included: string[]
  notIncluded: string[]
  itinerary: Array<{
    time: string
    title: string
    description: string
  }>
  meetingPoint: {
    name: string
    address: string
    instructions: string
    googleMapsUrl: string
  }
  importantNotes: string[]
  options: Record<string, TourOption[]>
}

const tourData: Record<number, Tour> = {
  1: {
    title: "Surfing at Sundak Beach Experience",
    price: 250,
    originalPrice: 320,
    location: "Yogyakarta, Indonesia",
    duration: "3 hours",
    maxGuests: 25,
    rating: 4.8,
    reviews: 2847,
    language: "English",
    category: "Adventure",
    images: ["/images/surfing-sundak.jpg", "/images/surfing-sundak.jpg", "/images/surfing-sundak.jpg"],
    features: [
      { icon: Wifi, text: "Free WiFi" },
      { icon: Camera, text: "Photography allowed" },
      { icon: Coffee, text: "Refreshments included" },
      { icon: Accessibility, text: "Wheelchair accessible" },
    ],
    description:
      "Experience the thrill of surfing at one of Indonesia's most beautiful beaches. Sundak Beach offers perfect waves for both beginners and experienced surfers, combined with stunning sunset views and crystal-clear waters. This unforgettable journey showcases Yogyakarta's coastal beauty from both land and sea.",
    detailImages: ["/placeholder.svg?height=300&width=500", "/placeholder.svg?height=300&width=500"],
    highlights: [
      "Skip-the-line access to premium surf spots",
      "3-hour professional surfing instruction",
      "Professional English-speaking guide",
      "Complimentary refreshments and snacks",
      "Photo opportunities at scenic viewpoints",
    ],
    included: [
      "Surfboard and wetsuit rental",
      "Professional surfing instructor",
      "Safety equipment and insurance",
      "Complimentary tea/coffee and snacks",
      "Digital photo package",
      "Round-trip transportation",
    ],
    notIncluded: [
      "Personal expenses and souvenirs",
      "Lunch and dinner meals",
      "Alcoholic beverages",
      "Tips and gratuities",
      "Travel insurance (optional)",
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Pickup & Beach Arrival",
        description: "Hotel pickup and transfer to Sundak Beach. Beach orientation and safety briefing.",
      },
      {
        time: "09:30 AM",
        title: "Surfing Lesson Begins",
        description: "Professional instruction on surfing basics, board handling, and wave reading techniques.",
      },
      {
        time: "11:00 AM",
        title: "Practice Session",
        description: "Guided practice in the water with instructor supervision and technique improvement.",
      },
      {
        time: "12:00 PM",
        title: "Free Surfing & Photography",
        description: "Independent surfing time and photo session at scenic beach locations.",
      },
    ],
    meetingPoint: {
      name: "Sundak Beach Main Entrance",
      address: "Sundak Beach, Tepus, Gunungkidul Regency, Yogyakarta 55881",
      instructions:
        "Meet at the main beach entrance near the parking area. Look for the TOURVIS guide with a blue flag.",
      googleMapsUrl: "https://maps.google.com",
    },
    importantNotes: [
      "Minimum age requirement: 12 years old",
      "Basic swimming ability required",
      "Weather conditions may affect tour schedule",
      "Bring sunscreen, towel, and change of clothes",
      "Waterproof camera recommended",
      "Tour may be cancelled due to dangerous weather conditions",
    ],
    options: {
      "2025-01-15": [
        { id: 1, time: "09:00 AM", price: 250, available: 15 },
        { id: 2, time: "02:00 PM", price: 250, available: 8 },
        { id: 3, time: "05:00 PM", price: 280, available: 12 },
      ],
      "2025-01-16": [
        { id: 4, time: "09:00 AM", price: 250, available: 20 },
        { id: 5, time: "02:00 PM", price: 250, available: 5 },
      ],
      "2025-01-17": [
        { id: 6, time: "09:00 AM", price: 250, available: 18 },
        { id: 7, time: "11:00 AM", price: 250, available: 10 },
        { id: 8, time: "02:00 PM", price: 250, available: 15 },
        { id: 9, time: "05:00 PM", price: 280, available: 7 },
      ],
    },
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedOption, setSelectedOption] = useState<TourOption | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)) // January 2025

  const tour = tourData[1]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + tour.images.length) % tour.images.length)
  }

  // Calendar functions
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const isDateAvailable = (dateStr: string): boolean => {
    return tour.options[dateStr] && tour.options[dateStr].length > 0
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const renderCalendar = (monthOffset = 0) => {
    const displayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset)
    const daysInMonth = getDaysInMonth(displayMonth)
    const firstDay = getFirstDayOfMonth(displayMonth)
    const monthName = displayMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })

    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(displayMonth.getFullYear(), displayMonth.getMonth(), day)
      const isAvailable = isDateAvailable(dateStr)
      const isSelected = selectedDate === dateStr

      days.push(
        <button
          key={day}
          onClick={() => {
            if (isAvailable) {
              setSelectedDate(dateStr)
              setSelectedOption(null)
            }
          }}
          disabled={!isAvailable}
          className={`p-2 text-sm rounded-lg transition-all ${
            isSelected
              ? "bg-blue-600 text-white"
              : isAvailable
                ? "hover:bg-blue-100 text-gray-900"
                : "text-gray-300 cursor-not-allowed"
          }`}
        >
          {day}
        </button>,
      )
    }

    return (
      <div className="flex-1">
        <h3 className="text-center font-semibold mb-4">{monthName}</h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-xs text-gray-500 text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    )
  }

  const availableOptions = selectedDate ? tour.options[selectedDate] || [] : []

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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/tours" className="text-blue-600 hover:text-blue-800">
            Tours
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{tour.title}</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* Image Gallery */}
          <div>
            <Card className="overflow-hidden shadow-lg">
              <div className="relative">
                <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={tour.images[currentImageIndex] || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {tour.images.length}
                  </div>
                </div>
              </div>
            </Card>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-4">
              {tour.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${tour.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tour Information */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">{tour.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-blue-600">£{tour.price}</span>
                <span className="text-lg text-gray-500 line-through">£{tour.originalPrice}</span>
                <span className="text-sm text-gray-600">per person</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-medium">{tour.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Group Size</div>
                  <div className="font-medium">Max {tour.maxGuests} people</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Language</div>
                  <div className="font-medium">{tour.language}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Navigation className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Meeting Point</div>
                  <div className="font-medium">{tour.meetingPoint.name}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg ml-1">{tour.rating}</span>
                <span className="text-gray-600 ml-1">({tour.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{tour.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {tour.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <feature.icon className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Date Selection */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Select Your Experience</h2>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Choose Date</h3>
                    <div className="flex gap-2">
                      <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    {renderCalendar(0)}
                    {renderCalendar(1)}
                  </div>
                </div>

                {/* Time Options */}
                {selectedDate && availableOptions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Choose Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {availableOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedOption(option)}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            selectedOption?.id === option.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{option.time}</div>
                              <div className="text-sm text-gray-600">{option.available} spots available</div>
                            </div>
                            <div className="text-lg font-bold text-blue-600">£{option.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guest Selection */}
                {selectedOption && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Number of Guests</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium w-8 text-center">{guestCount}</span>
                      <button
                        onClick={() => setGuestCount(Math.min(selectedOption.available, guestCount + 1))}
                        className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-600 ml-2">(Max {selectedOption.available} available)</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

                {!selectedDate ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <Button disabled className="w-full bg-gray-300 text-gray-500">
                      Select Date
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Free cancellation up to 24 hours before</p>
                  </div>
                ) : !selectedOption ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <Button disabled className="w-full bg-gray-300 text-gray-500">
                      Select Time
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Free cancellation up to 24 hours before</p>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-medium">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Time</div>
                        <div className="font-medium">{selectedOption.time}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Guests</div>
                        <div className="font-medium">
                          {guestCount} {guestCount === 1 ? "person" : "people"}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Price per person</span>
                        <span>£{selectedOption.price}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Guests</span>
                        <span>×{guestCount}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-blue-600">£{selectedOption.price * guestCount}</span>
                      </div>
                    </div>

                    <Link
                      href={`/booking-info?tour=${encodeURIComponent(tour.title.toLowerCase().replace(/\s+/g, "-"))}&date=${selectedDate}&time=${encodeURIComponent(selectedOption.time)}&quantity=${guestCount}&price=${selectedOption.price}`}
                    >
                      <Button className="w-full py-4 text-lg font-semibold bg-[#01c5fd] hover:bg-[#00b4e6] shadow-lg">
                        Book Now
                      </Button>
                    </Link>

                    <p className="text-sm text-gray-500 mt-4 text-center">Free cancellation up to 24 hours before</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16 space-y-12">
          {/* About This Experience */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">About This Experience</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{tour.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tour.detailImages.map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${tour.title} detail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Itinerary */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Course Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Included & Not Included */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                <div className="space-y-4">
                  {tour.included.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">What's Not Included</h2>
                <div className="space-y-4">
                  {tour.notIncluded.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <X className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meeting Point */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Meeting Point</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tour.meetingPoint.name}</h3>
                    <p className="text-gray-700 mb-3">{tour.meetingPoint.address}</p>
                    <p className="text-gray-600 mb-4">{tour.meetingPoint.instructions}</p>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <MapPin className="h-4 w-4" />
                      View on Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Important Notes</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="space-y-3">
                  {tour.importantNotes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
