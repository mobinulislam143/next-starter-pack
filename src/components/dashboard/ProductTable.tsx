"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

// Define the product type
interface Product {
  id: string;
  title: string;
  category: string;
  main_price: number;
  sell_price: number;
  image_tmp: string;
  description: string;
}

// Sample initial data
const initialProducts: Product[] = [
  {
    id: "1",
    title: "Premium Headphones",
    category: "Electronics",
    main_price: 199.99,
    sell_price: 149.99,
    image_tmp: "/headphones.jpg",
    description: "High-quality noise-cancelling headphones",
  },
  {
    id: "2",
    title: "Wireless Keyboard",
    category: "Accessories",
    main_price: 89.99,
    sell_price: 59.99,
    image_tmp: "/keyboard.jpg",
    description: "Ergonomic wireless keyboard",
  },
];

export default function ProductTable() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  // Navigate to create page
  const handleCreate = () => {
    router.push("/dashboard/product/addProduct");
  };

  // Navigate to edit page
  const handleEdit = (id: string) => {
    router.push(`/dashboard/product/updateProduct/${id}`);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete));
    }
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#23265B" }}>
          Product Management
        </h1>
        <Button
          onClick={handleCreate}
          style={{ backgroundColor: "#23265B" }}
          className="hover:bg-[#1a1d48]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <Table>
          <TableHeader style={{ backgroundColor: "#23265B" }}>
            <TableRow>
              <TableHead style={{ color: "white" }}>Image</TableHead>
              <TableHead style={{ color: "white" }}>Title</TableHead>
              <TableHead style={{ color: "white" }}>Category</TableHead>
              <TableHead style={{ color: "white" }}>Main Price</TableHead>
              <TableHead style={{ color: "white" }}>Sell Price</TableHead>
              <TableHead style={{ color: "white" }} className="w-40 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image_tmp && (
                      <Image
                        width={50}
                        height={50}
                        src={product.image_tmp}
                        alt={product.title}
                        className="h-10 w-10 object-cover rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatCurrency(product.main_price)}</TableCell>
                  <TableCell>{formatCurrency(product.sell_price)}</TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product.id)}
                      className="border-[#23265B] text-[#23265B] hover:bg-[#23265B]/10"
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(product.id)}
                      className="border-[#FFCB32] text-[#FFCB32] hover:bg-[#FFCB32]/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent style={{ borderColor: "#FFCB32" }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="border-[#23265B] text-[#23265B] hover:bg-[#23265B]/10"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              style={{ backgroundColor: "#FFCB32", color: "#23265B" }}
              className="hover:bg-[#e6b82d]"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
