"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ServiceFeedbackModal } from "./modal/ServiceFeedbackModal"

type ServiceStatus = "Pending" | "Resolved" | "Cancelled"

interface ServiceFeedback {
  serviceName: string
  category: string
  userName: string
  serviceProvider: string
  reason: string
  status: ServiceStatus
  imageUrl: string
}

const serviceData: ServiceFeedback[] = [
  {
    serviceName: "Long Hair Washing",
    category: "Hair & Beauty",
    userName: "Jenny Wilson",
    serviceProvider: "Annette Black",
    reason: "The price is not reasonable.",
    status: "Pending",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Man Head Massage",
    category: "Spa & Wellness",
    userName: "Darlene Robertson",
    serviceProvider: "Cody Fisher",
    reason: "Waiting for long time.",
    status: "Pending",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Mobile Servicing",
    category: "Mobile Health",
    userName: "Jane Cooper",
    serviceProvider: "Floyd Miles",
    reason: "I just want to cancel",
    status: "Resolved",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Long Hair Washing",
    category: "Hair & Beauty",
    userName: "Dianne Russell",
    serviceProvider: "Kathryn Murphy",
    reason: "I want to order another service",
    status: "Resolved",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Pipeline Repairing",
    category: "Home Repair",
    userName: "Annette Black",
    serviceProvider: "Darlene Robertson",
    reason: "Wrong address shown",
    status: "Pending",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Cleaning Drawing Room",
    category: "Home Cleaning",
    userName: "Floyd Miles",
    serviceProvider: "Wade Warren",
    reason: "I want to order another service",
    status: "Cancelled",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Wall Painting",
    category: "Painting",
    userName: "Marvin Mckinney",
    serviceProvider: "Theresa Webb",
    reason: "I want to order another service",
    status: "Resolved",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Television Repairing",
    category: "Handyman",
    userName: "Esther Howard",
    serviceProvider: "Dianne Russell",
    reason: "I want to order another service",
    status: "Cancelled",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Cleaning Drawing Room",
    category: "Home Cleaning",
    userName: "Jerome Bell",
    serviceProvider: "Albert Flores",
    reason: "The price is not reasonable.",
    status: "Resolved",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    serviceName: "Long Hair Washing",
    category: "Hair & Beauty",
    userName: "Brooklyn Simmons",
    serviceProvider: "Devon Lane",
    reason: "I want to order another service",
    status: "Cancelled",
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
]

export function QualityTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<ServiceFeedback | null>(null)

  const handleViewDetails = (feedback: ServiceFeedback) => {
    setSelectedFeedback(feedback)
    setIsModalOpen(true)
  }

  const getStatusBadgeVariant = (status: ServiceStatus) => {
    switch (status) {
      case "Pending":
        return "outline" // Using outline for a lighter look, can be customized with specific colors
      case "Resolved":
        return "default" // Using default for green, can be customized
      case "Cancelled":
        return "destructive" // Using destructive for red, can be customized
      default:
        return "default"
    }
  }

  const getStatusBadgeColorClass = (status: ServiceStatus) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-600 border-orange-600"
      case "Resolved":
        return "bg-green-100 text-green-600 border-green-600"
      case "Cancelled":
        return "bg-red-100 text-red-600 border-red-600"
      default:
        return ""
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Quality List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Service Name</TableHead>
                <TableHead className="min-w-[150px]">Category</TableHead>
                <TableHead className="min-w-[150px]">User Name</TableHead>
                <TableHead className="min-w-[180px]">Service Provider</TableHead>
                <TableHead className="min-w-[250px]">Reason</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceData.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={service.imageUrl || "/placeholder.svg"} alt={service.serviceName} />
                        <AvatarFallback>{service.serviceName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{service.serviceName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.userName}</TableCell>
                  <TableCell>{service.serviceProvider}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{service.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(service.status)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        getStatusBadgeColorClass(service.status),
                      )}
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      className="bg-bprimary hover:bg-bprimary/90 text-white"
                      onClick={() => handleViewDetails(service)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            2
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            3
          </Button>
          <span className="px-2">...</span>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            440
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </CardContent>

      {selectedFeedback && (
        <ServiceFeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} feedback={selectedFeedback} />
      )}
    </Card>
  )
}
