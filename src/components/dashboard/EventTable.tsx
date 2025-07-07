"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface EventCardProps {
  id: number;
  title1: string;
  description1: string;
  location: string;
  image: string;
  
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export default function EventTable() {

      const router = useRouter();
      const [events, setEvents] = useState<EventCardProps[]>([
        {
          id: 1,
          title1: "Introduction to Podcasting",
          description1: "Learn the basics of podcasting in this introductory episode.",
          location: "Online",
          image: "https://example.com/image1.jpg",
        },
        {
          id: 2,
          title1: "Advanced Podcast Techniques",
          description1: "Take your podcast to the next level with these advanced techniques.",
          location: "Online",
          image: "https://example.com/image2.jpg",
        },
      ]);
    
      const handleDelete = (id: string) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#23265B",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            setEvents(events.filter((ep) => ep.id !== Number(id)));
            Swal.fire("Deleted!", "Your episode has been deleted.", "success");
          }
        });
      };
    return (
        <div>
             <div className="bg-white shadow-md rounded-lg ">
        <Table className="min-w-full divide-y divide-gray-300  md:table">
          <TableHeader className="bg-[#23265B]">
            <TableRow>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Episode #
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Title
              </TableHead>
          
         
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {event.id}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">
                  <div className="font-medium text-[#23265B]">
                    {event.title1}
                  </div>
                  <div className="text-gray-500 truncate max-w-xs">
                    {event.description1}
                  </div>
                </TableCell>
                
                {/* <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(episode.published_date).toLocaleDateString()}
                </TableCell> */}
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/dashboard/podcastEvent/updateEvent/${event.id}`
                        )
                      }
                      className="text-[#23265B] hover:bg-[#23265B] hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(event.id.toString())}
                      className="text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>    
        </div>
    );
}