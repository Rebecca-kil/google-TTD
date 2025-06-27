"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ArrowLeft, Mail, Phone, User, Calendar, Tag } from "lucide-react"

interface Inquiry {
  id: string
  author: string
  name: string
  email: string
  phone: string
  inquiryType: string
  subject: string
  message: string
  status: string
  createdAt: string
  responses: Array<{
    id: string
    message: string
    createdAt: string
    isAdmin: boolean
  }>
}

export default function InquiryDetailPage() {
  const searchParams = useSearchParams()
  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)

  const inquiryId = searchParams.get("id")
  const author = searchParams.get("author")
  const password = searchParams.get("password")

  useEffect(() => {
    if (author && password && inquiryId) {
      try {
        const inquiryKey = `inquiry_${author}_${password}`
        const stored = localStorage.getItem(inquiryKey)

        if (stored) {
          const inquiries = JSON.parse(stored)
          const foundInquiry = inquiries.find((inq: Inquiry) => inq.id === inquiryId)
          setInquiry(foundInquiry || null)
        }
      } catch (error) {
        console.error("Error loading inquiry:", error)
      }
    }
    setLoading(false)
  }, [author, password, inquiryId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "answered":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getInquiryTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      general: "General Inquiry",
      booking: "Booking Question",
      cancellation: "Cancellation Request",
      complaint: "Complaint",
      suggestion: "Suggestion",
      technical: "Technical Support",
      other: "Other",
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold text-blue-600">TOURVIS</div>
              <div className="flex space-x-6">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!inquiry) {
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
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Inquiry Not Found</h2>
          <p className="text-gray-600 mb-6">The inquiry you're looking for could not be found.</p>
          <Link href="/inquiry">
            <Button>Back to Inquiry</Button>
          </Link>
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Inquiry Details</h1>
            <p className="text-gray-600">ID: {inquiry.id}</p>
          </div>
          <Badge className={getStatusColor(inquiry.status)}>
            {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
          </Badge>
        </div>

        {/* Inquiry Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {inquiry.subject}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Name</div>
                    <div className="font-medium">{inquiry.name}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{inquiry.email}</div>
                  </div>
                </div>

                {inquiry.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium">{inquiry.phone}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-medium">{getInquiryTypeLabel(inquiry.inquiryType)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Created</div>
                    <div className="font-medium">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Message</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responses */}
        {inquiry.responses && inquiry.responses.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Responses ({inquiry.responses.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inquiry.responses.map((response, index) => (
                  <div key={response.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-600">
                        {response.isAdmin ? "TOURVIS Support" : inquiry.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(response.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{response.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Hours */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Weekdays 09:00 AM - 06:00 PM (Korea Standard Time)</p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href={`/inquiry-list?author=${encodeURIComponent(author || "")}&password=${encodeURIComponent(password || "")}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="inline h-4 w-4 mr-1" />
            Back to My Inquiries
          </Link>
        </div>
      </div>
    </div>
  )
}
