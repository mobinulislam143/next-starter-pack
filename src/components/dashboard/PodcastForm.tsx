"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Swal from "sweetalert2";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Label } from "../ui/label";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  episode_number: z.coerce.number().int().positive({
    message: "Episode number must be a positive integer.",
  }),
  duration: z.string().min(2, {
    message: "Duration must be at least 2 characters.",
  }),
  media_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  published_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
});

type PodcastFormValues = z.infer<typeof formSchema> & {
  imageFile?: File | null;
};

const PodcastForm = () => {
  const router = useRouter();
  const params = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!params.id;

  const defaultValues = isEditing
    ? {
        title: "Sample Podcast",
        description: "Sample description",
        episode_number: 1,
        duration: "30 minutes",
        media_url: "https://example.com/media.mp3",
        published_date: "2023-01-01",
        imageUrl: "https://example.com/image.jpg",
      }
    : {
        title: "",
        description: "",
        episode_number: 0,
        duration: "",
        media_url: "",
        published_date: "",
      };

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: PodcastFormValues) => {
    try {
      setIsLoading(true);
      const formData = {
        ...data,
        imageFile: imageFile || null,
      };

      console.log("Form submitted:", formData);
      console.log("Image file:", imageFile); // This will log the File object as you wanted

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        title: "Success!",
        text: isEditing
          ? "Podcast updated successfully"
          : "Podcast created successfully",
        icon: "success",
        confirmButtonColor: "#23265B",
      }).then(() => {
        router.push("/dashboard/podcastEvent");
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#23265B",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log("file is", file); // This will log the File object with all properties
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveImage = () => {
    setImageFile(null);
    setImageUrl(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#23265B]">
            {isEditing ? "Edit Podcast" : "Create New Podcast"}
          </CardTitle>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="Podcast title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="episode_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episode Number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isLoading}
                          placeholder="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Tell us about this podcast episode..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              <div className="space-y-4">
                <Label>Podcast Cover Image</Label>
                {imageUrl || form.getValues().imageFile ? (
                  <div className="relative overflow-hidden rounded-2xl border bg-muted max-w-[400px] h-[300px] mx-auto">
                    <Image
                      src={
                        imageUrl ||  "/placeholder-image.jpg"
                      }
                      alt="Podcast cover"
                      width={400}
                      height={300}
                      className="object-cover mx-auto my-2 rounded-[8px] hover:opacity-90"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-4 right-2 rounded-full"
                      type="button"
                      onClick={onRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="cover-upload"
                    className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 bg-muted hover:bg-muted/50 cursor-pointer transition"
                  >
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        try {
                          handleImageChange(e);
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } catch (error: any) {
                          Swal.fire({
                            title: "Upload Error",
                            text: error.message,
                            icon: "error",
                            confirmButtonColor: "#23265B",
                          });
                        }
                      }}
                    />
                    <p className="text-gray-500 text-sm">
                      Click to upload cover image
                    </p>
                  </label>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="e.g. 45 minutes"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="media_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Media URL</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="https://example.com/media.mp3"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="published_date"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>Published Date</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => router.push("/podcastEvent")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#23265B] hover:bg-[#1a1d48]"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isEditing ? (
                    "Update Podcast"
                  ) : (
                    "Create Podcast"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PodcastForm;
