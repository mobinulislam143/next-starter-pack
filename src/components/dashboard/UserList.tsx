"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
  Eye,
  EyeOff,
  Trash2,
  
} from "lucide-react";
import Swal from "sweetalert2";
import CustomPaginations from "../common/CustomPaginations";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
}

// Mock data for demonstration
const mockUsers: User[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `user-${i + 1}`,
  email: `user${i + 1}@example.com`,
  username: `user${i + 1}`,
  password: `password${i + 1}`,
}));

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const itemsPerPage = 10;

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle password visibility for a specific user
  const togglePasswordVisibility = (userId: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your delete action here
        console.log("Deleted!");
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm border-primary/20 focus-visible:ring-primary/30 text-black"
        />
       
      </div>

      <div className="border border-primary/10 rounded-md overflow-x-auto">
        <Table>
          <TableHeader className="bg-primary text-white">
            <TableRow className="hover:bg-primary/90">
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Username</TableHead>
              <TableHead className="text-white">Password</TableHead>
              <TableHead className="w-[100px] text-right text-white">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-primary/5 hover:bg-primary/10"
                  }
                >
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>
                        {showPassword[user.id] ? user.password : "••••••••"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePasswordVisibility(user.id)}
                        className="hover:text-secondary hover:bg-primary/5"
                      >
                        {showPassword[user.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword[user.id]
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDelete}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <CustomPaginations
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
          startIndex={startIndex}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
