import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ArrowRight, MapPin, Star } from "lucide-react"

const tourPackages = [
  {
    id: 1,
    title: "Surfing at Sundak Beach",
    description: "Experience stunning sunsets, white-washed buildings, and crystal-clear waters",
    price: 250,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Rafting at Progo",
    description: "Adventure through rapids and scenic landscapes",
    price: 125,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Baturaden Bobocabin",
    description: "Experience stunning sunsets, white-washed",
    price: 150,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Dieng Villa View",
    description: "Experience stunning sunsets, white-washed",
    price: 750,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const lodges = [
  {
    id: 1,
    title: "Villa Pondok Indah",
    description: "A spacious home with three cozy bedrooms and two bathrooms, ideal for families",
    priceRange: "$640-$950",
    price: 640,
    originalPrice: 800,
    image: "/placeholder.svg?height=200&width=300",
    location: "Bali, Indonesia",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 2,
    title: "Villa Pondok Tanjung",
    description: "A spacious home with three cozy bedrooms and two bathrooms, ideal for couples",
    priceRange: "$840-$950",
    price: 840,
    originalPrice: 1050,
    image: "/placeholder.svg?height=200&width=300",
    location: "Lombok, Indonesia",
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 3,
    title: "Bali Patriot Residence",
    description: "A spacious home with three cozy bedrooms and two bathrooms, ideal for groups",
    priceRange: "$840-$990",
    price: 840,
    originalPrice: 1000,
    image: "/placeholder.svg?height=200&width=300",
    location: "Ubud, Indonesia",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 4,
    title: "Uluwatu Cliff Residence",
    description: "A spacious home with three cozy bedrooms and two bathrooms, ideal for luxury stays",
    priceRange: "$790-$800",
    price: 790,
    originalPrice: 950,
    image: "/placeholder.svg?height=200&width=300",
    location: "Uluwatu, Indonesia",
    rating: 4.6,
    reviews: 89,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
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

      {/* Hero Banner */}
      <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0 rounded-lg mx-2 sm:mx-4 mt-2 sm:mt-4 overflow-hidden">
          <Image src="/placeholder.svg?height=600&width=1200" alt="Travel destination" fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                Experience the World's Best Tours—
                <br className="hidden sm:block" />
                Easy, Fast, Secure
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tourPackages.map((tour) => (
            <Link key={tour.id} href={`/product/${tour.id}`}>
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-64 sm:h-72 lg:h-80">
                  <Image
                    src={tour.image || "/placeholder.svg"}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                    <span className="text-lg font-bold text-gray-900">${tour.price}.00</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <p className="text-gray-200 mb-6 text-sm leading-relaxed">{tour.description}</p>

                    {/* Booking Button */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                      <span className="text-white font-medium mr-2">Booking Trip</span>
                      <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Lodges */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Most Popular Lodges Around the World</h2>
            <p className="text-gray-600">Explore our travel packages this month, with options for every traveler</p>
          </div>
          <Link href="/tours" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            See All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lodges.map((lodge) => (
            <Link key={lodge.id} href={`/product/${lodge.id}`}>
              <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={lodge.image || "/placeholder.svg"}
                    alt={lodge.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>

                <div className="p-4 space-y-3">
                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{lodge.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {lodge.title}
                  </h3>

                  {/* Reviews */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(lodge.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({lodge.reviews} reviews)</span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">${lodge.originalPrice}</span>
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                        {Math.round(((lodge.originalPrice - lodge.price) / lodge.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">${lodge.price}</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">TOURVIS</div>
          <p className="text-gray-400 mb-8">Experience the World's Best Tours</p>
          <div className="flex justify-center space-x-8">
            <Link href="/tours" className="hover:text-blue-400">
              Tours
            </Link>
            <Link href="/inquiry" className="hover:text-blue-400">
              Inquiry
            </Link>
            <Link href="/booking-lookup" className="hover:text-blue-400">
              Booking Lookup
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
