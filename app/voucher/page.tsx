"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, MapPin, Calendar, Users, Clock, QrCode } from "lucide-react"

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
  }
  status: string
  bookingDate: string
}

export default function VoucherPage() {
  const searchParams = useSearchParams()
  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const bookingRef = searchParams.get("ref")

  useEffect(() => {
    if (bookingRef) {
      try {
        const stored = localStorage.getItem(`booking_${bookingRef}`)
        if (stored) {
          setBookingData(JSON.parse(stored))
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
          <h2 className="text-2xl font-bold mb-4">Loading Voucher...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  const tourTitle = bookingData.tour.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TOURVIS
            </Link>
            <Link href={`/reservation-details?ref=${bookingRef}`} className="text-gray-600 hover:text-blue-600 text-sm">
              Back to Booking Details
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 py-8">
        {/* Voucher Card */}
        <Card className="shadow-xl border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <CardTitle className="text-xl lg:text-2xl mb-2">TOUR VOUCHER</CardTitle>
                <p className="text-blue-100 text-sm lg:text-base">Please present this voucher on your tour date</p>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-sm text-blue-100">Booking Reference</div>
                <div className="text-lg lg:text-xl font-bold">{bookingData.bookingReference}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 lg:p-8">
            {/* Tour Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
              <div>
                <div className="flex gap-4 mb-6">
                  <div className="relative w-20 lg:w-24 h-16 lg:h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src="/images/surfing-sundak.jpg" alt={tourTitle} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tourTitle}</h3>
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Tour Date</div>
                      <div className="font-semibold">
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
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Time</div>
                      <div className="font-semibold">09:00 AM</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Guests</div>
                      <div className="font-semibold">
                        {bookingData.quantity} Adult{bookingData.quantity > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Meeting Point</div>
                      <div className="font-semibold">Sundak Beach Main Entrance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info & QR Code */}
              <div>
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">Guest Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold">
                      {bookingData.customerInfo.firstName} {bookingData.customerInfo.lastName}
                    </div>
                    <div className="text-sm text-gray-600">{bookingData.customerInfo.email}</div>
                    <div className="text-sm text-gray-600">{bookingData.customerInfo.phone}</div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="text-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
                    <QrCode className="h-32 w-32 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Scan for quick check-in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="border-t pt-6">
              <h4 className="font-semibold text-lg mb-4">Important Instructions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-green-600 mb-2">Before Your Tour</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Arrive 15 minutes before departure time</li>
                    <li>• Bring valid ID and this voucher</li>
                    <li>• Check weather conditions</li>
                    <li>• Wear comfortable clothing and shoes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Cancellation Policy</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Free cancellation up to 24 hours before</li>
                    <li>• 50% refund for cancellations within 24 hours</li>
                    <li>• No refund for no-shows</li>
                    <li>• Weather-related cancellations are fully refunded</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Emergency Contact</div>
                    <div className="font-semibold">+1 (555) 999-0000</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Customer Service</div>
                    <div className="font-semibold">support@tourvis.com</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="flex-1 bg-[#01c5fd] hover:bg-[#00b4e6]" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Download/Print Voucher
          </Button>
          <Link href={`/reservation-details?ref=${bookingRef}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Booking Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
