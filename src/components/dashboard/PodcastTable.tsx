"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  image: string;
  episode_number: number;
  duration: string;
  media_url: string;
  published_date: string;
  created_date: string;
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
import EventTable from './EventTable';

const PodcastList: React.FC = () => {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([
    {
      id: "1",
      title: "Introduction to Podcasting",
      description:
        "Learn the basics of podcasting in this introductory episode.",
      image: "https://example.com/image1.jpg",
      episode_number: 1,
      duration: "45 minutes",
      media_url: "https://youtube.com/episode1",
      published_date: "2023-01-01",
      created_date: "2023-01-01",
    },
    {
      id: "2",
      title: "Advanced Podcast Techniques",
      description:
        "Take your podcast to the next level with these advanced techniques.",
      image: "https://example.com/image2.jpg",
      episode_number: 2,
      duration: "1 hour 15 minutes",
      media_url: "https://youtube.com/episode2",
      published_date: "2023-01-08",
      created_date: "2023-01-08",
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
        setEpisodes(episodes.filter((ep) => ep.id !== id));
        Swal.fire("Deleted!", "Your episode has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#23265B]">Podcast Episodes</h1>
        <button
          onClick={() => router.push("/dashboard/podcastEvent/addPodcast")}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23265B] hover:bg-[#1a1d48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23265B]"
        >
          Add New Podcast
        </button>
      </div>

      {/* Episodes Table */}
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
                Duration
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Published Date
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
            {episodes.map((episode) => (
              <TableRow key={episode.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {episode.episode_number}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">
                  <div className="font-medium text-[#23265B]">
                    {episode.title}
                  </div>
                  <div className="text-gray-500 truncate max-w-xs">
                    {episode.description}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {episode.duration}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(episode.published_date).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/dashboard/podcastEvent/updatePodcast/${episode.id}`
                        )
                      }
                      className="text-[#23265B] hover:bg-[#23265B] hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(episode.id)}
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


      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-bold text-[#23265B]">All Event</h1>
        <button
          onClick={() => router.push("/dashboard/podcastEvent/addEvent")}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#23265B] hover:bg-[#1a1d48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23265B]"
        >
          Add New Event
        </button>
      </div>

      <div>
        <EventTable/>
      </div>
    </div>
  );
};

export default PodcastList;