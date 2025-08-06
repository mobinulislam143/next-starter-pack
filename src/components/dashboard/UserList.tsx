"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, Briefcase } from "lucide-react";
import Swal from "sweetalert2";
import CustomPaginations from "../common/CustomPaginations";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  profession: string;
  avatar: string;
  address: string;
  joinDate: string;
  status: "Active" | "Inactive";
}

// Fake user data
const generateFakeUsers = (): User[] => {
  const names = [
    "John Doe",
    "Alex Carter",
    "Mia Johnson",
    "Liam Evans",
    "Sarah Wilson",
    "David Brown",
    "Emma Davis",
    "Michael Miller",
    "Olivia Garcia",
    "James Rodriguez",
    "Sophia Martinez",
    "Benjamin Anderson",
    "Isabella Taylor",
    "Lucas Thomas",
    "Charlotte Jackson",
  ];

  const professions = [
    "Student",
    "Businessman",
    "Job Holder",
    "Teacher",
    "Doctor",
    "Marketer",
    "Professor",
    "Engineer",
    "Designer",
    "Developer",
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `user${i + 1}@example.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(
      Math.floor(Math.random() * 9000) + 1000
    )}`,
    profession: professions[i % professions.length],
    avatar: `/placeholder.svg?height=40&width=40&query=professional headshot ${
      i + 1
    }`,
    address: `${
      Math.floor(Math.random() * 9999) + 1
    } Main St, City, State ${String(
      Math.floor(Math.random() * 90000) + 10000
    )}`,
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ).toLocaleDateString(),
    status: Math.random() > 0.2 ? "Active" : "Inactive",
  }));
};

export default function UserList() {
  const [users] = useState<User[]>(generateFakeUsers());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${user.name}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Here you would typically make an API call to delete the user
      await Swal.fire({
        title: "Deleted!",
        text: `${user.name} has been deleted successfully.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User List</h1>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Contact Info
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Profession
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell className="text-gray-600">{user.phone}</TableCell>
                  <TableCell className="text-gray-600">
                    {user.profession}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                        onClick={() => handleViewUser(user)}
                      >
                        View User
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        onClick={() => handleDeleteUser(user)}
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
        {currentUsers.map((user) => (
          <Card key={user.id} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                  <p className="text-sm text-gray-600">{user.profession}</p>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 text-xs"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 text-xs"
                      onClick={() => handleDeleteUser(user)}
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
        totalItems={users.length}
        startIndex={startIndex}
        onPageChange={handlePageChange}
      />

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              User Details
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedUser.avatar || "/placeholder.svg"}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedUser.name}
                  </h3>
                  <Badge
                    variant={
                      selectedUser.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Profession
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.profession}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Join Date
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedUser.joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
