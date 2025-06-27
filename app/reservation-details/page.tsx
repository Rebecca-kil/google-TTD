"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Download,
  ArrowLeft,
  Eye,
  FileText,
  MessageCircle,
  X,
  CreditCard,
} from "lucide-react"

interface BookingData {
  bookingReference: string
  tour: string
  date: string
  quantity: number
  price: number
  totalAmount: number
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    specialRequests: string
    emergencyContact: string
    emergencyPhone: string
  }
  status: string
  bookingDate: string
}

export default function ReservationDetailsPage() {
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const bookingRef = searchParams.get("ref")

  useEffect(() => {
    if (bookingRef) {
      try {
        const stored = localStorage.getItem(`booking_${bookingRef}`)
        console.log("Looking for booking:", bookingRef)
        console.log("Found data:", stored)

        if (stored) {
          const parsedData = JSON.parse(stored)
          setBookingData(parsedData)
        } else {
          console.log("No booking data found for reference:", bookingRef)
        }
      } catch (error) {
        console.error("Error loading booking data:", error)
      }
    }
  }, [bookingRef])

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Booking Details...</h2>
          {bookingRef ? (
            <div>
              <p className="text-gray-600 mb-4">Searching for booking reference: {bookingRef}</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">No booking reference provided.</p>
              <Link href="/">
                <Button>Return to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  const tourTitle = bookingData.tour.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your tour has been successfully booked. Details have been sent to your email.</p>
        </div>

        {/* Booking Reference */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Booking Reference</h2>
            <div className="text-3xl font-bold text-green-600 mb-2">{bookingData.bookingReference}</div>
            <p className="text-sm text-gray-600">Please save this reference number for your records</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tour Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tour Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Image and Info */}
              <div className="flex gap-4 mb-4">
                <div className="relative w-20 lg:w-24 h-16 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src="/images/surfing-sundak.jpg" alt={tourTitle} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{tourTitle}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {bookingData.status}
                  </Badge>
                </div>
              </div>

              {/* Option Details */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Tour Date</div>
                    <div className="font-medium">
                      {new Date(bookingData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Number of Guests</div>
                    <div className="font-medium">
                      {bookingData.quantity} Adult{bookingData.quantity > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Link href={`/product/1`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </Link>
                <Link href={`/voucher?ref=${bookingData.bookingReference}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    View Voucher
                  </Button>
                </Link>
              </div>

              {/* Pricing */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Price per person</span>
                  <span>${bookingData.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Quantity</span>
                  <span>×{bookingData.quantity}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                  <span>Total Amount</span>
                  <span>${bookingData.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {bookingData.customerInfo.firstName} {bookingData.customerInfo.lastName}
                </h3>
                <p className="text-gray-600">{bookingData.customerInfo.country}</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{bookingData.customerInfo.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">{bookingData.customerInfo.phone}</div>
                </div>
              </div>

              {bookingData.customerInfo.specialRequests && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Special Requests</h4>
                  <p className="text-sm text-gray-600">{bookingData.customerInfo.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">What's Included</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Surfboard and wetsuit rental</li>
                  <li>• Professional surfing instructor</li>
                  <li>• Safety equipment and insurance</li>
                  <li>• Complimentary tea/coffee and snacks</li>
                  <li>• Digital photo package</li>
                  <li>• Round-trip transportation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-red-600">What's Not Included</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personal expenses and souvenirs</li>
                  <li>• Lunch and dinner meals</li>
                  <li>• Alcoholic beverages</li>
                  <li>• Tips and gratuities</li>
                  <li>• Travel insurance (optional)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-orange-600">Important Notes</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Minimum age requirement: 12 years old</li>
                  <li>• Basic swimming ability required</li>
                  <li>• Weather conditions may affect schedule</li>
                  <li>• Bring sunscreen and towel</li>
                  <li>• Arrive 15 minutes early</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status:</span>
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">Credit Card</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">TXN-KT{bookingData.bookingReference.slice(-8)}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-semibold text-lg">Total Paid:</span>
                <span className="font-bold text-xl">${bookingData.totalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Inquiry */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Direct Inquiry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">Business Hours: Weekdays 09:00 AM - 06:00 PM (Korea Standard Time)</p>
              <Link href={`/inquiry-direct?ref=${bookingData.bookingReference}`}>
                <Button className="w-full bg-[#01c5fd] hover:bg-[#00b4e6]">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Make Inquiry
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button variant="outline" className="flex-1 bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Download Confirmation
          </Button>
          <Link href={`/cancellation-request?ref=${bookingData.bookingReference}`} className="flex-1">
            <Button variant="destructive" className="w-full">
              <X className="mr-2 h-4 w-4" />
              Request Cancellation
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Remove the detailed contact card and replace with simplified version */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="text-sm text-gray-600">Weekdays 09:00 AM - 06:00 PM (Korea Standard Time)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
