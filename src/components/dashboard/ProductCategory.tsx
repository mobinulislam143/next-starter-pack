"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash } from "lucide-react";

// Define the data type
interface ProductCategory {
  id: string;
  name: string;
}

// Sample data
const initialData: ProductCategory[] = [
  { id: "1", name: "Build Photo" },
  { id: "2", name: "Construction" },
  { id: "3", name: "Renovation" },
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function ProductCategory() {
  const [data, setData] = useState<ProductCategory[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ProductCategory | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Initialize form for create/update
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentItem?.name || "",
    },
  });

  // Reset form when currentItem changes
  useEffect(() => {
    form.reset({
      name: currentItem?.name || "",
    });
  }, [currentItem, form]);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentItem) {
      // Update existing item
      setData(
        data.map((item) =>
          item.id === currentItem.id ? { ...item, name: values.name } : item
        )
      );
    } else {
      // Create new item
      const newItem: ProductCategory = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
      };
      setData([...data, newItem]);
    }
    setIsDialogOpen(false);
    setCurrentItem(null);
  };

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (itemToDelete) {
      setData(data.filter((item) => item.id !== itemToDelete));
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  // Open dialog for creating new item
  const openCreateDialog = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing item
  const openEditDialog = (item: ProductCategory) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#23265B" }}>
          Product Categories
        </h1>
        <Button
          onClick={openCreateDialog}
          style={{ backgroundColor: "#23265B", color: "white" }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary">
            <TableRow>
              <TableHead style={{ color: "white" }}>Sl</TableHead>
              <TableHead style={{ color: "white" }}>Name</TableHead>
              <TableHead className="text-right" style={{ color: "white" }}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(item)}
                      style={{ borderColor: "#23265B", color: "#23265B" }}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-500 text-white border-red-800 hover:bg-red-600 hover:text-white"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent style={{ borderColor: "#23265B" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#23265B" }}>
              {currentItem ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: "#23265B" }}>
                      Category Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        style={{ borderColor: "#23265B" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  style={{ borderColor: "#23265B", color: "#23265B" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#23265B", color: "white" }}
                >
                  {currentItem ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent style={{ borderColor: "#23265B" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#23265B" }}>
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              style={{ borderColor: "#23265B", color: "#23265B" }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              style={{ backgroundColor: "#FFCB32", color: "#23265B" }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
