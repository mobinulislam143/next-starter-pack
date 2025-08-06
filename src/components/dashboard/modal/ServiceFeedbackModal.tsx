"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ServiceFeedback {
  serviceName: string
  category: string
  userName: string
  serviceProvider: string
  reason: string
}

interface ServiceFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  feedback: ServiceFeedback
}

export function ServiceFeedbackModal({ isOpen, onClose, feedback }: ServiceFeedbackModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Service Feedback</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-gray-600">Service Name</Label>
            <span className="font-medium text-gray-800">{feedback.serviceName}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-gray-600">Category</Label>
            <span className="font-medium text-gray-800">{feedback.category}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-gray-600">User Name</Label>
            <span className="font-medium text-gray-800">{feedback.userName}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label className="text-gray-600">Service Provider</Label>
            <span className="font-medium text-gray-800">{feedback.serviceProvider}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-gray-600">
              Reason
            </Label>
            <Textarea id="reason" value={feedback.reason} readOnly className="min-h-[100px] resize-none" />
          </div>
        </div>
        <DialogFooter className="flex justify-center gap-4 pt-4">
          <Button type="button" className="bg-v0-purple hover:bg-v0-purple-dark text-white">
            Withdraw
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
