"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"

const notificationFormSchema = z.object({
  productUpdates: z.boolean().default(true),
  comments: z.boolean().default(false),
  checkoutProduct: z.boolean().default(true),
}).partial()

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      productUpdates: true,
      comments: false,
      checkoutProduct: true,
    },
  })

  function onSubmit(data: NotificationFormValues) {
    console.log("Notification form submitted:", data)
    // Handle form submission logic here
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl font-semibold text-gray-800">
          Notification
          <InfoIcon className="ml-2 h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="productUpdates" className="text-base font-medium">
                Product updates
              </Label>
              <InfoIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Switch
              id="productUpdates"
              checked={form.watch("productUpdates")}
              onCheckedChange={(value)=> form.setValue("productUpdates", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="comments" className="text-base font-medium">
                Comments
              </Label>
              <InfoIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Switch id="comments" checked={form.watch("comments")} onCheckedChange={(value) => form.setValue("comments", value)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label htmlFor="checkoutProduct" className="text-base font-medium">
                Checkout Product
              </Label>
              <InfoIcon className="h-4 w-4 text-gray-400" />
            </div>
            <Switch
              id="checkoutProduct"
              checked={form.watch("checkoutProduct")}
              onCheckedChange={(value) => form.setValue("checkoutProduct", value)}
            />
          </div>

        <Button type="submit" className="bg-bprimary hover:bg-bprimary/90 text-lg py-6 px-8 font-thin">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
