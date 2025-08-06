"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InfoIcon, PencilIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const basicFormSchema = z.object({
  displayName: z.string().min(1, "Display Name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  bio: z.string().max(160, "Bio must not be longer than 160 characters").optional(),
})

type BasicFormValues = z.infer<typeof basicFormSchema>

export function BasicForm() {
  const form = useForm<BasicFormValues>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      displayName: "Bryan Adams",
      email: "bryanadams@gmail.com",
      country: "India",
      city: "Delhi",
      province: "Street 01",
      bio: "I specialize in HRM role",
    },
  })

  function onSubmit(data: BasicFormValues) {
    console.log("Basic form submitted:", data)
    // Handle form submission logic here
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
          Profile Information
          <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="photo-profile">Photo Profile</Label>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile Picture" />
                <AvatarFallback>BP</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="icon" className="rounded-full h-8 w-8 bg-transparent">
                <PencilIcon className="h-4 w-4" />
                <span className="sr-only">Edit profile picture</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" placeholder="Bryan Adams" {...form.register("displayName")} />
            {form.formState.errors.displayName && (
              <p className="text-sm text-red-500">{form.formState.errors.displayName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="bryanadams@gmail.com" {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value)=> form.setValue("country", value)} defaultValue={form.watch("country")}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.country && (
                <p className="text-sm text-red-500">{form.formState.errors.country.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select onValueChange={(value) => form.setValue("city", value)} defaultValue={form.watch("city")}>
                <SelectTrigger id="city">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.city && (
                <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select onValueChange={(value)=> form.setValue("province", value)} defaultValue={form.watch("province")}>
                <SelectTrigger id="province">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Street 01">Street 01</SelectItem>
                  <SelectItem value="Street 02">Street 02</SelectItem>
                  <SelectItem value="Street 03">Street 03</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.province && (
                <p className="text-sm text-red-500">{form.formState.errors.province.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="I specialize in HRM role"
              className="min-h-[80px]"
              {...form.register("bio")}
            />
            {form.formState.errors.bio && <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>}
          </div>

          <Button type="submit" className="bg-bprimary hover:bg-bprimary/90 text-lg py-6 px-8 font-thin">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
