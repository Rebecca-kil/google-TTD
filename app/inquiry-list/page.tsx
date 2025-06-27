"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ArrowLeft, Plus, Eye } from "lucide-react"

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
  responses: any[]
}

export default function InquiryListPage() {
  const searchParams = useSearchParams()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const author = searchParams.get("author")
  const password = searchParams.get("password")

  useEffect(() => {
    if (author && password) {
      try {
        const inquiryKey = `inquiry_${author}_${password}`
        const stored = localStorage.getItem(inquiryKey)

        if (stored) {
          const parsedInquiries = JSON.parse(stored)
          setInquiries(parsedInquiries)
        }
      } catch (error) {
        console.error("Error loading inquiries:", error)
      }
    }
    setLoading(false)
  }, [author, password])

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
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Inquiries</h1>
            <p className="text-gray-600">Author: {author}</p>
          </div>
          <Link href="/inquiry-create">
            <Button className="bg-[#01c5fd] hover:bg-[#00b4e6]">
              <Plus className="mr-2 h-4 w-4" />
              New Inquiry
            </Button>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries found</h3>
              <p className="text-gray-600 mb-6">You haven't submitted any inquiries yet.</p>
              <Link href="/inquiry-create">
                <Button className="bg-[#01c5fd] hover:bg-[#00b4e6]">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Inquiry
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{inquiry.subject}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>ID: {inquiry.id}</span>
                        <span>Type: {getInquiryTypeLabel(inquiry.inquiryType)}</span>
                        <span>
                          Created:{" "}
                          {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-2">{inquiry.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {inquiry.responses.length > 0 ? (
                        <span className="text-green-600 font-medium">
                          {inquiry.responses.length} response(s) received
                        </span>
                      ) : (
                        <span>No responses yet</span>
                      )}
                    </div>
                    <Link
                      href={`/inquiry-detail?id=${inquiry.id}&author=${encodeURIComponent(author || "")}&password=${encodeURIComponent(password || "")}`}
                    >
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
