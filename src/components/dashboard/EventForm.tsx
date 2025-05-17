"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

// Define validation schema
const eventFormSchema = z.object({
  title1: z.string().min(1, "Title 1 is required"),
  title2: z.string().min(1, "Title 2 is required"),
  description1: z.string().min(1, "Description 1 is required"),
  description2: z.string().min(1, "Description 2 is required"),
  date_time: z.date({
    required_error: "A date is required.",
  }),
  location: z.string().min(1, "Location is required"),
  image_tmp: z.instanceof(File).optional(),
  tags: z.string().min(1, "At least one tag is required"),
});

export default function EventForm({ isEditing = false }: { isEditing?: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    setIsLoading(true);
    console.log({
      ...values,
      image_tmp: imageFile,
    });
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: isEditing ? "Event Updated!" : "Event Created!",
        icon: "success",
        confirmButtonColor: "#23265B",
      });
      router.push("/events");
    }, 1500);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
    form.setValue("image_tmp", undefined);
  };

  return (
    <Form {...form}>
        <div className="text-2xl font-bold text-[#23265B] py-3">
        {isEditing ? "Edit Event" : "Create New Event"}

          </div>
          <hr/>
          <br/>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title 1</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Main event title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title 2</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Secondary event title"
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
          name="description1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description 1</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Tell us about this event..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description 2</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Additional event details..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Label>Event Cover Image</Label>
          {imageUrl || form.getValues().image_tmp ? (
            <div className="relative overflow-hidden rounded-2xl border bg-muted max-w-[400px] h-[300px] mx-auto">
              <Image
                src={imageUrl || "/placeholder-image.jpg"}
                alt="Event cover"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Event venue or address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="comma,separated,tags"
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
          name="date_time"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full md:w-1/2">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => router.push("/events")}
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
              "Update Event"
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}