"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  Search,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Truck,
  XCircle,
} from "lucide-react"
import { orders } from "@/types/fakeData"

// Sample order data


export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(
    (order) =>
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "All" || order.status === statusFilter),
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number.parseInt(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {status}
            </span>
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-[#FFCB32] text-[#23265B] hover:bg-[#FFCB32] px-2 py-1">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#23265B]"></span>
              {status}
            </span>
          </Badge>
        )
      case "Shipped":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-2 py-1">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              {status}
            </span>
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 px-2 py-1">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
              {status}
            </span>
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get action icon based on status
  const getActionIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Eye className="h-4 w-4" />
      case "Processing":
        return <Truck className="h-4 w-4" />
      case "Shipped":
        return <Eye className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  // Get action text based on status
  const getActionText = (status: string) => {
    switch (status) {
      case "Delivered":
        return "View Details"
      case "Processing":
        return "Ship Order"
      case "Shipped":
        return "Track Order"
      case "Cancelled":
        return "View Details"
      default:
        return "View Details"
    }
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-[#23265B]">Orders</h1>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              className="pl-8 w-full text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] text-black">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>{statusFilter}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#FFCB32] hover:bg-[#e6b72d] text-[#23265B]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-[#23265B] text-white">
            <TableRow>
              <TableHead className="text-white font-medium">
                <div className="flex items-center">
                  Order ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-white font-medium">Customer</TableHead>
              <TableHead className="text-white font-medium">
                <div className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-white font-medium text-center">Items</TableHead>
              <TableHead className="text-white font-medium text-right">Total</TableHead>
              <TableHead className="text-white font-medium">Status</TableHead>
              <TableHead className="text-white font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50 text-black">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right font-medium">${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-[#23265B] text-[#23265B] hover:bg-[#23265B] hover:text-white"
                      >
                        {getActionIcon(order.status)}
                        <span className="ml-2 ">{getActionText(order.status)}</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View order details</DropdownMenuItem>
                          <DropdownMenuItem>Contact customer</DropdownMenuItem>
                          <DropdownMenuItem>Print invoice</DropdownMenuItem>
                          {order.status !== "Cancelled" && (
                            <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mt-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}{" "}
            orders
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-500">Rows per page:</p>
            <Select  value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="h-8 w-[70px] text-black">
                <SelectValue placeholder={itemsPerPage.toString()} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 text-black"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="flex items-center">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show first page, last page, current page, and pages around current
              let pageToShow: number | null = null

              if (totalPages <= 5) {
                // If 5 or fewer pages, show all
                pageToShow = i + 1
              } else if (currentPage <= 3) {
                // Near start
                if (i < 4) {
                  pageToShow = i + 1
                } else if (i === 4) {
                  pageToShow = totalPages
                }
              } else if (currentPage >= totalPages - 2) {
                // Near end
                if (i === 0) {
                  pageToShow = 1
                } else {
                  pageToShow = totalPages - (4 - i)
                }
              } else {
                // Middle
                if (i === 0) {
                  pageToShow = 1
                } else if (i === 4) {
                  pageToShow = totalPages
                } else {
                  pageToShow = currentPage + (i - 2)
                }
              }

              // Add ellipsis
              if ((i === 1 && pageToShow !== 2) || (i === 3 && pageToShow !== totalPages - 1)) {
                return (
                  <span key={`ellipsis-${i}`} className="px-2">
                    ...
                  </span>
                )
              }

              return pageToShow ? (
                <Button
                  key={pageToShow}
                  variant={currentPage === pageToShow ? "default" : "outline"}
                  size="icon"
                  onClick={() => handlePageChange(pageToShow as number)}
                  className={`h-8 w-8 text-black ${currentPage === pageToShow ? "bg-[#23265B] text-white" : ""}`}
                >
                  {pageToShow}
                </Button>
              ) : null
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 text-black"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
