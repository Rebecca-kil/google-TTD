"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Search, Filter, MapPin, Clock, Users, Star } from "lucide-react"

const allTours = [
  {
    id: 1,
    title: "Surfing at Sundak Beach",
    description: "Experience stunning sunsets, white-washed buildings, and crystal-clear waters",
    price: 250,
    image: "/placeholder.svg?height=300&width=400",
    duration: "3 days",
    location: "Yogyakarta",
    rating: 4.8,
    reviews: 124,
    category: "Adventure",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    title: "Rafting at Progo",
    description: "Adventure through rapids and scenic landscapes",
    price: 125,
    image: "/placeholder.svg?height=300&width=400",
    duration: "1 day",
    location: "Central Java",
    rating: 4.6,
    reviews: 89,
    category: "Adventure",
    difficulty: "Beginner",
  },
  {
    id: 3,
    title: "Baturaden Bobocabin",
    description: "Experience stunning sunsets, white-washed",
    price: 150,
    image: "/placeholder.svg?height=300&width=400",
    duration: "2 days",
    location: "Central Java",
    rating: 4.7,
    reviews: 156,
    category: "Nature",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Dieng Villa View",
    description: "Experience stunning sunsets, white-washed",
    price: 750,
    image: "/placeholder.svg?height=300&width=400",
    duration: "4 days",
    location: "Central Java",
    rating: 4.9,
    reviews: 203,
    category: "Luxury",
    difficulty: "Easy",
  },
]

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

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
              <Link href="/tours" className="text-blue-600 font-medium">
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
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Explore All Tours</h1>
          <p className="text-gray-600">Discover amazing destinations and unforgettable experiences</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tours or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="beach">Beach</SelectItem>
                <SelectItem value="wildlife">Wildlife</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="city">City</SelectItem>
              </SelectContent>
            </Select>

            {/* Duration Filter */}
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Duration</SelectItem>
                <SelectItem value="1 day">1 Day</SelectItem>
                <SelectItem value="2 days">2 Days</SelectItem>
                <SelectItem value="3 days">3 Days</SelectItem>
                <SelectItem value="4 days">4+ Days</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {allTours.length} of {allTours.length} tours
          </p>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filters applied</span>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {allTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-bold text-gray-900">${tour.price}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      {tour.category}
                    </Badge>
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{tour.rating}</span>
                      <span className="text-xs opacity-75">({tour.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{tour.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{tour.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{tour.difficulty}</span>
                  </div>
                  <Link href={`/product/${tour.id}`}>
                    <Button size="sm" className="bg-[#01c5fd] hover:bg-[#00b4e6] text-white transition-colors">
                      Book Now
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
