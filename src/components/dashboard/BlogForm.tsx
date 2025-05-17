"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

// Define form schema

const productFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    category: z.string().min(1, {
      message: "Category is required.",
    }),
    main_price: z.coerce.number().min(0, {
      message: "Price must be a positive number.",
    }),
    sell_price: z.coerce.number().min(0, {
      message: "Price must be a positive number.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    imageFile: z.instanceof(File).optional().nullable(),
  });
  
  export default function BlogForm() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof productFormSchema>>({
      resolver: zodResolver(productFormSchema),
      defaultValues: {
        title: "",
        category: "",
       
        description: "",
        imageFile: null,
      },
    });
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      
      if (file) {
        form.setValue("imageFile", file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const onRemoveImage = () => {
      form.setValue("imageFile", null);
      setImageUrl(null);
    };
  
    function onSubmit(data: z.infer<typeof productFormSchema>) {
      console.log("Form data:", data);
      toast.success("Product Created Successfully.")
    }
  
    return (
      <div className="text-black p-6">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#23265B' }}>Create New Blog</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Product category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Price Fields */}
          
  
            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="imageFile"
              render={({  }) => (
                <FormItem>
                  <FormLabel>Blog Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {imageUrl ? (
                        <div className="relative overflow-hidden rounded-2xl border bg-muted max-w-[400px] h-[300px] mx-auto">
                          <Image
                            src={imageUrl}
                            alt="Blog image"
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
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 bg-muted hover:bg-muted/50 cursor-pointer transition"
                        >
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                          <p className="text-gray-500 text-sm">
                            Click to upload Blog image
                          </p>
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <Button 
              type="submit"
              style={{ 
                backgroundColor: '#23265B',
                color: 'white',
              }}
              className="hover:bg-opacity-90 transition-colors"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    );
  }