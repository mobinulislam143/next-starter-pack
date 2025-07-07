"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define the data type
interface BlogCategory {
  id: string;
  name: string;
}

// Sample initial data
const initialData: BlogCategory[] = [
  { id: '1', name: 'Programming' },
  { id: '2', name: 'Web Development' },
  { id: '3', name: 'Mobile Development' },
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

export default function BlogCategory() {
  const [categories, setCategories] = useState<BlogCategory[]>(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<BlogCategory | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Reset form when currentCategory changes
  useEffect(() => {
    form.reset({
      name: currentCategory?.name || '',
    });
  }, [currentCategory, form]);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { ...cat, name: values.name } : cat
      ));
    } else {
      // Create new category
      const newCategory: BlogCategory = {
        id: Math.random().toString(36).substring(2, 9),
        name: values.name,
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseDialog();
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
    }
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // Open dialog for creating/editing
  const handleOpenDialog = (category: BlogCategory | null = null) => {
    setCurrentCategory(category);
    setIsDialogOpen(true);
  };

  // Close dialog and reset
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentCategory(null);
    form.reset();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#23265B' }}>
          Blog Categories
        </h1>
        <Button
          onClick={() => handleOpenDialog()}
          style={{ backgroundColor: '#23265B', color: 'white' }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader style={{ backgroundColor: '#23265B' }}>
            <TableRow>
              <TableHead style={{ color: 'white' }}>Sl</TableHead>
              <TableHead style={{ color: 'white' }}>Name</TableHead>
              <TableHead style={{ color: 'white' }} className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='text-black'>
            {categories.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(category)}
                    style={{ borderColor: '#23265B', color: '#23265B' }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(category.id)}
                    className='bg-red-500 text-white border-red-800 hover:bg-red-600 hover:text-white'
                    >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent style={{ borderColor: '#23265B' }}>
          <DialogHeader>
            <DialogTitle style={{ color: '#23265B' }}>
              {currentCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel style={{ color: '#23265B' }}>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        {...field}
                        style={{ borderColor: '#23265B' }}
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
                  onClick={handleCloseDialog}
                  style={{ borderColor: '#23265B', color: '#23265B' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#23265B', color: 'white' }}
                >
                  {currentCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog (matches Product Category style) */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent style={{ borderColor: '#23265B' }}>
          <DialogHeader>
            <DialogTitle style={{ color: '#23265B' }}>
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this category?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              style={{ borderColor: '#23265B', color: '#23265B' }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              style={{ backgroundColor: '#FFCB32', color: '#23265B' }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}