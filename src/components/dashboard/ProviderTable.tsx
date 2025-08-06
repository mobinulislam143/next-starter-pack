"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Star, MapPin, Calendar } from "lucide-react"
import Swal from "sweetalert2"
import CustomPaginations from "../common/CustomPaginations"

interface Provider {
  id: number
  name: string
  category: string
  phone: string
  rating: number
  avatar: string
  email: string
  address: string
  joinDate: string
  status: "Active" | "Inactive"
  description: string
}

// Fake provider data
const generateFakeProviders = (): Provider[] => {
  const names = [
    "Lichi Richards",
    "Darrell Steward",
    "Esther Howard",
    "Marvin McKinney",
    "Annette Black",
    "Ralph Edwards",
    "Floyd Milenis",
    "Kristin Watson",
    "Theresa Webb",
    "Cody Fisher",
    "Jerome Bell",
    "Kathryn Murphy",
    "Jacob Jones",
    "Courtney Henry",
    "Arlene McCoy",
  ]

  const categories = [
    "Handyman",
    "Spa & Wellness",
    "Mobile Health",
    "Heir & Beauty",
    "Home Repair",
    "Home Cleaning",
    "Painting",
    "Plumbing",
    "Electrical",
    "Gardening",
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    category: categories[i % categories.length],
    phone: `+1 (555) 123-4567`,
    rating: Number((4.5 + Math.random() * 0.5).toFixed(1)),
    avatar: `/placeholder.svg?height=40&width=40&query=professional headshot ${i + 1}`,
    email: `${names[i % names.length].toLowerCase().replace(" ", ".")}@provider.com`,
    address: `${Math.floor(Math.random() * 9999) + 1} Service St, City, State ${String(Math.floor(Math.random() * 90000) + 10000)}`,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
    ).toLocaleDateString(),
    status: Math.random() > 0.2 ? "Active" : "Inactive",
    description: `Professional ${categories[i % categories.length].toLowerCase()} service provider with years of experience.`,
  }))
}

export default function ProviderList() {
  const [providers] = useState<Provider[]>(generateFakeProviders())
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 10

  const totalPages = Math.ceil(providers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProviders = providers.slice(startIndex, startIndex + itemsPerPage)

  const handleViewProvider = (provider: Provider) => {
    setSelectedProvider(provider)
    setIsModalOpen(true)
  }

  const handleDeleteProvider = async (provider: Provider) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${provider.name}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      // Here you would typically make an API call to delete the provider
      await Swal.fire({
        title: "Deleted!",
        text: `${provider.name} has been deleted successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Provider List</h1>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Category</TableHead>
                <TableHead className="font-semibold text-gray-700">Contact Info</TableHead>
                <TableHead className="font-semibold text-gray-700">Rating</TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProviders.map((provider) => (
                <TableRow key={provider.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                        <AvatarFallback>
                          {provider.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{provider.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{provider.category}</TableCell>
                  <TableCell className="text-gray-600">{provider.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900 font-medium">{provider.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                        onClick={() => handleViewProvider(provider)}
                      >
                        View User
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        onClick={() => handleDeleteProvider(provider)}
                      >
                        Delete User
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentProviders.map((provider) => (
          <Card key={provider.id} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={provider.avatar || "/placeholder.svg"} alt={provider.name} />
                  <AvatarFallback>
                    {provider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{provider.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{provider.category}</p>
                  <p className="text-sm text-gray-600">{provider.phone}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-900 font-medium">{provider.rating}</span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 text-xs"
                      onClick={() => handleViewProvider(provider)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 text-xs"
                      onClick={() => handleDeleteProvider(provider)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <CustomPaginations
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={providers.length}
        startIndex={startIndex}
        onPageChange={handlePageChange}
      />

      {/* Provider Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Provider Details</DialogTitle>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedProvider.avatar || "/placeholder.svg"} alt={selectedProvider.name} />
                  <AvatarFallback className="text-lg">
                    {selectedProvider.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedProvider.name}</h3>
                  <Badge variant={selectedProvider.status === "Active" ? "default" : "secondary"}>
                    {selectedProvider.status}
                  </Badge>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-900 font-medium">{selectedProvider.rating}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">{selectedProvider.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-600">{selectedProvider.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Category</p>
                    <p className="text-sm text-gray-600">{selectedProvider.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-600">{selectedProvider.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Join Date</p>
                    <p className="text-sm text-gray-600">{selectedProvider.joinDate}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-4 w-4 rounded-full bg-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Description</p>
                    <p className="text-sm text-gray-600">{selectedProvider.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
